import express from "express";
import auth from "./api/auth";
import doc from "./api/doc";
import users from "./api/users";
import user from "./api/user";
import conversations from "./api/conversations";

const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/user', user);
router.use('/conversations', conversations);
router.get('/doc', doc);

export default router;