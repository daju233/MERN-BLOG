export const errorHandler = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  //   error.message = message;
  //注意：在 JavaScript 中，通常 Error 对象的 message 属性用于存储错误的描述信息，但是由于 Error 构造函数接受一个字符串作为可选参数，这个字符串通常会被用作 message 属性的初始值。在上面的 errorHandler 函数中，我已经将 message 参数传递给了 Error 构造函数。但是，您仍然可以通过 error.message = message; 来覆盖默认的 message（虽然这通常不是必要的）。

  return error;
};
