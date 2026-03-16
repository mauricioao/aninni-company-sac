import os
import re

directory = os.path.join(os.getcwd(), 'src', 'content', 'services', 'spanish')
count = 0

for filename in os.listdir(directory):
    if filename.endswith(".md") or filename.endswith(".mdx"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'soluciones_images:' in content:
            continue
            
        match = re.search(r'image:\s*[\'"]([^\'"]+)[\'"]', content)
        if match:
            main_image = match.group(1)
            base_path, ext = os.path.splitext(main_image)
            image2 = f"{base_path}2{ext}"
            image3 = f"{base_path}3{ext}"
            
            replacement = f'image: "{main_image}"\nsoluciones_images:\n  - "{image2}"\n  - "{image3}"'
            new_content = re.sub(r'image:\s*[\'"]([^\'"]+)[\'"]', replacement, content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
                
            print(f"Updated {filename}")
            count += 1

print(f"Total updated: {count}")
