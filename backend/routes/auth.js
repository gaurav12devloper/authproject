import express from 'express';
import passport from 'passport';
const router = express.Router();

const CLIENT_URL = "https://authproject12.netlify.app/";


router.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
      });
    }
  });
  
  router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });
  
  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
  });

// auth login
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['profile', 'email', 'user_photos', 'user_birthday']
}));


router.get("/facebook/callback", 
    passport.authenticate('facebook', {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

export default router;