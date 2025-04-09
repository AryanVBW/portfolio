// GitHub API configuration
const GITHUB_USERNAME = 'AryanVBW';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Function to fetch GitHub projects
async function fetchGitHubProjects() {
    try {
        const response = await fetch(GITHUB_API_URL);
        const projects = await response.json();
        return projects.filter(project => !project.fork); // Filter out forked repositories
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        return [];
    }
}

// Function to create project HTML
function createProjectHTML(project) {
    const projectBox = document.createElement('div');
    projectBox.className = 'project-box';
    
    // Get project description or use default
    const description = project.description || 'A GitHub project by AryanVBW';
    
    // Create project HTML structure
    projectBox.innerHTML = `
        <div class="info-div">
            <div class="project-header">
                <img src="${project.owner.avatar_url}" alt="${project.name}" class="faviconforProject">
                <h2 class="project-title">${project.name}</h2>
            </div>
            <p class="ProjectDescription">${description}</p>
            <div class="project-buttons">
                <a href="${project.html_url}" class="github-redirect" target="_blank" aria-label="Visit ${project.name} on GitHub">
                    <img src="src/svg/github.svg" alt="GitHub">
                </a>
                <a href="${project.homepage || project.html_url}" class="cta" target="_blank" aria-label="Visit ${project.name} Live Demo">
                    <span>Overview</span>
                    <svg width="66" height="43" viewBox="0 0 66 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M65.2071 21.2071C65.5976 20.8166 65.5976 20.1834 65.2071 19.7929L51.7071 6.29289C51.3166 5.90237 50.6834 5.90237 50.2929 6.29289C49.9024 6.68342 49.9024 7.31658 50.2929 7.70711L62.5858 20L50.2929 32.2929C49.9024 32.6834 49.9024 33.3166 50.2929 33.7071C50.6834 34.0976 51.3166 34.0976 51.7071 33.7071L65.2071 20.2071H0.5V21.2071H65.2071Z" fill="currentColor"/>
                    </svg>
                </a>
            </div>
        </div>
        <div class="live-preview-container">
            <div class="preview-frame-wrapper">
                <iframe class="live-preview-frame" src="${project.homepage || project.html_url}" title="${project.name} Preview"></iframe>
            </div>
            <div class="preview-toolbar">
                <span class="preview-label">Live Preview</span>
                <a href="${project.homepage || project.html_url}" class="open-new-tab" target="_blank" rel="noopener noreferrer">
                    Open in New Tab
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15 3h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 14L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>
        </div>
    `;
    
    return projectBox;
}

// Function to initialize projects
async function initializeProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    // Clear existing content
    projectsGrid.innerHTML = '';

    // Fetch and display projects
    const projects = await fetchGitHubProjects();
    projects.forEach(project => {
        const projectElement = createProjectHTML(project);
        projectsGrid.appendChild(projectElement);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjects); 