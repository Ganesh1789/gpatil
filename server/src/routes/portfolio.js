import express from 'express';
import protect from '../middleware/auth.js';
import {
  getSkills, createSkill, updateSkill, deleteSkill,
  getExperiences, createExperience, updateExperience, deleteExperience,
  getProjects, createProject, updateProject, deleteProject,
  getEducations, createEducation, updateEducation, deleteEducation
} from '../controllers/portfolio.js';

const router = express.Router();

// Skills routes
router.route('/skills')
  .get(getSkills)
  .post(protect, createSkill);
router.route('/skills/:id')
  .put(protect, updateSkill)
  .delete(protect, deleteSkill);

// Experience routes
router.route('/experiences')
  .get(getExperiences)
  .post(protect, createExperience);
router.route('/experiences/:id')
  .put(protect, updateExperience)
  .delete(protect, deleteExperience);

// Projects routes
router.route('/projects')
  .get(getProjects)
  .post(protect, createProject);
router.route('/projects/:id')
  .put(protect, updateProject)
  .delete(protect, deleteProject);

// Education routes
router.route('/education')
  .get(getEducations)
  .post(protect, createEducation);
router.route('/education/:id')
  .put(protect, updateEducation)
  .delete(protect, deleteEducation);

export default router;
