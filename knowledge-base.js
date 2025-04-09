const knowledgeBase = {
    personalInfo: {
        name: "Vivek Wagdare",
        role: "Frontend Developer",
        email: "vivek.aryanvbw@gmail.com",
        github: "https://github.com/AryanVBW",
        location: "India",
        bio: "Self-taught frontend developer with a passion for creating beautiful and functional web applications."
    },
    skills: {
        languages: ["HTML", "CSS", "JavaScript", "Python"],
        frameworks: ["React", "Vue.js", "Next.js"],
        tools: ["Git", "VS Code", "Figma", "Adobe XD"],
        other: ["Responsive Design", "UI/UX", "Web Performance", "Accessibility"]
    },
    projects: [
        {
            name: "Portfolio Website",
            description: "A modern, responsive portfolio website showcasing my work and skills.",
            technologies: ["HTML", "CSS", "JavaScript", "AOS"],
            github: "https://github.com/AryanVBW/portfolio",
            features: [
                "Interactive UI elements",
                "Responsive design",
                "Voice assistant integration",
                "Project showcase"
            ]
        },
        {
            name: "Voice Assistant",
            description: "AI-powered voice assistant for portfolio interaction.",
            technologies: ["JavaScript", "Web Speech API", "Gemini API"],
            features: [
                "Voice recognition",
                "Text-to-speech",
                "Natural language processing",
                "Contextual responses"
            ]
        }
    ],
    experience: [
        {
            role: "Frontend Developer",
            period: "2023 - Present",
            description: "Working on various web development projects, focusing on creating responsive and user-friendly interfaces."
        }
    ],
    education: [
        {
            degree: "Self-taught Developer",
            period: "2022 - Present",
            description: "Continuous learning through online resources, documentation, and practical projects."
        }
    ],
    socialLinks: {
        github: "https://github.com/AryanVBW",
        email: "mailto:vivek.aryanvbw@gmail.com",
        resume: "src/pdf/Vivek W Resume.pdf"
    }
};

// Function to search knowledge base
function searchKnowledgeBase(query) {
    const lowerQuery = query.toLowerCase();
    let results = [];

    // Search through all sections
    for (const [section, content] of Object.entries(knowledgeBase)) {
        if (typeof content === 'object') {
            if (Array.isArray(content)) {
                // Search in arrays (projects, experience, education)
                content.forEach(item => {
                    if (JSON.stringify(item).toLowerCase().includes(lowerQuery)) {
                        results.push({ section, data: item });
                    }
                });
            } else {
                // Search in objects (personalInfo, skills, socialLinks)
                if (JSON.stringify(content).toLowerCase().includes(lowerQuery)) {
                    results.push({ section, data: content });
                }
            }
        }
    }

    return results;
}

// Function to format response
function formatResponse(results) {
    if (results.length === 0) {
        return "I'm sorry, I couldn't find information about that. You can ask me about my skills, projects, or experience.";
    }

    let response = "";
    results.forEach(result => {
        const { section, data } = result;
        switch (section) {
            case 'personalInfo':
                response += `Here's some information about me: ${data.bio}\n`;
                break;
            case 'skills':
                response += `My skills include:\n`;
                for (const [category, items] of Object.entries(data)) {
                    response += `${category}: ${items.join(', ')}\n`;
                }
                break;
            case 'projects':
                response += `Here are my projects:\n`;
                data.forEach(project => {
                    response += `${project.name}: ${project.description}\n`;
                    response += `Technologies used: ${project.technologies.join(', ')}\n`;
                });
                break;
            case 'experience':
                response += `My experience includes:\n`;
                data.forEach(exp => {
                    response += `${exp.role} (${exp.period}): ${exp.description}\n`;
                });
                break;
            case 'education':
                response += `My education background:\n`;
                data.forEach(edu => {
                    response += `${edu.degree} (${edu.period}): ${edu.description}\n`;
                });
                break;
        }
    });

    return response;
}

export { knowledgeBase, searchKnowledgeBase, formatResponse }; 