import { Router } from 'express';
import UserController from '../controllers/user.controllers.js';
const router = Router();
const controllers = new UserController();

router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.post('/logout', controllers.logout);


export default router;