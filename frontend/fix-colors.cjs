const fs = require('fs');
const path = require('path');

const directory = 'c:/Users/Jaswanth Reddy/OneDrive/Desktop/Projects/Algoscope/frontend/src';

const replaceTheme = (dir) => {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceTheme(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Re-map blacks to dark purples
            content = content.replace(/bg-\[#0a0a0a\]/g, 'bg-[#2b0d38]');
            content = content.replace(/bg-\[#050505\]/g, 'bg-[#1b062b]');
            content = content.replace(/bg-\[#080808\]/g, 'bg-[#240b33]');
            content = content.replace(/bg-\[#0a0118\]/g, 'bg-[#2b0d38]');
            content = content.replace(/bg-\[#0f1115\]/g, 'bg-[#2b0d38]');
            content = content.replace(/bg-\[#111111\]/g, 'bg-[#240b33]');
            content = content.replace(/bg-\[#050505\]/g, 'bg-[#1b062b]');

            // Other hardcoded old colors that might appear in canvas components
            content = content.replace(/#a855f7/gi, '#EC4186'); // Purple -> Pink
            content = content.replace(/#3b82f6/gi, '#EE544A'); // Blue -> Orange
            content = content.replace(/#0070f3/gi, '#EC4186'); // Dark Blue -> Pink
            content = content.replace(/#10b981/gi, '#FFFFFF'); // Emerald -> White

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
            }
        }
    });
};

replaceTheme(directory);
console.log("Done mapping colors.");
