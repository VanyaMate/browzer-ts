import express from 'express';
import security from "./user-api/security";
import personalInfo from "./user-api/personalInfo";
import preference from "./user-api/preference";
import friend from "./user-api/friend";
import photo from "./user-api/photo";
import music from "./user-api/music";
import notification from "./user-api/notification";

const user = express.Router();

user.use('/security', security);
user.use('/personalInfo', personalInfo);
user.use('/preference', preference);
user.use('/friend', friend);
user.use('/photo', photo);
user.use('/music', music);
user.use('/notification', notification);


export default user;