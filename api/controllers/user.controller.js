export const test = (req, res) => {
  res.json({
    message: "userApi is working" + ` req's method is ${req.method}`,
  });
};
