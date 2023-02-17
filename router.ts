import express from "express";
import auth from "./api/auth";
import doc from "./api/doc";

const router = express.Router();

// router.post('/auth', auth);
router.use('/auth', auth);
router.get('/doc', doc);

export default router;