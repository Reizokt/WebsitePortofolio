// Load environment variables from .env file
require('dotenv').config();

const mongoose = require('mongoose');
const Project = require('./models/Project');      // Import your Project model
const SkillProject = require('./models/SkillProject'); // Import your SkillProject model

// --- Data for Projects (Existing - UNCHANGED) ---
const projectsToSeed = [
    // Your existing project data here (UNCHANGED)
    {
        title: "Simple-Foto-Editor",
        description: "Python Based Foto Editor",
        technologies: ["Python"],
        liveLink: "https://example.com/ecommerce",
        githubLink: "https://github.com/Reizokt/Mini-Project-Simple-Foto-Editor",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.finansialku.com%2Flifestyle%2Faplikasi-edit-foto%2F&psig=AOvVaw3LuNfUkDECd8S_Rndv7K9a&ust=1751292290865000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDtyKrmlo4DFQAAAAAdAAAAABAL"
    },
    {
        title: "Dog-Breeds Deep Learning Model",
        description: "Deep Learning model that specify dog breeds via Transfer Learning",
        technologies: ["Pyhton"],
        liveLink: "https://example.com/task-app",
        githubLink: "https://github.com/Reizokt/Dog_Breeds_-Deep-Learning-model-",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmoney.com%2Fbest-small-dog-breeds%2F&psig=AOvVaw0_i1Di4G4wjtmWLx632ETi&ust=1751292333966000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNinyL3mlo4DFQAAAAAdAAAAABAE"
    },
    {
        title: "Whats app Clone",
        description: "Group Project in Android studio building a clone of whats app",
        technologies: ["Java"],
        liveLink: "https://example.com/weather-dashboard",
        githubLink: "https://github.com/chris001002/Whatsapp-clone",
        image: "https://gadget.jagatreview.com/wp-content/uploads/2024/12/WhatsApp-header-1024x500-1.jpg"
    },
    {
        title: "Basic To-do List Project",
        description: "Basic Group To-do list Project",
        technologies: ["HTML"],
        liveLink: "https://github.com/chris001002/SofwareEngineering-TodoListProject-2024",
        githubLink: "https://github.com/chris001002/SofwareEngineering-TodoListProject-2024",
        image: null // Set to null for now as per your request
    },
    {
        title: "Defect Detection and Root Cause Analysis",
        description: "This is a group project regarding detecting defect and its root cause",
        technologies: ["Python","Yolo","Mask-RCNN"],
        liveLink: "https://example.com/blog-cms",
        githubLink: "https://github.com/chris001002/Defect-Detection-and-Root-Cause-Analysis",
        image: "https://miro.medium.com/v2/resize:fit:1400/0*gqEmmgS29EfU4DMh"
    },
    {
        title: "Data-Series-14.0-AIML",
        description: "This is a Machine Learning modeling project using regression",
        technologies: ["Python","Pandas","Numpy","seaborn"],
        liveLink: "https://example.com/banking-app",
        githubLink: "https://github.com/Reizokt/Data-Series-14.0-AIML",
        image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Regression_vs_Classification.jpg"// Set to null for now as per your request
    }
];

// --- Data for Skills (MODIFIED) ---
const skillProjectsToSeed = [
    {
        category: "Complete A.I. & Machine Learning, Data Science Bootcamp",
        achievements: [{ name: "Python", link: null }, { name: "Miniconda", link: null }, { name: "Google Collab", link: null }],
        image: "https://udemy-certificate.s3.amazonaws.com/image/UC-f17a0a7c-96d1-4023-bdfe-466107316af5.jpg?v=1750054522000",
        projectTitle: "Udemy Online Course",
        description: "This is an E-Learning Course with around 44 Hours of learning time",
        certificationLink: "https://udemy-certificate.s3.amazonaws.com/image/UC-f17a0a7c-96d1-4023-bdfe-466107316af5.jpg?v=1750054522000" // Added certification link
    },
    {
        category: "Bootcamp Skillvul Python",
        achievements: [{ name: "Python", link: null }],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43-QiFor-9nJlKDK4BaAtUqs4LM1vvwuLxiRRcIFgP4XvLveOGMcysDyMPpNrrRAqcWA&usqp=CAU",
        projectTitle: "Python Learning Course",
        description: "Skillvul Bootcamp Learning about python",
        certificationLink: "https://badgr.com/public/assertions/Xzftq2H-S2CUN_CL3HP3Rg?identity__email=joenath376@gmail.com" // Added certification link
    },
    {
        category: "Bootcamp Skillvul C++",
        achievements: [{ name: "C++", link: null },{ name: "Uncertified", link: null }],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43-QiFor-9nJlKDK4BaAtUqs4LM1vvwuLxiRRcIFgP4XvLveOGMcysDyMPpNrrRAqcWA&usqp=CAU",
        projectTitle: "C++ Learning Course",
        description: "Skillvul Bootcamp Learning Course about C++",
        certificationLink: null // No certification link for this one, or add one if available
    },
    {
        category: "Duo Linggo English Test",
        achievements: [{ name: "English Language", link: null }],
        image: "https://blog.duolingo.com/content/images/2024/06/cover_International-education-trends-via-the-worlds-most-accessible-English-test.png",
        projectTitle: "Certification of English test",
        description: "Certification of a Duolingo English test I took.",
        certificationLink: "https://certs.duolingo.com/a0b7d5e06d915960b2f1fdaff3ad665a" // Added certification link
    }
];

async function seedProjects() {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        console.error('Error: MONGODB_URI is not defined in your .env file.');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connection established successfully for seeding!');

        // --- Seed Projects ---
        await Project.deleteMany({});
        console.log('Existing projects cleared from database.');
        const insertedProjects = await Project.insertMany(projectsToSeed);
        console.log(`Successfully seeded ${insertedProjects.length} portfolio projects!`);

        // --- Seed Skill Projects ---
        await SkillProject.deleteMany({}); // Clear existing skill projects
        console.log('Existing skill projects cleared from database.');
        const insertedSkillProjects = await SkillProject.insertMany(skillProjectsToSeed);
        console.log(`Successfully seeded ${insertedSkillProjects.length} skill projects!`);

    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
}

seedProjects();