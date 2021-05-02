const app = require('./lib/app');
const pool = require('./lib/utils/pool');

const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`Server started! Running on ${PORT}.`);
});

process.on('exit', () => {
  console.log('Goodbye!');
  pool.end();
});
