"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SorbetLanguageClient = void 0;
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
const child_process_1 = require("child_process");
const connections_1 = require("./connections");
const languageClient_1 = require("./languageClient");
const languageClient_metrics_1 = require("./languageClient.metrics");
const types_1 = require("./types");
const VALID_STATE_TRANSITIONS = new Map([
    [
        2 /* ServerStatus.INITIALIZING */,
        new Set([
            4 /* ServerStatus.ERROR */,
            1 /* ServerStatus.RESTARTING */,
            3 /* ServerStatus.RUNNING */,
        ]),
    ],
    [
        3 /* ServerStatus.RUNNING */,
        new Set([4 /* ServerStatus.ERROR */, 1 /* ServerStatus.RESTARTING */]),
    ],
    [0 /* ServerStatus.DISABLED */, new Set([2 /* ServerStatus.INITIALIZING */])],
    // Restarting is a terminal state. The restart occurs by terminating this LanguageClient and creating a new one.
    [1 /* ServerStatus.RESTARTING */, new Set()],
    // Error is a terminal state for this class.
    [4 /* ServerStatus.ERROR */, new Set()],
]);
class SorbetLanguageClient {
    constructor(context, restart) {
        this.context = context;
        this.languageClient = (0, languageClient_metrics_1.instrumentLanguageClient)((0, languageClient_1.createClient)(context, () => this.startSorbetProcess(), this), this.context.metrics);
        this.onStatusChangeEmitter = new vscode_1.EventEmitter();
        this.restart = restart;
        this.wrappedStatus = 0 /* ServerStatus.DISABLED */;
    }
    /**
     * Implements the disposable interface so this object can be added to the context's subscriptions
     * to keep it alive. Stops the language server and Sorbet processes, and removes UI items.
     */
    dispose() {
        this.onStatusChangeEmitter.dispose();
        let stopped = false;
        /*
         * stop() only invokes the then() callback after the language server
         * ACKs the stop request.
         * Stopping can time out if the language client is repeatedly failing to
         * start (e.g. if network is down, or path to Sorbet is incorrect), or if
         * Sorbet never ACKs the stop request.
         * In the former case (which is the common case), VS code stops retrying
         * the connection after we call stop(), but never invokes our callback.
         * Thus, our solution is to wait 5 seconds for a callback, and stop the
         * process if we haven't heard back.
         */
        const stopTimer = setTimeout(() => {
            var _a;
            stopped = true;
            this.context.metrics.emitCountMetric("stop.timed_out", 1);
            if ((_a = this.sorbetProcess) === null || _a === void 0 ? void 0 : _a.pid) {
                (0, connections_1.stopProcess)(this.sorbetProcess, this.context.log);
            }
            this.sorbetProcess = undefined;
        }, 5000);
        this.languageClient.stop().then(() => {
            if (!stopped) {
                clearTimeout(stopTimer);
                this.context.metrics.emitCountMetric("stop.success", 1);
                this.context.log.info("Sorbet has stopped.");
            }
        });
    }
    /**
     * Sorbet language server {@link SorbetServerCapabilities capabilities}. Only
     * available when the server has been initialized.
     */
    get capabilities() {
        var _a;
        return ((_a = this.languageClient.initializeResult) === null || _a === void 0 ? void 0 : _a.capabilities);
    }
    /**
     * Last error message when {@link status} is {@link ServerStatus.ERROR}.
     */
    get lastError() {
        return this.wrappedLastError;
    }
    /**
     * Resolves when client is ready to serve requests.
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.languageClient.needsStart()) {
                this.context.log.debug("Ignored unnecessary start request");
                return;
            }
            this.status = 2 /* ServerStatus.INITIALIZING */;
            yield this.languageClient.start();
            // In case of error (missing Sorbet process), the client might have already
            // transitioned to Error or Restarting so this should not override that.
            if (this.status === 2 /* ServerStatus.INITIALIZING */) {
                this.status = 3 /* ServerStatus.RUNNING */;
            }
        });
    }
    /**
     * Register a handler for a language server notification. See {@link LanguageClient.onNotification}.
     */
    onNotification(method, handler) {
        return this.languageClient.onNotification(method, handler);
    }
    /**
     * Event fired on {@link status} changes.
     */
    get onStatusChange() {
        return this.onStatusChangeEmitter.event;
    }
    /**
     * Send a request to language server. See {@link LanguageClient.sendRequest}.
     */
    sendRequest(method, param) {
        return this.languageClient.sendRequest(method, param);
    }
    /**
     * Send a notification to language server. See {@link LanguageClient.sendNotification}.
     */
    sendNotification(method, param) {
        this.languageClient.sendNotification(method, param);
    }
    /**
     * Language client status.
     */
    get status() {
        return this.wrappedStatus;
    }
    set status(newStatus) {
        var _a;
        if (this.status === newStatus) {
            return;
        }
        if (!((_a = VALID_STATE_TRANSITIONS.get(this.status)) === null || _a === void 0 ? void 0 : _a.has(newStatus))) {
            this.context.log.error(`Invalid Sorbet server transition: ${this.status} => ${newStatus}}`);
        }
        this.wrappedStatus = newStatus;
        this.onStatusChangeEmitter.fire(newStatus);
    }
    /**
     * Runs a Sorbet process using the current active configuration. Debounced so that it runs Sorbet at most every 3 seconds.
     */
    startSorbetProcess() {
        var _a;
        this.context.log.info("Running Sorbet LSP.");
        const activeConfig = this.context.configuration.activeLspConfig;
        const [command, ...args] = (_a = activeConfig === null || activeConfig === void 0 ? void 0 : activeConfig.command) !== null && _a !== void 0 ? _a : [];
        if (!command) {
            let msg;
            if (!activeConfig) {
                msg = "No active Sorbet configuration.";
                this.status = 0 /* ServerStatus.DISABLED */;
            }
            else {
                msg = `Missing command-line data to start Sorbet. ConfigId:${activeConfig.id}`;
            }
            this.context.log.error(msg);
            return Promise.reject(new Error(msg));
        }
        this.context.log.debug(` > ${command} ${args.join(" ")}`);
        this.sorbetProcess = (0, child_process_1.spawn)(command, args, {
            cwd: vscode_1.workspace.rootPath,
            env: Object.assign(Object.assign({}, process.env), activeConfig === null || activeConfig === void 0 ? void 0 : activeConfig.env),
        });
        // N.B.: 'exit' is sometimes not invoked if the process exits with an error/fails to start, as per the Node.js docs.
        // So, we need to handle both events. ¯\_(ツ)_/¯
        this.sorbetProcess.on("exit", (code, _signal) => {
            this.sorbetProcessExitCode = code !== null && code !== void 0 ? code : undefined;
        });
        this.sorbetProcess.on("error", (err) => {
            if (err &&
                this.status === 2 /* ServerStatus.INITIALIZING */ &&
                err.code === "ENOENT") {
                this.context.metrics.emitCountMetric("error.enoent", 1);
                // We failed to start the process. The path to Sorbet is likely incorrect.
                this.wrappedLastError = `Could not start Sorbet with command: '${command} ${args.join(" ")}'. Encountered error '${err.message}'. Is the path to Sorbet correct?`;
                this.status = 4 /* ServerStatus.ERROR */;
            }
            this.sorbetProcess = undefined;
            this.sorbetProcessExitCode = err === null || err === void 0 ? void 0 : err.errno;
        });
        return Promise.resolve(this.sorbetProcess);
    }
    /** ErrorHandler interface */
    /**
     * LanguageClient has built-in restart capabilities but if it's broken:
     * * It drops all `onNotification` subscriptions after restarting, so we'll miss ShowNotification updates.
     * * It drops all `onReady` subscriptions after restarting, so we won't know when the Sorbet server is running.
     * * It doesn't reset `onReady` state, so we can't even reset our `onReady` callback.
     */
    error() {
        if (this.status !== 4 /* ServerStatus.ERROR */) {
            this.status = 1 /* ServerStatus.RESTARTING */;
            this.restart(types_1.RestartReason.CRASH_LC_ERROR);
        }
        return {
            action: node_1.ErrorAction.Shutdown,
        };
    }
    /**
     * Note: If the VPN is disconnected, then Sorbet will repeatedly fail to start.
     */
    closed() {
        if (this.status !== 4 /* ServerStatus.ERROR */) {
            let reason;
            if (this.sorbetProcessExitCode === 11) {
                // 11 number chosen somewhat arbitrarily. Most important is that this doesn't
                // clobber the exit code of Sorbet itself (which means Sorbet cannot return 11).
                //
                // The only thing that matters is that this value is kept in sync with any
                // wrapper scripts that people use with Sorbet. If this number has to
                // change for some reason, we should announce that.
                reason = types_1.RestartReason.WRAPPER_REFUSED_SPAWN;
            }
            else if (this.sorbetProcessExitCode === 143) {
                // 143 = 128 + 15 and 15 is TERM signal
                reason = types_1.RestartReason.FORCIBLY_TERMINATED;
            }
            else {
                reason = types_1.RestartReason.CRASH_LC_CLOSED;
                this.context.log.error("");
                this.context.log.error(`The Sorbet LSP process crashed exit_code=${this.sorbetProcessExitCode}`);
                this.context.log.error("The Node.js backtrace above is not useful.");
                this.context.log.error("If there is a C++ backtrace above, that is useful.");
                this.context.log.error("Otherwise, more useful output will be in the --debug-log-file to the Sorbet process");
                this.context.log.error("(if provided as a command-line argument).");
                this.context.log.error("");
            }
            this.status = 1 /* ServerStatus.RESTARTING */;
            this.restart(reason);
        }
        return {
            action: node_1.CloseAction.DoNotRestart,
        };
    }
}
exports.SorbetLanguageClient = SorbetLanguageClient;
//# sourceMappingURL=sorbetLanguageClient.js.map