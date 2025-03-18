"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
const vscode_languageclient_1 = require("vscode-languageclient");
const node_1 = require("vscode-languageclient/node");
const config_1 = require("./config");
/**
 * Create Language Client for Sorber Server.
 */
function createClient(context, serverOptions, errorHandler) {
    const initializationOptions = {
        // Opt in to sorbet/showOperation notifications.
        supportsOperationNotifications: true,
        // Let Sorbet know that we can handle sorbet:// URIs for generated files.
        supportsSorbetURIs: true,
        highlightUntyped: (0, config_1.backwardsCompatibleTrackUntyped)(context.log, context.configuration.highlightUntyped),
        enableTypedFalseCompletionNudges: context.configuration.typedFalseCompletionNudges,
    };
    context.log.debug(`Initializing with initializationOptions=${JSON.stringify(initializationOptions)}`);
    const client = new CustomLanguageClient("ruby", "Sorbet", serverOptions, {
        documentSelector: [
            { language: "ruby", scheme: "file" },
            // Support queries on generated files with sorbet:// URIs that do not exist editor-side.
            { language: "ruby", scheme: "sorbet" },
        ],
        errorHandler,
        initializationOptions,
        initializationFailedHandler: (error) => {
            context.log.error("Failed to initialize Sorbet language server.", error instanceof Error ? error : undefined);
            return false;
        },
        outputChannel: context.logOutputChannel,
        revealOutputChannelOn: context.configuration.revealOutputOnError
            ? vscode_languageclient_1.RevealOutputChannelOn.Error
            : vscode_languageclient_1.RevealOutputChannelOn.Never,
    });
    return client;
}
exports.createClient = createClient;
// This implementation exists for the sole purpose of overriding the `force` flag
// as the error/closed/init handlers are not used in every case. In particular, if
// the server fails to start, errors are shown as dialog notification, with errors
// similar to:
//
// - Sorbet client: couldn't create connection to server.
// - Connection to server got closed. Server will not be restarted.
//
// By not forcing a UI component, they are just routed to existing loggers.
class CustomLanguageClient extends node_1.LanguageClient {
    error(message, data, showNotification) {
        super.error(message, data, showNotification === "force" ? true : showNotification);
    }
}
//# sourceMappingURL=languageClient.js.map