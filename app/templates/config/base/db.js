module.exports = {
  host: process.env.TYPEORM_HOST || '127.0.0.1',
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD
};
