const express = require("express");
const template = require("../lib/template.js");
const router = express.Router();

module.exports = function (passport) {
  router.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy((err) => {
      res.redirect("/");
    });
  });

  router.get("/login", (req, res) => {
    const fmsg = req.flash();
    let feedback = "";
    if (fmsg.error) {
      feedback = fmsg.error[0];
    }
    var title = "WEB - login";
    var list = template.list(req.list);
    var html = template.HTML(
      title,
      list,
      `
          <div style="color:red;">${feedback}</div>
          <form action="/auth/login_process" method="post">
            <p><input type="text" name="email" placeholder="email"></p>
            <p><input type="password" name="pwd" placeholder="password"></p>
            <p>
              <input type="submit" value="login">
            </p>
          </form>
        `,
      ""
    );
    res.send(html);
  });
  router.post(
    "/login_process",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
      failureFlash: true,
      successFlash: true,
    })
  );
  return router;
};
