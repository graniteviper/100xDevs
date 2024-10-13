const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
JWT_SECRET = "thisisarandomstringasjwtsecret";

const users = [];

app.use(express.json());

function genToken() {
  const arr =
    'qwertyuioplkjhgfdsazxcvbnmMNBVCXZASDFGHJKLPOIUYTREWQ/.,[]?><":}{-=+_*+/|';
  let token = "";
  for (let i = 0; i < 64; i++) {
    let num = Math.floor(Math.random() * arr.length + 1);
    token = token + arr[num];
  }
  return token;
}

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const prevl = users.length;

  users.push({
    username,
    password,
  });
  if ((users.length = prevl + 1)) {
    res.json({
      message: "signup successful",
    });
  } else {
    res.json({
      message: "user not created",
    });
  }
  // console.log(users);
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let user = users.find(function (u) {
    if (username === u.username && password === u.password) {
      return true;
    } else {
      return false;
    }
  });

  if (user) {
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );
    // user.token = token;
    res.json({
      message: "login successful",
      token: token,
    });
  }

  res.json({
    message: "login not successful",
  });
  // console.log(users);
});

app.get("/admin", function (req, res) {
  console.log(users);
  res.json({
    message: "Admin login successful!!",
  });
});

function auth(req, res, next) {
  let token = req.headers.authorisation;
  if (token) {
    const decodedInfo = jwt.verify(token, JWT_SECRET);
    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === decodedInfo.username) {
        foundUser = users[i];
      }
    }
    if (foundUser) {
        res.send("User found!!");
      } else {
        res.send("User does not exist with this token.");
      }
  } else {
    res.status(400).json({
      error: "No token received.",
    });
  }
}

app.get("/me",auth, function (req, res) {
    res.send("Me endpoint!!")
});

app.listen(3000);
