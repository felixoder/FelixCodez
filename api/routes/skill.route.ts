import express from "express";
import { createSkill, getSkills } from "../controllers/skill.controller";
const router = express.Router();

router.post('/add-skill',createSkill);
router.get('/get-skills',getSkills)


export default router;