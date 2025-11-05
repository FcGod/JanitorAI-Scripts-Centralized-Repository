#!/usr/bin/env python3
"""
Split a large markdown file into chapters for mdbook.
- Handles image links: converts ![[image.png]] to ![](../images/image.png)
- Copies images from source directory to output/images/
- Generates properly indented SUMMARY.md
"""

import re
import os
import shutil
from pathlib import Path

def sanitize_filename(title):
    """Convert chapter title to safe filename."""
    # Remove all non-ASCII characters (including emojis)
    clean = title.encode('ascii', 'ignore').decode('ascii')
    # Remove special chars, keep only alphanumeric, spaces, hyphens
    clean = re.sub(r'[^\w\s-]', '', clean)
    clean = clean.strip().lower()
    clean = re.sub(r'[-\s]+', '_', clean)
    return clean[:60]  # Limit length

def extract_title(text):
    """Extract clean title from first line."""
    lines = text.strip().split('\n')
    if not lines:
        return None

    # Get first line and clean it
    title = lines[0]
    # Remove markdown header symbols
    title = re.sub(r'^#+\s*', '', title)
    return title.strip()

def is_main_chapter(title):
    """Check if this is a main chapter (not a subsection)."""
    # Main chapters start with book emoji or are appendices/glossary
    return (title.startswith('📘') or
            'Appendix' in title or
            'Glossary' in title or
            title.startswith('# 📘'))

def process_images(content, source_dir, output_dir, images_copied):
    """
    Process image links in content.
    Converts ![[image.png]] to ![](../images/image.png)
    Copies images from source_dir to output_dir/images/
    """
    # Find all wiki-style image links: ![[filename]]
    wiki_images = re.findall(r'!\[\[([^\]]+)\]\]', content)

    # Also find standard markdown images with local paths
    md_images = re.findall(r'!\[([^\]]*)\]\(([^)]+)\)', content)

    images_dir = Path(output_dir) / 'images'
    images_dir.mkdir(exist_ok=True)

    # Process wiki-style links
    for img_name in wiki_images:
        # Convert ![[image.png]] to ![](../images/image.png)
        old_link = f'![[{img_name}]]'
        new_link = f'![{img_name}](../images/{img_name})'
        content = content.replace(old_link, new_link)

        # Copy image if not already copied
        if img_name not in images_copied:
            source_img = Path(source_dir) / img_name
            if source_img.exists():
                shutil.copy2(source_img, images_dir / img_name)
                images_copied.add(img_name)
                print(f'  📷 Copied image: {img_name}')

    # Process standard markdown images with relative paths
    for alt_text, img_path in md_images:
        # If it's already a relative path without ../images/, fix it
        if not img_path.startswith('http') and not img_path.startswith('../images/'):
            img_name = os.path.basename(img_path)
            old_link = f'![{alt_text}]({img_path})'
            new_link = f'![{alt_text}](../images/{img_name})'
            content = content.replace(old_link, new_link)

            # Copy image if not already copied
            if img_name not in images_copied:
                source_img = Path(source_dir) / img_name
                if source_img.exists():
                    shutil.copy2(source_img, images_dir / img_name)
                    images_copied.add(img_name)
                    print(f'  📷 Copied image: {img_name}')

    return content

def split_markdown(input_file, output_dir):
    """Split markdown file by headers."""

    # Get source directory (where images should be)
    source_dir = Path(input_file).parent

    # Read the file
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by # headers (H1 or H2 at start of line)
    sections = re.split(r'\n(?=#{1,2}\s)', content)

    # Create output directory
    output_path = Path(output_dir)
    output_path.mkdir(exist_ok=True)

    # Track for SUMMARY.md
    summary_entries = []

    # Track copied images to avoid duplicates
    images_copied = set()

    counter = 0
    for section in sections:
        if not section.strip():
            continue

        # Extract title
        title = extract_title(section)
        if not title:
            continue

        # Check if main chapter
        is_main = is_main_chapter(title)

        # Process images in this section
        section = process_images(section, source_dir, output_dir, images_copied)

        # Generate filename: XXXX_sanitized_title.md
        clean_title = sanitize_filename(title)
        if not clean_title:
            clean_title = f'section_{counter}'

        filename = f'{counter:04d}_{clean_title}.md'

        # Write file
        output_file = output_path / filename
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(section.strip() + '\n')

        # Add to summary (keep original title with emojis)
        summary_entries.append((filename, title, is_main))

        print(f'{counter:04d}: {title[:70]}')
        counter += 1

    # Create SUMMARY.md with proper indentation
    summary_path = output_path / 'SUMMARY.md'
    with open(summary_path, 'w', encoding='utf-8') as f:
        f.write('# Summary\n\n')

        for filename, title, is_main in summary_entries:
            if is_main:
                # Main chapter - no indent
                f.write(f'- [{title}]({filename})\n')
            else:
                # Subsection - indent with 2 spaces
                f.write(f'  - [{title}]({filename})\n')

    print(f'\nCreated {counter} files')
    print(f'Copied {len(images_copied)} images to images/')
    print(f'Created SUMMARY.md with proper indentation')
    print(f'All files in: {output_path}')

if __name__ == '__main__':
    import sys

    if len(sys.argv) < 2:
        print('Usage: python split_chapters.py <input_file.md> [output_dir]')
        print('Example: python split_chapters.py guide.md src/')
        print('\nImages will be copied from the same directory as input_file.md')
        sys.exit(1)

    input_file = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else 'src'

    split_markdown(input_file, output_dir)
    print('\nDone! Images are in src/images/')
    print('Run: mdbook build')
