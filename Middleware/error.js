import { json } from "express";

class ErrorHandle extends Error {
    constructor(message, statuscode) {
        super(message)
        this.statuscode = statuscode
    }
}

export const ErrorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error"
    err.statuscode = err.statuscode || 500;

    if (err.name === "CaseError") {
        const message = `Resorce not found ${err.path}`
        err = new ErrorHandle(message, 400)
    }

    if (err.name === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Enterd`
        err = new ErrorHandle(message, 400)
    }

    if (err.name === "JsonWebTokenError") {
        const message = `Json Web token is Invalid , try again `
        err = new ErrorHandle(message, 400)
    }

    if (err.name === "TokenExpiredError") {
        const message = `Token is expired`
        err = new ErrorHandle(message, 400)
    }
    return res.status(err.statuscode).json({
        success: false,
        message: err.message
    })
}

export default ErrorHandle