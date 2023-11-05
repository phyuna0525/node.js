const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

// 사용자 정보를 저장할 데이터베이스
const db = new Map();

// key = value 형식으로 브라우저에 저장되는 쿠키의 key
const USER_COOKIE_KEY = "USER";

// html을 클라이언트에 제공하기 위한 미들웨어
app.use(express.static(path.join(__dirname, "public")));
// 쿠키 파싱하기 위한 미들웨어
app.use(cookieParser());
// x-www-form-urlencoded 타입의 form 데이터를 파싱하기 위한 미들웨어
app.use(express.json());

app.listen(3000, () => {
  console.log("서버 잘 작동됨");
});

app.post("/signup", (req, res) => {
  const { username, name, password } = req.body;
  const exists = db.get(username);

  // 이미 존재하는 username일 경우 회원 가입 실패
  if (exists) {
    res.status(400).send(`duplicate username: ${username}`);
    return;
  }

  // 아직 가입되지 않은 사람일 경우 db에 저장
  // key: username, value: {username, password}
  const newUser = {
    username,
    name,
    password,
  };
  db.set(username, newUser);

  res.cookie(USER_COOKIE_KEY, JSON.stringify(newUser));
  res.redirect("/");
});

app.get("/", (req, res) => {
  const user = req.cookies[USER_COOKIE_KEY];

  if (user) {
    const userData = JSON.parse(user);

    if (userData && db.get(userData.username)) {
      const userInfo = db.get(userData.username);
      res
        .status(200)
        .send(
          `<a href="/logout">LOG OUT</a> <h1>id : ${userInfo.username} name : ${userInfo.name} password : ${userInfo.password}</h1>`
        );
      return;
    }
  }

  res.status(200).send(`
    <a href="/login.html">Log In</a>
    <a href="/signup.html">Sign Up</a>
    <h1>Not Logged In</h1>
  `);
});

app.get("/logout", (req, res) => {
  // 쿠키 삭제 후 루트 페이지로 이동
  res.clearCookie(USER_COOKIE_KEY);
  res.redirect("/");
});
