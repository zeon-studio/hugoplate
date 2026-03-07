import os

# CONFIGURATION
# Path to your images relative to this script
# IMAGE_DIR = 'static/images/gallery' 
IMAGE_DIR = 'assets/images/SkySports'
# Path Hugo uses in the "src" attribute
HUGO_PATH = '/images/SkySports' 
EXTENSIONS = ('.jpg', '.jpeg', '.png', '.webp', '.gif')

def generate_gallery_yaml():
    if not os.path.exists(IMAGE_DIR):
        print(f"Error: Directory '{IMAGE_DIR}' not found.")
        return

    print("gallery_items:")
    
    # Sort files to keep it organized before shuffling in Hugo
    files = sorted(os.listdir(IMAGE_DIR))
    
    for filename in files:
        if filename.lower().endswith(EXTENSIONS):
            # Clean up filename to create a default caption (e.g., "my_photo.jpg" -> "My Photo")
            clean_name = os.path.splitext(filename)[0].replace('-', ' ').replace('_', ' ').capitalize()
            
            print(f"  - image: \"{HUGO_PATH}/{filename}\"")
            print(f"    caption: \"{clean_name}\"")

if __name__ == "__main__":
    generate_gallery_yaml()
    