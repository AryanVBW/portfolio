import { searchKnowledgeBase, formatResponse } from './knowledge-base.js';

class VoiceAssistant {
    constructor() {
        this.isListening = false;
        this.messages = [];
        this.speechRecognition = null;
        this.speechSynthesis = window.speechSynthesis;
        this.geminiApiKey = process.env.GEMINI_API_KEY || ''; // Use environment variable
        this.voiceQueue = [];
        this.isSpeaking = false;
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
        this.addMessage("Hello! I'm your portfolio assistant. How can I help you today?", 'assistant');
        this.speak("Hello! I'm your portfolio assistant. How can I help you today?");
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
                            text: `You are a portfolio assistant for Vivek Wagdare. The user asked: "${input}". 
                            Please provide a helpful response based on the following context:
                            - Vivek is a frontend developer with expertise in web development
                            - He has worked on projects like LinuxDroid, ANDRO, Exif, WIFIjam, and RDPtown
                            - His skills include HTML, CSS, JavaScript, Python, and various frameworks
                            - He is proficient in multiple operating systems and cloud platforms
                            - He is passionate about creating beautiful and functional web applications
                            
                            Keep your response concise, friendly, and focused on Vivek's portfolio information.`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
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
            const utterance = new SpeechSynthesisUtterance(text);
            
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
            const sentences = text.split(/[.!?]+/).filter(s => s.trim());
            if (sentences.length > 1) {
                utterance.text = sentences.join('. ');
            }
            
            // Add emphasis to important words
            utterance.text = utterance.text.replace(/\b(important|key|major|expert|proficient)\b/gi, 
                match => `<emphasis level="strong">${match}</emphasis>`);
            
            this.speechSynthesis.speak(utterance);
        }
    }
}

// Initialize the voice assistant when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new VoiceAssistant();
}); 