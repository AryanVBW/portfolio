class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
        
        this.init();
    }
    
    init() {
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        });
        
        // Handle hover effects
        document.addEventListener('mouseover', (e) => {
            const target = e.target;
            if (this.isClickable(target)) {
                this.cursor.classList.add('clickable');
            } else if (this.isHoverable(target)) {
                this.cursor.classList.add('hover');
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            const target = e.target;
            if (this.isClickable(target)) {
                this.cursor.classList.remove('clickable');
            } else if (this.isHoverable(target)) {
                this.cursor.classList.remove('hover');
            }
        });
        
        // Handle click animation
        document.addEventListener('mousedown', () => {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });
        
        document.addEventListener('mouseup', () => {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }
    
    isClickable(element) {
        return (
            element.tagName === 'A' ||
            element.tagName === 'BUTTON' ||
            element.classList.contains('clickable') ||
            element.onclick !== null
        );
    }
    
    isHoverable(element) {
        return (
            element.tagName === 'P' ||
            element.tagName === 'SPAN' ||
            element.tagName === 'DIV' ||
            element.classList.contains('hoverable')
        );
    }
}

// Initialize the custom cursor
document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
}); 