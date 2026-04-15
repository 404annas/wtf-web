from PIL import Image
import os

# Use the correct path relative to the script location
images_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public', 'images')

# List of the 4 artist images
image_files = [
    'artist2-2.png',
    'artist3-3.png',
    'artist4-4.png',
    'artist10-1.png',
]

def make_square(img):
    """Crop the image to a center square."""
    width, height = img.size
    size = min(width, height)
    left = (width - size) // 2
    top = (height - size) // 2
    right = left + size
    bottom = top + size
    return img.crop((left, top, right, bottom))

images = []
for file in image_files:
    img = Image.open(os.path.join(images_dir, file))
    images.append(make_square(img))

# Standardize all images to the first square image's dimensions
target_size = images[0].size
resized_images = [img.resize(target_size, Image.Resampling.LANCZOS) for img in images]

# Save as a high-quality animated WebP in the project root
output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'artists4.webp')
resized_images[0].save(
    output_path,
    save_all=True,
    append_images=resized_images[1:],
    duration=300,  # ms per frame
    loop=0,        # Loop forever
    quality=90     # High quality (0-100)
)

print(f"GIF saved to: {output_path}")