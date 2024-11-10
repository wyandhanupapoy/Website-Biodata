document.addEventListener("DOMContentLoaded", function () {
    const image = document.getElementById("cvImage");
    const zoomInButton = document.getElementById("zoomInBtn");
    const zoomOutButton = document.getElementById("zoomOutBtn");
    const cvOverlay = document.querySelector(".cv-overlay");
    const closeButton = document.querySelector(".close-btn");
    const viewCvButtons = document.querySelectorAll(".view-cv-btn");

    let scale = 1; // Skala awal
    const minScale = 1;  // Batas minimal zoom
    const maxScale = 4;  // Batas maksimal zoom
    let isDragging = false;
    let startX, startY, currentX = 0, currentY = 0;
    let initialX = 0, initialY = 0;

    // Fungsi untuk menampilkan overlay
    function showOverlay(imageSrc) {
        const imageElement = document.getElementById("cvImage");
        imageElement.src = imageSrc;  // Mengubah sumber gambar sesuai dengan profile
        cvOverlay.style.display = "flex";
        setTimeout(() => {
            cvOverlay.style.opacity = 1;
        }, 10);
    }

    // Fungsi untuk menyembunyikan overlay
    function hideOverlay() {
        cvOverlay.style.opacity = 0;
        setTimeout(() => {
            cvOverlay.style.display = "none";
        }, 300);
        // Reset posisi dan skala gambar
        currentX = 0;
        currentY = 0;
        scale = 1;
        image.style.transform = `scale(${scale})`;
    }

    // Fungsi untuk Zoom In
    zoomInButton.addEventListener("click", () => {
        if (scale < maxScale) {  // Pastikan scale tidak lebih besar dari maxScale
            scale += 0.1;
            image.style.transform = `scale(${scale}) translate(${currentX}px, ${currentY}px)`; // Mengaplikasikan zoom
        }
    });

    // Fungsi untuk Zoom Out
    zoomOutButton.addEventListener("click", () => {
        if (scale > minScale) {  // Pastikan scale tidak lebih kecil dari minScale
            scale -= 0.1;
            image.style.transform = `scale(${scale}) translate(${currentX}px, ${currentY}px)`; // Mengaplikasikan zoom
        }
    });

    // Fungsi untuk menangani drag
    image.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
        initialX = currentX;
        initialY = currentY;
        image.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            currentX = e.clientX - startX;
            currentY = e.clientY - startY;

            // Batasi area drag
            const maxX = (image.offsetWidth * scale) - cvOverlay.offsetWidth;
            const maxY = (image.offsetHeight * scale) - cvOverlay.offsetHeight;

            currentX = Math.min(Math.max(currentX, -maxX), 0);
            currentY = Math.min(Math.max(currentY, -maxY), 0);

            image.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`; // Menambahkan posisi gambar bersama zoom
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        image.style.cursor = "grab";
    });

    // Menutup overlay
    closeButton.addEventListener("click", hideOverlay);

    // Membuka overlay saat tombol "Selengkapnya" ditekan
    viewCvButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const profileId = e.target.getAttribute("data-profile");
            const imageSrc = `profile${profileId}-cv.jpg`; // Ganti dengan jalur gambar yang sesuai
            showOverlay(imageSrc);
        });
    });

});
