// ERRORS

// not handled by error handling  middleware. req, res only
exports.handle405 = (req, res) => {
  res.status(405).send({ msg: 'method not allowed' });
};

// handle knex errors or move on..
exports.handle400 = (err, req, res, next) => {
  const codes = {
    23502: 'violates not null violation',
    42703: 'Bad request, missing data',
    '22P02': 'invalid input syntax for type integer',
  };
  if (codes[err.code]) res.status(400).send({ msg: codes[err.code] });
  else next(err);
};
