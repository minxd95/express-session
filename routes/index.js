const template = require("../lib/template.js");
const express = require("express");
const auth = require("../lib/auth");

const router = express.Router();

router.get("/", (req, res) => {
  const fmsg = req.flash();
  let feedback = "";
  if (fmsg.success) {
    feedback = fmsg.success[0];
  }
  var title = "Welcome";
  var description = "Hello, Node.js";
  var list = template.list(req.list);
  var html = template.HTML(
    title,
    list,
    `<div style="color:blue;">${feedback}</div>
    <h2>${title}</h2>${description}
    <img src='/images/hello.jpg' style="width:400px;display:block;margin-top:10px;">`,
    `<a href="/topic/create">create</a>`,
    auth.statusUI(req, res)
  );
  res.send(html);
});

module.exports = router;
