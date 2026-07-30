import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

import connectDB from '../config/db.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Project from '../models/Project.js';
import Education from '../models/Education.js';
import Admin from '../models/Admin.js';
import Contact from '../models/Contact.js';

const seedData = async () => {
  try {
    await connectDB();

    // Clear old data
    await Skill.deleteMany();
    await Experience.deleteMany();
    await Project.deleteMany();
    await Education.deleteMany();
    await Admin.deleteMany();
    await Contact.deleteMany();

    console.log('Database cleared.');

    // Seed Admin
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'adminpassword123';
    
    const admin = new Admin({ username, password });
    await admin.save();
    console.log(`Admin user created: username="${username}", password="${password}"`);

    // Seed Skills
    const skills = [
      {
        category: 'Programming & Querying',
        items: ['Java (DSA)', 'C++', 'JavaScript', 'SQL']
      },
      {
        category: 'Web & App Technologies',
        items: ['React.js', 'Flutter', 'Node.js', 'Express.js', 'Spring Boot', 'JSP']
      },
      {
        category: 'Databases & Core Concepts',
        items: ['MongoDB', 'MySQL', 'OOPs', 'REST APIs', 'SDLC']
      }
    ];
    await Skill.insertMany(skills);
    console.log('Skills seeded.');

    // Seed Experiences
    const experiences = [
      {
        role: 'MERN Stack Developer Intern',
        company: 'CPIOMBO SERVTEC Pvt Ltd',
        location: 'Mumbai',
        duration: 'Jan 2026 – Jun 2026',
        points: [
          'Developed enterprise web applications using React.js, Node.js, Express.js, and MongoDB.',
          'Built REST APIs and contributed to Fabrix, Site Visit, and HRMS portals.',
          'Performed debugging, testing, and feature enhancements in Agile development.'
        ]
      },
      {
        role: 'Spatial Data Specialist',
        company: 'HERE Technologies',
        location: 'Mumbai',
        duration: 'July 2023 – September 2024',
        points: [
          'Analyzed satellite imagery, LiDAR data, and shapefiles for map digitization and database updates.',
          'Applied QA processes to validate spatial datasets and ensure accuracy across production map systems.',
          'Interpreted geospatial scenarios to support real-time map corrections at HERE’s global navigation platform.'
        ]
      }
    ];
    await Experience.insertMany(experiences);
    console.log('Experiences seeded.');

    // Seed Projects
    const projects = [
      {
        title: 'Online Fuel Delivery System',
        description: 'Developed a full-stack web platform for online fuel ordering with secure JWT-based authentication.',
        category: 'MERN Stack',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Razorpay'],
        points: [
          'Developed a full-stack web platform for online fuel ordering with secure JWT-based authentication.',
          'Integrated Razorpay payment gateway and implemented real-time location tracking.',
          'Designed RESTful APIs and ensured secure communication between frontend and backend services.',
          'Implemented role-based access control to restrict buyer, delivery agent, and admin functionalities across the platform.'
        ],
        githubUrl: 'https://github.com/Ganesh1789/fuel-delivery',
        liveUrl: 'https://fuel.gpatil.in'
      },
      {
        title: 'Gym Slot Booking System',
        description: 'Built a web application for gym slot booking with role-based access for admin and users.',
        category: 'Spring Boot',
        technologies: ['Spring Boot', 'JSP', 'Servlets', 'MySQL'],
        points: [
          'Built a web application for gym slot booking with role-based access for admin and users.',
          'Implemented session management, authentication, and slot availability logic.',
          'Integrated Spring Boot, JSP, Servlets, and MySQL for backend operations.',
          'Built admin panel with CRUD operations to manage members, time slots, and booking records via MySQL.'
        ],
        githubUrl: 'https://github.com/Ganesh1789/gym-booking',
        liveUrl: 'https://gym.gpatil.in'
      }
    ];
    await Project.insertMany(projects);
    console.log('Projects seeded.');

    // Seed Education
    const education = [
      {
        degree: 'Master of Computer Applications (MCA)',
        institution: 'Sardar Patel Institute of Technology',
        location: 'Mumbai',
        duration: '2024 – 2026'
      },
      {
        degree: 'Bachelor of Commerce (First Class)',
        institution: 'D.G. Ruparel College',
        location: 'Mumbai',
        duration: '2020 – 2023'
      }
    ];
    await Education.insertMany(education);
    console.log('Education seeded.');

    console.log('Data successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
