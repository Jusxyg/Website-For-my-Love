document.addEventListener('DOMContentLoaded', () => {
    const images = [
        "",
        "images/img (1).JPEG",
        "images/img (2).JPEG",
        "images/img (3).JPEG",
        "images/img (4).JPEG",
        "images/img (5).JPEG"
    ];
    let currentImageIndex = 0;
    const imgElement = document.getElementById("changeimg");

    setInterval(() => {
        if (currentImageIndex == 4) {
            currentImageIndex = 0;
        } else {
            currentImageIndex = (currentImageIndex + 1);
            imgElement.src = images[currentImageIndex];
        }
        
    }, 5000);

});

