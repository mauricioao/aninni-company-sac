const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'content', 'services', 'spanish');
const files = fs.readdirSync(dir);
let count = 0;

files.forEach(file => {
  if (file.endsWith('.md') || file.endsWith('.mdx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if it already has soluciones_images
    if (content.includes('soluciones_images:')) {
      console.log(`Skipping ${file} - already has soluciones_images`);
      return;
    }

    // Find the image field
    const imageMatch = content.match(/image:\s*['"]([^'"]+)['"]/);
    if (imageMatch) {
      const mainImage = imageMatch[1];
      const lastDot = mainImage.lastIndexOf('.');
      if (lastDot !== -1) {
        const basePath = mainImage.substring(0, lastDot);
        const ext = mainImage.substring(lastDot);
        const image2 = `${basePath}2${ext}`;
        const image3 = `${basePath}3${ext}`;
        
        // Add soluciones_images right after the image field
        const replacement = `image: "${mainImage}"\nsoluciones_images:\n  - "${image2}"\n  - "${image3}"`;
        content = content.replace(/image:\s*['"]([^'"]+)['"]/, replacement);
        
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${file}`);
        count++;
      }
    } else {
        console.log(`No image field found in ${file}`);
    }
  }
});
console.log(`Updated ${count} files.`);
