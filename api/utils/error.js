export default errorHandler = (statusCode, message) => {
  const error = new Error();
  errror.statusCode = statusCode;
  error.message = message;
  return error;
};
