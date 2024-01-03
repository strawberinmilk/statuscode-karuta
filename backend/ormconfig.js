require('dotenv').config({ path: '../.env' });
console.log(process.env.POSTGRES_USER)
module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/db/entities/*.entity.js'],
  logging: true,
  synchronize: true,
};