# Development Environment Setup 🛠️

This guide will help you set up your development environment for web development.

## 📋 Prerequisites

Before you start, make sure you have:
- A computer with Windows, macOS, or Linux
- At least 4GB of RAM
- 10GB of free disk space
- Internet connection

## 🌐 Web Browser

### Recommended Browsers
1. **Google Chrome** - Excellent developer tools
2. **Mozilla Firefox** - Great developer edition
3. **Microsoft Edge** - Good performance and tools
4. **Safari** (macOS only) - For testing on Apple devices

### Browser Extensions
Install these helpful extensions:
- **Web Developer** - Useful web development tools
- **ColorZilla** - Color picker and gradient generator
- **Wappalyzer** - Identify technologies used on websites
- **Lorem Ipsum Generator** - Generate placeholder text

## 📝 Code Editor

### Visual Studio Code (Recommended)
**Download:** https://code.visualstudio.com/

**Essential Extensions:**
```
- HTML CSS Support
- Auto Rename Tag
- Prettier - Code formatter
- Live Server
- Bracket Pair Colorizer
- GitLens
- JavaScript (ES6) code snippets
- CSS Peek
- Auto Close Tag
- Indent Rainbow
```

### Alternative Editors
- **Sublime Text** - Fast and lightweight
- **Atom** - Hackable text editor
- **WebStorm** - Full-featured IDE (paid)
- **Brackets** - Adobe's web development editor

## 🔧 Essential Tools

### Git Version Control
**Download:** https://git-scm.com/

**Setup Commands:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Node.js (for advanced features)
**Download:** https://nodejs.org/

Choose the LTS (Long Term Support) version.

**Verify Installation:**
```bash
node --version
npm --version
```

### Package Manager
**npm** comes with Node.js, or install **Yarn:**
```bash
npm install -g yarn
```

## 🌟 VS Code Setup

### Settings Configuration
1. Open VS Code
2. Press `Ctrl+,` (Windows/Linux) or `Cmd+,` (macOS)
3. Add these settings:

```json
{
    "editor.fontSize": 14,
    "editor.tabSize": 2,
    "editor.insertSpaces": true,
    "editor.wordWrap": "on",
    "editor.minimap.enabled": true,
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    },
    "files.autoSave": "afterDelay",
    "liveServer.settings.donotShowInfoMsg": true
}
```

### Useful Keyboard Shortcuts
| Action | Windows/Linux | macOS |
|--------|--------------|-------|
| Open Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Quick Open File | `Ctrl+P` | `Cmd+P` |
| Split Editor | `Ctrl+\` | `Cmd+\` |
| Toggle Terminal | `Ctrl+`` | `Cmd+`` |
| Find in Files | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| Multi-cursor | `Alt+Click` | `Option+Click` |

## 📁 Project Structure

### Recommended Folder Structure
```
my-web-project/
├── index.html
├── css/
│   ├── style.css
│   └── normalize.css
├── js/
│   └── script.js
├── images/
│   └── (your images)
├── fonts/
│   └── (custom fonts)
└── README.md
```

### File Naming Conventions
- Use lowercase letters
- Use hyphens for spaces: `main-style.css`
- Be descriptive: `user-profile.js` not `up.js`
- Avoid special characters and spaces

## 🔄 Workflow Setup

### 1. Create a New Project
```bash
mkdir my-project
cd my-project
code . # Opens VS Code
```

### 2. Basic HTML Starter
Create `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>Hello, World!</h1>
    <script src="js/script.js"></script>
</body>
</html>
```

### 3. Live Server Setup
1. Install Live Server extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Your page opens in browser and auto-refreshes on changes

## 🌐 Online Tools

### Code Playgrounds
- **CodePen** - https://codepen.io/
- **JSFiddle** - https://jsfiddle.net/
- **Repl.it** - https://replit.com/
- **CodeSandbox** - https://codesandbox.io/

### Design Tools
- **Figma** - UI/UX design (free)
- **Adobe XD** - Design and prototyping
- **Canva** - Quick graphics and logos
- **Unsplash** - Free high-quality photos

### Development Resources
- **MDN Web Docs** - https://developer.mozilla.org/
- **Can I Use** - https://caniuse.com/
- **Google Fonts** - https://fonts.google.com/
- **Font Awesome** - https://fontawesome.com/

## 📱 Testing Setup

### Browser Testing
Test your websites on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Different screen sizes

### Developer Tools
Learn to use browser developer tools:
- **F12** or **Ctrl+Shift+I** (Windows/Linux)
- **Cmd+Option+I** (macOS)

Key panels:
- **Elements** - Inspect HTML/CSS
- **Console** - JavaScript debugging
- **Network** - Monitor file loading
- **Application** - Local storage, cookies

## 🎯 Learning Path

### Week 1-2: Environment Setup
- [ ] Install VS Code and extensions
- [ ] Set up Git
- [ ] Create first HTML file
- [ ] Learn basic VS Code shortcuts

### Week 3-4: HTML Fundamentals
- [ ] Complete HTML basics course
- [ ] Practice with simple projects
- [ ] Learn semantic HTML

### Week 5-6: CSS Styling
- [ ] Learn CSS basics
- [ ] Practice layouts
- [ ] Responsive design basics

### Week 7-8: JavaScript Basics
- [ ] Variables and functions
- [ ] DOM manipulation
- [ ] Simple interactive projects

## 🆘 Troubleshooting

### Common Issues

**Live Server not working:**
- Check if file is saved
- Restart VS Code
- Disable other extensions temporarily

**Git not recognized:**
- Restart terminal/VS Code after installation
- Check PATH environment variable
- Reinstall Git

**Extensions not working:**
- Update VS Code
- Disable and re-enable extension
- Check extension compatibility

### Getting Help
- **Stack Overflow** - Programming Q&A
- **GitHub Discussions** - Community help
- **Discord/Slack communities** - Real-time chat
- **Reddit r/webdev** - Community discussions

## 🚀 Next Steps

Once you have everything set up:

1. **Start with HTML Basics** - Begin with our HTML course
2. **Practice Daily** - Spend at least 30 minutes coding
3. **Build Projects** - Apply what you learn
4. **Join Communities** - Connect with other developers
5. **Stay Updated** - Follow web development blogs and newsletters

## 📚 Recommended Resources

### Free Learning Platforms
- **freeCodeCamp** - https://freecodecamp.org/
- **Codecademy** - https://codecademy.com/
- **Khan Academy** - https://khanacademy.org/
- **Mozilla Developer Network** - https://developer.mozilla.org/

### YouTube Channels
- Traversy Media
- The Net Ninja
- Academind
- Web Dev Simplified

### Documentation
- **HTML** - https://developer.mozilla.org/en-US/docs/Web/HTML
- **CSS** - https://developer.mozilla.org/en-US/docs/Web/CSS
- **JavaScript** - https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

**Ready to start coding?** 🎉

Head over to our [HTML Basics](../html/01-basics/) course to begin your web development journey!
