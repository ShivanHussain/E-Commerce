class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}


export const errorMiddleware = (err, req, res, next) => {   //Error Middleware -->to check user authentication
    
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    
    if(err.code === 11000)  //11000 --> Internet connection slow ; Session time out  ;  unique email error
    {
        //err.message = "Duplicate entry";
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    if(err.name === "JsonWebTokenError")  //Token error --> invalid 
    {
        const message = "Json Web Token Is Invalid. Try Again";
        err = new ErrorHandler(message, 400);
    }

    if(err.name === "TokenExpiredError")  //Token error --> Expired 
    {
        const message = "Json Web Token Is Expired. Try Again";
        err = new ErrorHandler(message, 400);

    }

    if(err.name === "CastError")
    {
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    console.log("Error middleware Eror (error.js)",err);
    
    const errorMessage = err.errors ? 
        Object.values(err.errors)
        .map((error) => error.message)
        .join(" ") : err.message;

    return res.status(err.statusCode).json({
        success: false, 
        message: errorMessage
    });
};

export default ErrorHandler;