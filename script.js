// Get references to the canvas and file input
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Function to handle image upload
document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                // Draw the image on the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous images
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                validateTransparency();
            };
        };
        reader.readAsDataURL(file);
    }
});

// Function to validate transparency
function validateTransparency() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let hasTransparency = false;

    // Loop through the pixel data
    for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3]; // Get the alpha value
        if (alpha < 255) { // Check if the pixel is transparent
            hasTransparency = true;
            break;
        }
    }

    // Display result
    if (hasTransparency) {
        alert("The image has a transparent background.");
    } else {
        alert("The image does not have a transparent background.");
    }
}