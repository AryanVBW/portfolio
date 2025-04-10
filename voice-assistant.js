import { searchKnowledgeBase, formatResponse } from './knowledge-base.js';

class VoiceAssistant {
    constructor() {
        this.isListening = false;
        this.messages = [];
        this.speechRecognition = null;
        this.speechSynthesis = window.speechSynthesis;
        this.geminiApiKey = 'AIzaSyD0vMygA0re8vMUBOp8ZrX2tgPqJmYNi24'; 
        this.initialize();
    }

    initialize() {
        // Create DOM elements
        this.createElements();
        // Initialize speech recognition
        this.initializeSpeechRecognition();
        // Add event listeners
        this.addEventListeners();
        // Add welcome message
        this.addMessage(`Hi! I'm Vivek 😊

I'm a first-year undergraduate student at Newton School of Technologies. It's a pleasure to connect with you!

While coding didn't come naturally to me at first, I've always had a strong passion for problem-solving and helping others. That's actually what drew me to the world of tech—to use my skills to make a difference and support communities through meaningful solutions.

Over the past 4 years, I've been actively contributing to open-source projects, and I've been fortunate to build over 107 GitHub projects, which have received more than 800 stars. Each project has been a step toward my goal of using technology for good.

I genuinely love working with a purpose and look forward to collaborating with like-minded individuals like you! 

How can I help you today? 🤗`, 'assistant');
        this.speak("Hi! I'm Vivek. I'm a first-year undergraduate student at Newton School of Technologies. It's a pleasure to connect with you! How can I help you today?");
    }

    createElements() {
        // Create container
        const container = document.createElement('div');
        container.className = 'voice-assistant-container';
        
        // Create button
        const button = document.createElement('button');
        button.className = 'voice-assistant-button';
        button.innerHTML = '<i class="fas fa-microphone"></i>';
        
        // Create chat window
        const chat = document.createElement('div');
        chat.className = 'voice-assistant-chat';
        
        // Create resize handles
        const resizeHandles = [
            { position: 'top-left', cursor: 'nw-resize' },
            { position: 'top-right', cursor: 'ne-resize' },
            { position: 'bottom-left', cursor: 'sw-resize' },
            { position: 'bottom-right', cursor: 'se-resize' }
        ];

        resizeHandles.forEach(handle => {
            const resizeHandle = document.createElement('div');
            resizeHandle.className = `resize-handle ${handle.position}`;
            resizeHandle.style.cursor = handle.cursor;
            chat.appendChild(resizeHandle);
        });
        
        // Create header
        const header = document.createElement('div');
        header.className = 'voice-assistant-header';
        header.innerHTML = `
            <span>Portfolio Assistant</span>
            <button class="close-chat"><i class="fas fa-times"></i></button>
        `;
        
        // Create messages container
        const messages = document.createElement('div');
        messages.className = 'voice-assistant-messages';
        
        // Create input container
        const input = document.createElement('div');
        input.className = 'voice-assistant-input';
        input.innerHTML = `
            <input type="text" placeholder="Type your message...">
            <button class="send-message"><i class="fas fa-paper-plane"></i></button>
        `;
        
        // Assemble components
        chat.appendChild(header);
        chat.appendChild(messages);
        chat.appendChild(input);
        container.appendChild(button);
        container.appendChild(chat);
        
        // Add to document
        document.body.appendChild(container);
        
        // Store references
        this.elements = {
            container,
            button,
            chat,
            messages,
            input: input.querySelector('input'),
            sendButton: input.querySelector('.send-message'),
            closeButton: header.querySelector('.close-chat')
        };

        // Initialize resizing
        this.initializeResizing();
    }

    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.speechRecognition = new webkitSpeechRecognition();
            this.speechRecognition.continuous = false;
            this.speechRecognition.interimResults = false;
            this.speechRecognition.lang = 'en-US';
            
