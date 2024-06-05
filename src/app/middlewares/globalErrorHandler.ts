import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status"
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interfaces/common";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let message = "";
    let errorDetails: TErrorSources = [
        {
            field: '',
            message: 'Something went wrong',
        },
    ]


    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        message = simplifiedError?.errorSources.map(el => `${el.message}`) + "";
        errorDetails = simplifiedError?.errorSources;

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: message,
            errorDetails: errorDetails
        })
    }

    else if (err.statusCode === 401) {
        message = err.message

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: message,
            errorDetails: "Unauthorized Error"
        })
    }

    else {

        console.log(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message || "Something went wrong!",
            errorDetails: err
        })
    }
};

export default globalErrorHandler;