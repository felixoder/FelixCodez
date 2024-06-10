import express from 'express'
import { createProject, deleteProjects, getProjects, updateProject } from '../controllers/project.controller';
const router = express.Router();


router.post('/create-project',createProject);
router.get('/get-projects',getProjects);
router.delete('/delete-project/:projectId',deleteProjects);
router.put('/update-project/:projectId', updateProject);


export default router;