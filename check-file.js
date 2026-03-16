import fs from 'fs';

const content = fs.readFileSync('src/content/services/spanish/deposito-aduanero.md', 'utf-8');
const frontmatter = content.split('---')[1];
console.log('---FRONTMATTER---');
console.log(frontmatter);
console.log('-----------------');

if (frontmatter.includes('soluciones_images')) {
    console.log('FOUND soluciones_images string');
} else {
    console.log('NOT FOUND soluciones_images string');
}
