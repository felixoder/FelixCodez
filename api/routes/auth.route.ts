import express from 'express';
import { signin, signout } from '../controllers/auth.controller';
// import {signup} from '../controllers/auth.controller';
const router = express.Router();

router.post('/sign-in', signin);
// router.post('/sign-up',signup);
router.post('/sign-out',signout)

export default router;
