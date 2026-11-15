import os, re, sys, json

def find_html_files(root):
    html_files = []
    for dirpath, _, filenames in os.walk(root):
        for f in filenames:
            if f.lower().endswith('.html'):
                html_files.append(os.path.join(dirpath, f))
    return html_files

def extract_nav_links(content):
    # simple regex to find <nav ...>...</nav> block
    nav_match = re.search(r'<nav[^>]*>(.*?)</nav>', content, re.DOTALL|re.IGNORECASE)
    if not nav_match:
        return []
    nav_html = nav_match.group(1)
    # find all <a ... href="..."> tags
    links = re.findall(r'<a[^>]+href=["\']([^\"\']+)[\"\']', nav_html, re.IGNORECASE)
    return links

def has_id(content, id_val):
    pattern = r'id=[\"\']%s[\"\']' % re.escape(id_val)
    return re.search(pattern, content) is not None

def main(root):
    html_files = find_html_files(root)
    broken = []
    for path in html_files:
        with open(path, encoding='utf-8') as f:
            content = f.read()
        links = extract_nav_links(content)
        for href in links:
            if href.startswith('#'):
                target_id = href[1:]
                if not has_id(content, target_id):
                    broken.append({'file': path, 'type':'anchor', 'href':href})
            else:
                # treat as relative path, possibly with fragment
                target_path = href.split('#')[0]
                if not target_path:
                    continue
                abs_path = os.path.normpath(os.path.join(os.path.dirname(path), target_path))
                if not os.path.isfile(abs_path):
                    broken.append({'file': path, 'type':'file', 'href':href})
    print(json.dumps(broken, indent=2))

if __name__ == '__main__':
    root = sys.argv[1] if len(sys.argv)>1 else '.'
    main(root)
