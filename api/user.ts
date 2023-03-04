import express from 'express';
import security from "./user-api/security";
import personalInfo from "./user-api/personalInfo";
import preference from "./user-api/preference";
import photo from "./user-api/photo";
import music from "./user-api/music";
import notification from "./user-api/notification";
import block from './user-api/block';

const user = express.Router();

user.use('/security', security);
user.use('/personalInfo', personalInfo);
user.use('/preference', preference);
user.use('/photo', photo);
user.use('/MusicComponent', music);
user.use('/notification', notification);
user.use('/block', block);


export default user;