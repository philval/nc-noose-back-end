const app = require('./app');

const { PORT = 9090 } = process.env; // default 9090 if not provided...

app.listen(PORT, (err) => {
  if (err) throw (err);
  else console.log(`Server listening on on PORT ${PORT}...`);
});
