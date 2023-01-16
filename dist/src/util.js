"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = exports.generateQueryParams = void 0;
const generateQueryParams = (options) => {
    if (!options || !Object.values(options).length) {
        return "";
    }
    return ("?" +
        Object.entries(options)
            .map(([key, value]) => `${key}=${value === "undefined" ? "" : value}`)
            .join("&"));
};
exports.generateQueryParams = generateQueryParams;
const getErrorMessage = (error) => { var _a, _b; return ((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || "Something went wrong"; };
exports.getErrorMessage = getErrorMessage;
