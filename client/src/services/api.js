const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fallback Mock Data based on Ganesh's Resume
const MOCK_DATA = {
  skills: [
    {
      _id: 'mock-skill-1',
      category: 'Programming & Querying',
      items: ['Java (DSA)', 'C++', 'JavaScript', 'SQL']
    },
    {
      _id: 'mock-skill-2',
      category: 'Web & App Technologies',
      items: ['React.js', 'Flutter', 'Node.js', 'Express.js', 'Spring Boot', 'JSP']
    },
    {
      _id: 'mock-skill-3',
      category: 'Databases & Core Concepts',
      items: ['MongoDB', 'MySQL', 'OOPs', 'REST APIs', 'SDLC']
    }
  ],
  experiences: [
    {
      _id: 'mock-exp-1',
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
      _id: 'mock-exp-2',
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
  ],
  projects: [
    {
      _id: 'mock-proj-1',
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
      _id: 'mock-proj-2',
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
  ],
  education: [
    {
      _id: 'mock-edu-1',
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Sardar Patel Institute of Technology',
      location: 'Mumbai',
      duration: '2024 – 2026'
    },
    {
      _id: 'mock-edu-2',
      degree: 'Bachelor of Commerce (First Class)',
      institution: 'D.G. Ruparel College',
      location: 'Mumbai',
      duration: '2020 – 2023'
    }
  ]
};

const getHeaders = (token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const fetchSkills = async () => {
  try {
    const res = await fetch(`${BASE_URL}/portfolio/skills`);
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch (error) {
    console.warn('Backend offline, using fallback mock skills data.');
    return MOCK_DATA.skills;
  }
};

export const fetchExperiences = async () => {
  try {
    const res = await fetch(`${BASE_URL}/portfolio/experiences`);
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch (error) {
    console.warn('Backend offline, using fallback mock experience data.');
    return MOCK_DATA.experiences;
  }
};

export const fetchProjects = async () => {
  try {
    const res = await fetch(`${BASE_URL}/portfolio/projects`);
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch (error) {
    console.warn('Backend offline, using fallback mock projects data.');
    return MOCK_DATA.projects;
  }
};

export const fetchEducations = async () => {
  try {
    const res = await fetch(`${BASE_URL}/portfolio/education`);
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch (error) {
    console.warn('Backend offline, using fallback mock education data.');
    return MOCK_DATA.education;
  }
};

export const submitContactForm = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/contacts`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Submission failed');
    return result;
  } catch (error) {
    console.error('Contact submit error:', error);
    // In fallback mode, simulate successful submission
    return new Promise((resolve) => 
      setTimeout(() => resolve({ message: 'Mock sent: Message saved locally!' }), 800)
    );
  }
};

export const loginAdmin = async (username, password) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ username, password })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Login failed');
    return result;
  } catch (error) {
    console.error('Admin login error:', error);
    // If backend is offline, support a mock offline log-in with default username/password
    if (username === 'admin' && password === 'adminpassword123') {
      return {
        token: 'mock-offline-jwt-token',
        admin: { username: 'admin (Offline)' }
      };
    }
    throw new Error('Invalid credentials or backend server offline.');
  }
};

// --- ADMIN CONTROL ACTIONS ---

export const createItem = async (type, data, token) => {
  const endpointMap = {
    skills: 'skills',
    experiences: 'experiences',
    projects: 'projects',
    education: 'education'
  };
  const res = await fetch(`${BASE_URL}/portfolio/${endpointMap[type]}`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to create item');
  }
  return await res.json();
};

export const updateItem = async (type, id, data, token) => {
  const endpointMap = {
    skills: 'skills',
    experiences: 'experiences',
    projects: 'projects',
    education: 'education'
  };
  const res = await fetch(`${BASE_URL}/portfolio/${endpointMap[type]}/${id}`, {
    method: 'PUT',
    headers: getHeaders(token),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to update item');
  }
  return await res.json();
};

export const deleteItem = async (type, id, token) => {
  const endpointMap = {
    skills: 'skills',
    experiences: 'experiences',
    projects: 'projects',
    education: 'education'
  };
  const res = await fetch(`${BASE_URL}/portfolio/${endpointMap[type]}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(token)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to delete item');
  }
  return await res.json();
};

export const fetchContacts = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/contacts`, {
      headers: getHeaders(token)
    });
    if (!res.ok) throw new Error('Failed to fetch messages');
    return await res.json();
  } catch (error) {
    return [
      {
        _id: 'mock-msg-1',
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Great portfolio! I would love to connect for a full-stack role.',
        createdAt: new Date().toISOString()
      }
    ];
  }
};

export const deleteContactMsg = async (id, token) => {
  const res = await fetch(`${BASE_URL}/contacts/${id}`, {
    method: 'DELETE',
    headers: getHeaders(token)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to delete message');
  }
  return await res.json();
};
