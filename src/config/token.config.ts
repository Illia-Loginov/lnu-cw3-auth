const {
  ACCESS_TOKEN_SECRET: accessTokenSecret,
  REFRESH_TOKEN_SECRET: refreshTokenSecret
} = process.env;

export default {
  accessTokenSecret,
  accessTokenExpiresIn: '15m',
  refreshTokenSecret,
  refreshTokenExpiresIn: 7 * 24 * 60 * 60
};
