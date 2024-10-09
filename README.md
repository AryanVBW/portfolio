<p align="center">
<img src="https://github.com/AryanVBW/kali-Linux-Android/releases/download/1/removebackground.png" height="80">
</p>
<div align="center">
<h2 style="text-align: center; color: #0074D9;">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=0074D9&random=false&width=435&lines=Hello%2C+I'm+Vivek+Wagdare+👋" alt="Typing SVG" />
</h2>


I'm a passionate developer, coder, and technology geek with a knack for hacking into challenges and solving them one line of code at a time. 🚀

[![GitHub followers](https://img.shields.io/github/followers/yourusername?label=Follow&style=social)](https://github.com/Aryanvbw)
[![Twitter Follow](https://img.shields.io/twitter/follow/yourtwitterhandle?label=Follow&style=social)](https://x.com/vivekwagadare?t=nuIH3LUbo8o2o1Rjxot-hA&s=09)
[![Netlify Status](https://api.netlify.com/api/v1/badges/518abbc0-2260-4e61-a47c-febf065288c2/deploy-status)](https://app.netlify.com/sites/vivekw-portfolio/deploys)
<a href="https://instagram.com/vivekbw"><img src="https://img.shields.io/badge/Instagram-Follow%20@Vivek-E1306C"/></a>
<a href="https://instagram.com/aryan_technolog1es"><img src="https://img.shields.io/badge/Instagram-Follow%20@Aryan_Technologies-E1306C"/></a>
</div>
<p align="center">
<br/>



## Welcome to My Portfolio!

I'm a passionate 1st-year student at Newton School of Technology, currently pursuing a Bachelor's in Data Science and Applied Machine Learning at IIT Madras (via the Perseverance program).

This portfolio showcases my skills in web development, particularly using HTML, CSS, and JavaScript. I'm excited to share my journey of learning and growth with you.

## About the Project

This repository hosts the code for my static website portfolio built using GitHub Pages. It's a simple yet elegant showcase of my projects and skills. I've focused on creating a clean and user-friendly experience.

## Technologies Used

- **HTML**
- **CSS**
- **JavaScript**

## Features

- **Responsive Design:** The website adapts seamlessly to different screen sizes.
- **Interactive Elements:** JavaScript is used to enhance user engagement.
- **Clear Navigation:** Intuitive navigation makes it easy to explore my work.

## How to Run Locally

1. Clone this repository: `git clone https://github.com/AryanVBW/porfolio.git`
2. Navigate to the project directory
3. Open `index.html` in your web browser.




<!DOCTYPE html>
<html>
<head>
</head>
<body>
  <h1>HTML Elements</h1>
  <ul>
    <li>&lt;html&gt; - HTML Document Root</li>
    <li>&lt;head&gt; - Document Metadata Container</li>
    <li>&lt;meta&gt; - Metadata Element</li>
    <li>&lt;title&gt; - Document Title</li>
    <li>&lt;link&gt; - External Resource Link</li>
    <li>&lt;body&gt; - Document Body</li>
    <li>&lt;audio&gt; - Audio Element</li>
    <li>&lt;source&gt; - Media Source</li>
    <li>&lt;div&gt; - Division or Section</li>
    <li>&lt;noscript&gt; - Fallback Content for No Script</li>
    <li>&lt;header&gt; - Header Section</li>
    <li>&lt;ul&gt; - Unordered List</li>
    <li>&lt;li&gt; - List Item</li>
    <li>&lt;a&gt; - Anchor (Hyperlink)</li>
    <li>&lt;button&gt; - Button</li>
    <li>&lt;span&gt; - Inline Container</li>
    <li>&lt;input&gt; - Input Field</li>
    <li>&lt;label&gt; - Label for Form Elements</li>
    <li>&lt;main&gt; - Main Content</li>
    <li>&lt;section&gt; - Section</li>
    <li>&lt;article&gt; - Article</li>
    <li>&lt;p&gt; - Paragraph</li>
    <li>&lt;h2&gt; - Heading Level 2</li>
    <li>&lt;h3&gt; - Heading Level 3</li>
    <li>&lt;img&gt; - Image</li>
    <li>&lt;svg&gt; - Scalable Vector Graphics</li>
    <li>&lt;path&gt; - SVG Path</li>
    <li>&lt;polyline&gt; - SVG Polyline</li>
    <li>&lt;footer&gt; - Footer Section</li>
    <li>&lt;script&gt; - Script</li>
  </ul>
</body>
</html>

## JavaScript: Key Parts and Concepts

**1. Variables and Constants:**

* **What:** Stores data for later use.
* **How:** Declared using `var`, `let`, or `const`.
    * `var` (mostly avoided in modern JS): Has wider scope and potential for conflicts.
    * `let`: Used for variables that might change within their scope.
    * `const`: Used for variables with values that shouldn't change.
* **Example:** `let audio = document.getElementById("audioPlayer");` (Stores a reference to the element with id "audioPlayer")

**2. Functions:**

* **What:** Reusable blocks of code that perform specific tasks.
* **How:** Defined with the `function` keyword, followed by a name, parameters (optional), and code block.
* **Example:**
```javascript
function settingtoggle() {
  // Code to handle setting toggle functionality
}
```

**3. Event Listeners:**

* **What:** Monitor an element for specific events (clicks, mouseovers, etc.). When the event occurs, the attached function is executed.
* **How:** Use `addEventListener` method on an element. Specify the event type and callback function.
* **Example:**
```javascript
window.addEventListener("load", function() {
  // Code to execute when the window finishes loading
});
```

**4. DOM Manipulation:**

* **What:** Accessing and modifying the Document Object Model (DOM), which represents the structure of the web page.
* **How:** Various methods are used, such as:
    * `getElementById`: Gets an element with a specific ID.
    * `querySelectorAll`: Gets all elements matching a CSS selector.
    * `classList.toggle`: Toggles a CSS class on an element.
* **Example:**
```javascript
document.getElementById("setting-container").classList.toggle("settingactivate");
```

**5. Conditional Statements:**

* **What:** Control the flow of code execution based on certain conditions.
* **How:** Use `if` statements to check a condition. If true, the code within the `if` block executes.
* **Example:**
```javascript
if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
  // Code to execute if user scrolled past a certain point
}
```

**6. Loops:**

* **What:** Repeat a block of code a specific number of times or until a condition is met.
* **How:** `forEach` is a common method used to iterate over lists of elements or arrays.
* **Example:**
```javascript
sections.forEach(t => {
  // Code to execute for each element in the "sections" list
});
```

**7. Template Literals:**

* **What:** Allow for string interpolation, embedding expressions within strings using backticks (`).
* **How:** Use backticks to define the string, including placeholders for variables or expressions within `${ }` brackets.
* **Example:**
```javascript
e.style.transform = `translate(${t}px, ${o}px)`;  // Sets an element's transform property
```

**8. Console Logging:**

* **What:** Outputs information to the browser's developer console for debugging and monitoring.
* **How:** Use `console.log` followed by the data you want to log.
* **Example:**
```javascript
console.log("%c Designed and Developed by vivek w ", "color: blue; font-weight: bold;");  // Logs a message with styles
```

These concepts are crucial building blocks for creating dynamic and interactive web pages with JavaScript.

## JavaScript Functions

### hamburgerMenu()

**Purpose:** This function toggles the visibility of the mobile navigation menu when the hamburger button is clicked.

**How it works:** It adds or removes a CSS class (e.g., visible) to the mobile menu element (id="mobiletogglemenu"), which controls whether the menu is shown or hidden.

### hidemenubyli()

**Purpose:** This function hides the mobile navigation menu when a menu item is clicked.

**How it works:** It removes the CSS class (e.g., visible) from the mobile menu element (id="mobiletogglemenu"), ensuring the menu is hidden.

### Example JavaScript Code


I'm always open to connecting with fellow learners and developers. Feel free to reach out to me via email or LinkedIn.

- 📧 Email: [my@gmail.com](mailto:vivek.aryanvbw@gmail.com)
- 📧 Business Email: [Business.Mail](mailto:admin@AryanVBW.live)
- 💼 LinkedIn: [@vivekwagadare](https://www.linkedin.com/in/vivek-wagadare-b677a9216)
- 🐦 Twitter: [@vivekwagadare](https://x.com/vivekwagadare?t=nuIH3LUbo8o2o1Rjxot-hA&s=09)
- 🌐 Web store: [TEch-Shop](https://view.aryanvbw.live)
- <img src="https://github.com/AryanVBW/AryanVBW/blob/main/Instagram.png" height="15"> Instagram: [@vivek](https://instagram.com/vivekbw?igshid=NGVhN2U2NjQ0Yg==)
- <img src="https://github.com/AryanVBW/AryanVBW/blob/main/Instagram.png" height="15"> Instagram: [@Aryan_Technologies](https://instagram.com/aryan_technolog1es?igshid=MzMyNGUyNmU2YQ==)

Let's connect and build amazing things together!
