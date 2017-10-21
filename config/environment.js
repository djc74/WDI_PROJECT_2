module.exports = {
  port: process.env.PORT || 3000,
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost/dragons'
};
