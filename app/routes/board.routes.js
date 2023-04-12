const { isModerator, isAdmin } = require("../middleware/authJwt");
const controller = require("../controllers/board.controller");

module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

  app.get("/api/board/all", controller.allAccess);

  app.get(
    "/api/board/ggc",
    //middleware here
    controller.userBoard
  );

  app.get(
    "/api/board/farm",
    //middleware here
    controller.moderatorBoard
  );

  app.get(
    "/api/board/admin",
        //middleware here
    controller.adminBoard
  );

};
