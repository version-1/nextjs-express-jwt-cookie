import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import passport from 'passport'
import cookieParser from 'cookie-parser';
import session from 'express-session'
import './src/middlewares/passport'
const app = express()
const port = process.env.PORT || 8080 // default port to listen

app.use(express.json())
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(cookieParser());

// CORSを許可する
app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ALLOW_ORIGIN || "http://localhost:3000");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// define a route handler for the default home page
app.get('/', (req, res) => {
  const jwt = req.cookies.jwt
  res.json({ message: 'ok', jwt })
})

app.post('/login', function (req: any, res: Response, next: NextFunction) {
    const token = 'token'
    console.log(req.cookies)
    res.cookie("jwt", token, {
      maxAge: 2592000,
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.json({})
  })

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at ${port}`)
})
