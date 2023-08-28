"use strict"

 // Open modal
export function openImageModal(imageSrc) {
    modalImage.src = imageSrc;
    imgModal.style.display = "flex";
};

// Close modal
export function closeImageModal() {
    imgModal.style.display = "none";
};