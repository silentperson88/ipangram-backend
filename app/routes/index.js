const baseRoute = '/api';

module.exports = app => {
  app.use(`${baseRoute}/user`, require('./user.route'));
  app.use(`${baseRoute}/department`, require('./department.route'));
};