            this.speechRecognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.handleUserInput(transcript);
            };
            
            this.speechRecognition.onend = () => {
                this.isListening = false;
                this.elements.button.classList.remove('listening');
            };
        }
    }

    addEventListeners() {
        // Toggle chat window
        this.elements.button.addEventListener('click', () => {
            this.elements.chat.classList.toggle('active');
        });
        
        // Close chat
        this.elements.closeButton.addEventListener('click', () => {
            this.elements.chat.classList.remove('active');
        });
        
        // Start/stop listening
        this.elements.button.addEventListener('click', (e) => {
            if (e.target.closest('.voice-assistant-button')) {
                if (!this.isListening) {
                    this.startListening();
                } else {
                    this.stopListening();
                }
            }
        });
        
        // Send message
        this.elements.sendButton.addEventListener('click', () => {
            const message = this.elements.input.value.trim();
            if (message) {
                this.handleUserInput(message);
                this.elements.input.value = '';
            }
        });
        
        // Send message on Enter
        this.elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = this.elements.input.value.trim();
                if (message) {
                    this.handleUserInput(message);
                    this.elements.input.value = '';
                }
            }
        });
    }

    startListening() {
        if (this.speechRecognition) {
            this.speechRecognition.start();
            this.isListening = true;
            this.elements.button.classList.add('listening');
        }
    }

    stopListening() {
        if (this.speechRecognition) {
            this.speechRecognition.stop();
            this.isListening = false;
            this.elements.button.classList.remove('listening');
        }
    }

    handleUserInput(input) {
        this.addMessage(input, 'user');
        
        // Process the input and generate response
        this.processInput(input);
    }

    async processInput(input) {
        try {
            // First, search the knowledge base
            const knowledgeResults = searchKnowledgeBase(input);
            let response;

            if (knowledgeResults.length > 0) {
                // If found in knowledge base, use that response
                response = formatResponse(knowledgeResults);
            } else {
                // If not found, use Gemini API for more contextual responses
                response = await this.generateResponseWithGemini(input);
            }

            this.addMessage(response, 'assistant');
            this.speak(response);
        } catch (error) {
            console.error('Error processing input:', error);
            this.addMessage("I'm sorry, I encountered an error. Please try again.", 'assistant');
        }
    }

    async generateResponseWithGemini(input) {
        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + this.geminiApiKey, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are Vivek Wagdare, a frontend developer. The user asked: "${input}". 
                            Please provide a helpful response in first person, as if you are Vivek himself. Base your response on the following context:
                            - I am a frontend developer with expertise in web development
                            - I have worked on projects like LinuxDroid, ANDRO, Exif, WIFIjam, and RDPtown
                            - My skills include HTML, CSS, JavaScript, Python, and various frameworks
                            - I am proficient in multiple operating systems and cloud platforms
                            - I am passionate about creating beautiful and functional web applications
                            
                            Please follow these response guidelines:
                            1. Be humble and modest about achievements
                            2. Use friendly and conversational language
                            3. Show enthusiasm about your work
                            4. Be helpful and supportive
                            5. Use emojis occasionally to make responses more engaging
                            6. Keep responses concise but informative
                            7. Share personal insights and experiences
                            8. Be approachable and relatable
                            
                            Example response style:
                            "I'd love to tell you about my experience with web development! 😊 I've been working on creating beautiful and functional websites for a while now, and it's something I'm really passionate about. While I'm proud of my work, I'm always learning and improving my skills. Would you like to know more about any specific project I've worked on?"
                            
                            Remember to maintain a humble and friendly tone throughout.`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.8,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        },
                        {
                            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                            threshold: "BLOCK_MEDIUM_AND_ABOVE"
                        }
                    ]
                })
            });

            const data = await response.json();
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                console.error('Unexpected response format:', data);
                return "I'm sorry, I couldn't process your request properly. Please try again.";
            }
        } catch (error) {
            console.error('Error with Gemini API:', error);
            return "I'm sorry, I couldn't process your request at the moment. Please try again later.";
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        this.elements.messages.appendChild(messageDiv);
        this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
    }

    speak(text) {
        if (this.speechSynthesis) {
            // Remove emojis from the text before speaking
            const textWithoutEmojis = text.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
            
            const utterance = new SpeechSynthesisUtterance(textWithoutEmojis);
            
            // Get available voices
            const voices = this.speechSynthesis.getVoices();
            
            // Try to find the most natural-sounding voice
            const preferredVoices = [
                'Google US English Female',
                'Microsoft Zira Desktop',
                'Microsoft Mark Desktop',
                'Samantha',
                'Alex',
                'Google UK English Female',
                'Google UK English Male'
            ];
            
            // Find the first available preferred voice
            const selectedVoice = voices.find(voice => 
                preferredVoices.includes(voice.name)
            ) || voices[0];
            
            utterance.voice = selectedVoice;
            
            // Customize voice settings for more natural speech
            utterance.rate = 1.5;  // Slightly faster than normal (0.1 to 10)
            utterance.pitch = 1.0; // Normal pitch (0 to 2)
            utterance.volume = 1.0; // Full volume (0 to 1)
            
            // Add slight pauses between sentences for more natural speech
            const sentences = textWithoutEmojis.split(/[.!?]+/).filter(s => s.trim());
            if (sentences.length > 1) {
                utterance.text = sentences.join('. ');
            }
            
            // Add emphasis to important words
            utterance.text = utterance.text.replace(/\b(important|key|major|expert|proficient)\b/gi, 
                match => `<emphasis level="strong">${match}</emphasis>`);
            
            this.speechSynthesis.speak(utterance);
        }
    }

    initializeResizing() {
        const chat = this.elements.chat;
        const resizeHandles = chat.querySelectorAll('.resize-handle');
        
        resizeHandles.forEach(handle => {
            handle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = chat.offsetWidth;
                const startHeight = chat.offsetHeight;
                const startLeft = chat.offsetLeft;
                const startTop = chat.offsetTop;
                
                // Add active class to handle
                handle.classList.add('active');
                
                const handleResize = (e) => {
                    const deltaX = e.clientX - startX;
                    const deltaY = e.clientY - startY;
                    
                    // Calculate new dimensions
                    let newWidth, newHeight, newLeft, newTop;
                    
                    if (handle.classList.contains('top-left')) {
                        newWidth = Math.max(300, startWidth - deltaX);
                        newHeight = Math.max(400, startHeight - deltaY);
                        newLeft = startLeft + deltaX;
                        newTop = startTop + deltaY;
                    } else if (handle.classList.contains('top-right')) {
                        newWidth = Math.max(300, startWidth + deltaX);
                        newHeight = Math.max(400, startHeight - deltaY);
                        newTop = startTop + deltaY;
                    } else if (handle.classList.contains('bottom-left')) {
                        newWidth = Math.max(300, startWidth - deltaX);
                        newHeight = Math.max(400, startHeight + deltaY);
                        newLeft = startLeft + deltaX;
                    } else if (handle.classList.contains('bottom-right')) {
                        newWidth = Math.max(300, startWidth + deltaX);
                        newHeight = Math.max(400, startHeight + deltaY);
                    }
                    
                    // Apply new dimensions
                    chat.style.width = `${newWidth}px`;
                    chat.style.height = `${newHeight}px`;
                    
                    if (newLeft !== undefined) {
                        chat.style.left = `${newLeft}px`;
                    }
                    if (newTop !== undefined) {
                        chat.style.top = `${newTop}px`;
                    }
                    
                    // Ensure chat stays within viewport
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;
                    
                    if (chat.offsetLeft + chat.offsetWidth > viewportWidth) {
                        chat.style.left = `${viewportWidth - chat.offsetWidth}px`;
                    }
                    if (chat.offsetTop + chat.offsetHeight > viewportHeight) {
                        chat.style.top = `${viewportHeight - chat.offsetHeight}px`;
                    }
                    if (chat.offsetLeft < 0) {
                        chat.style.left = '0px';
                    }
                    if (chat.offsetTop < 0) {
                        chat.style.top = '0px';
                    }
                };
                
                const stopResize = () => {
                    document.removeEventListener('mousemove', handleResize);
                    document.removeEventListener('mouseup', stopResize);
                    handle.classList.remove('active');
                };
                
                document.addEventListener('mousemove', handleResize);
                document.addEventListener('mouseup', stopResize);
            });
        });
    }
}

// Initialize the voice assistant when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new VoiceAssistant();
}); 