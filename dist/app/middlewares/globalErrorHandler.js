"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const globalErrorHandler = (err, req, res, next) => {
    let message = "";
    let errorDetails = [
        {
            field: '',
            message: 'Something went wrong',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        message = (simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources.map(el => `${el.message}`)) + "";
        errorDetails = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: message,
            errorDetails: errorDetails
        });
    }
    else if (err.statusCode === 401) {
        message = err.message;
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: message,
            errorDetails: "Unauthorized Error"
        });
    }
    else {
        console.log(err);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message || "Something went wrong!",
            errorDetails: err
        });
    }
};
exports.default = globalErrorHandler;
