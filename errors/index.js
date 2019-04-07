// ERRORS

// not handled by error handling  middleware. req, res only
exports.handle405 = (req, res) => {
  res.status(405).send({ msg: 'method not allowed' });
};
