import express from 'express';
import { Login, Register, forgetPassword } from '../controllers/user.controller';

const router = express.Router();

router.route('/').get((req, res) => res.json("insifdet user"));
router.route('/login').post(Login);
router.route('/register').post(Register);
router.route('/forget').post(forgetPassword);


export default router;