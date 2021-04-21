const session = require('express-session');

module.exports = app => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      rolling: true,
      saveUninitialized: false,
      name: 'my-cookie',
      cookie: {
        path: '/',
        // secure: true,
        sameSite: true,
        httpOnly: true,
        maxAge: 60 * 60 * 60 * 24
      },
    })
  );
}