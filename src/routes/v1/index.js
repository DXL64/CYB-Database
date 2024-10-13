const express = require('express');
const config = require('../../config/config');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const teacherRoute = require('./teacher.route');
const studentRoute = require('./student.route');
const postRoute = require(`./post.route`)
const wallpaperRoute = require('./wallpaper.route')
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/teachers',
    route: teacherRoute,
  },
  {
    path: '/students',
    route: studentRoute,
  },
  {
    path: '/overview',
    route: studentRoute,
  },
  {
    path: '/posts',
    route: postRoute
  },
  {
    path: '/wallpapers',
    route: wallpaperRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
// if (config.env === 'development') {
devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
// }

module.exports = router;
