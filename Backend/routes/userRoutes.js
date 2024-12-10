import express from "express"
import handleUserSignup, { handleUserLogin } from "../controllers/user.js";

const router =express.Router();

router.post('/signup', handleUserSignup);

router.post('/login', handleUserLogin);
export default router
