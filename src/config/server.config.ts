const { PORT: port, NODE_ENV: env } = process.env;

export default {
  env: env || 'development',
  port: port || 3000
};
