const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost/dragons';
const sessionSecret = process.env.SESSION_SECRET || '231pom02@#$@#$';

module.exports = { port, env, dbUri, sessionSecret };
