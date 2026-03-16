import matter from 'gray-matter';
import fs from 'fs';

try {
  const content = fs.readFileSync('src/content/services/spanish/deposito-aduanero.md', 'utf-8');
  const data = matter(content);
  fs.writeFileSync('output.txt', JSON.stringify(data.data, null, 2));
} catch (e) {
  fs.writeFileSync('output.txt', e.toString());
}
