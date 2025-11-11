import config from "../config/index.js";
import ApiError from "../error/ApiError.js";
import handleCastError from "../error/handleCastError.js";
import handleValidationError from "../error/handleValidationError.js";
// import { errorLogger } from "../shared/logger.js";

const globalErrorHandler = (error, req, res, next) => {
  if (config.env === "development") {
    // console.log(`🐱‍🏍 globalErrorHandler ~~`, { error });
  }

  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages = [];

  if (error?.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === "CastError") {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode || 500;
    message = error.message;
    errorMessages = [
      {
        path: "",
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error?.message || message;
    errorMessages = [
      {
        path: "",
        message: error?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
