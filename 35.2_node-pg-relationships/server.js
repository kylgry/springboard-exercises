/** Server startup for BizTime. */

process.env.NODE_ENV = "production"
const app = require("./app");


app.listen(3000, function () {
  console.log("Listening on 3000");
});
