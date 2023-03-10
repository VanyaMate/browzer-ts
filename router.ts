import express from "express";
import auth from "./api/auth";
import doc from "./api/doc";
import users from "./api/users";
import user from "./api/user";
import conversations from "./api/conversations";
import messages from "./api/messages";
import friends from "./api/friends";
import server from "./api/server";

const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/user', user);
router.use('/conversations', conversations);
router.use('/messages', messages);
router.use('/friends', friends);
router.use('/server', server);
router.get('/doc', doc);

export default router;