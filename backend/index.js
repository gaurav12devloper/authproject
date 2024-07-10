import express from 'express';
import cookieSession from 'cookie-session';
import cors from 'cors';
import passport from 'passport';
import passportSetup from "./passport.js";
import authRoutes from "./routes/auth.js";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
connectDB();

const app = express();
dotenv.config();
app.use(cookieSession({
    name: 'session',
    keys: process.env.COOKIE_SECRET,
    maxAge: 24 * 60 * 60 * 1000
}));    

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(
    {
        origin: "https://authproject12.netlify.app/",
        methods: "GET,PUT,PATCH,POST,DELETE",
        credentials: true
    }
));

app.use("/auth",authRoutes);

const __dirname = path.resolve(); // to use __dirname in ES6

if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend/build/index.html')); 
    })

}
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

