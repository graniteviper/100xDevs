const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
JWT_SECRET = "thisisarandomstringasjwtsecret";

const users = [];

app.use(express.json());

app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/index.html')
})

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
  else{
    res.json({
      message: "login not successful",
    });
  }
  
  // console.log(users);
});

app.get("/admin", function (req, res) {
  console.log(users);
  res.json({
    message: "Admin login successful!!",
  });
});

function auth(req, res, next) {
  let token = req.headers.token;
  if (token) {
    const decodedInfo = jwt.verify(token, JWT_SECRET);
    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === decodedInfo.username) {
        foundUser = users[i];
      }
    }
    if (foundUser) {
      req.username = decodedInfo.username;
        next();
      } else {
        res.json("User does not exist with this token.");
      }
  } else {
    res.status(400).json({
      error: "No token received.",
    });
  }
}

app.get("/me",auth, function (req, res) {
    console.log(req.username)
    return res.json({
      username: req.username,
      message:"me endpoint reached finally"
    })
});

app.listen(3000);
