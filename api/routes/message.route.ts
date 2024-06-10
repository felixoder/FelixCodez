import express from 'express'
import { deleteMessages, getMessage, sendMessage } from '../controllers/message.controller';
const router = express.Router();


router.post('/send-message',sendMessage);
router.get('/get-message',getMessage)
router.delete('/delete-message/:messageId',deleteMessages);

export default router;