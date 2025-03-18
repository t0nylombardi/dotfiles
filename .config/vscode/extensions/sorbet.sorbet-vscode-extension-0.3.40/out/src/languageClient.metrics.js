"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instrumentLanguageClient = void 0;
/**
 * Shims the language client object so that all requests sent get timed.
 * @returns The instrumented language client.
 */
function instrumentLanguageClient(client, metrics) {
    const originalSendRequest = client.sendRequest;
    client.sendRequest = (method, ...args) => {
        const now = new Date();
        const requestName = typeof method === "string" ? method : method.method;
        // Replace some special characters with underscores.
        const sanitizedRequestName = requestName.replace(/[/$]/g, "_");
        args.unshift(method);
        const response = originalSendRequest.apply(client, args);
        const metricName = `latency.${sanitizedRequestName}_ms`;
        response.then(() => 
        // This is request succeeded. If the request is canceled, the promise is rejected.
        metrics.emitTimingMetric(metricName, now, { success: "true" }), () => 
        // This request failed or was canceled.
        metrics.emitTimingMetric(metricName, now, { success: "false" }));
        return response;
    };
    return client;
}
exports.instrumentLanguageClient = instrumentLanguageClient;
//# sourceMappingURL=languageClient.metrics.js.map