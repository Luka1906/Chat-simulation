const express = require(`express`);
const router = express.Router();
const chatController = require(`../controllers/chat`);
const loginController = require(`../controllers/login`)


router.get(`/`, loginController.getLogin);

router.post(`/`,loginController.postLogin )

router.get(`/chat`, chatController.getChat);

// router.post(`/chat`, chatController.postChat);



module.exports = router;