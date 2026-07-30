import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Project from '../models/Project.js';
import Education from '../models/Education.js';

// --- SKILLS ---
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({});
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const { category, items } = req.body;
    const skill = new Skill({ category, items });
    const createdSkill = await skill.save();
    res.status(201).json(createdSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { category, items } = req.body;
    const skill = await Skill.findById(req.params.id);
    if (skill) {
      skill.category = category || skill.category;
      skill.items = items || skill.items;
      const updatedSkill = await skill.save();
      res.json(updatedSkill);
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (skill) {
      await skill.deleteOne();
      res.json({ message: 'Skill removed' });
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- EXPERIENCE ---
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({}).sort({ duration: -1 }); // Default sorting
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    const { role, company, location, duration, points } = req.body;
    const experience = new Experience({ role, company, location, duration, points });
    const createdExp = await experience.save();
    res.status(201).json(createdExp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { role, company, location, duration, points } = req.body;
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      experience.role = role || experience.role;
      experience.company = company || experience.company;
      experience.location = location || experience.location;
      experience.duration = duration || experience.duration;
      experience.points = points || experience.points;
      const updatedExp = await experience.save();
      res.json(updatedExp);
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      await experience.deleteOne();
      res.json({ message: 'Experience removed' });
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- PROJECTS ---
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { title, description, category, technologies, points, githubUrl, liveUrl } = req.body;
    const project = new Project({ title, description, category, technologies, points, githubUrl, liveUrl });
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { title, description, category, technologies, points, githubUrl, liveUrl } = req.body;
    const project = await Project.findById(req.params.id);
    if (project) {
      project.title = title || project.title;
      project.description = description || project.description;
      project.category = category || project.category;
      project.technologies = technologies || project.technologies;
      project.points = points || project.points;
      project.githubUrl = githubUrl !== undefined ? githubUrl : project.githubUrl;
      project.liveUrl = liveUrl !== undefined ? liveUrl : project.liveUrl;
      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- EDUCATION ---
export const getEducations = async (req, res) => {
  try {
    const educations = await Education.find({});
    res.json(educations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEducation = async (req, res) => {
  try {
    const { degree, institution, location, duration } = req.body;
    const education = new Education({ degree, institution, location, duration });
    const createdEdu = await education.save();
    res.status(201).json(createdEdu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const { degree, institution, location, duration } = req.body;
    const education = await Education.findById(req.params.id);
    if (education) {
      education.degree = degree || education.degree;
      education.institution = institution || education.institution;
      education.location = location || education.location;
      education.duration = duration || education.duration;
      const updatedEdu = await education.save();
      res.json(updatedEdu);
    } else {
      res.status(404).json({ message: 'Education not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (education) {
      await education.deleteOne();
      res.json({ message: 'Education removed' });
    } else {
      res.status(404).json({ message: 'Education not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
