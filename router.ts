import express from "express";
import auth from "./api/auth";
import doc from "./api/doc";
import users from "./api/users";

const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
router.get('/doc', doc);

export default router;