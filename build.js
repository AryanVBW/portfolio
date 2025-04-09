const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Read the voice assistant file
let voiceAssistantContent = fs.readFileSync('voice-assistant.js', 'utf8');

// Replace the API key with the environment variable
voiceAssistantContent = voiceAssistantContent.replace(
    /this\.geminiApiKey = '.*?';/,
    `this.geminiApiKey = '${process.env.GEMINI_API_KEY}';`
);

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// Copy all files to dist directory
const filesToCopy = [
    'index.html',
    'style.css',
    'voice-assistant.css',
    'knowledge-base.js'
];

filesToCopy.forEach(file => {
    fs.copyFileSync(file, path.join('dist', file));
});

// Write the modified voice assistant file
fs.writeFileSync(path.join('dist', 'voice-assistant.js'), voiceAssistantContent);

console.log('Build completed successfully!'); 