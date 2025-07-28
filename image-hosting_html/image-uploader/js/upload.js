document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' || event.key === 'F5') {
            event.preventDefault();

            sessionStorage.removeItem('pageWasVisited');
            window.location.href = '../index.html';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const fileUpload = document.getElementById('file-upload');
    const imagesButton = document.getElementById('images-tab-btn');
    const dropzone = document.querySelector('.upload__dropzone');
    const currentUploadInput = document.querySelector('.upload__input');
    const copyButton = document.querySelector('.upload__copy');

    const updateTabStyles = () => {
        const uploadTab = document.getElementById('upload-tab-btn');
        const imagesTab = document.getElementById('images-tab-btn');

        if (!uploadTab || !imagesTab) {
            return;
        }

        const storedFiles = JSON.parse(localStorage.getItem('uploadedImages')) || [];
        const activeColor = 'rgb(0, 96, 255)';
        const inactiveColor = 'rgb(173, 192, 248)';

        if (storedFiles.length > 0) {
            imagesTab.style.color = activeColor;
            uploadTab.style.color = inactiveColor;
        } else {
            uploadTab.style.color = activeColor;
            imagesTab.style.color = inactiveColor;
        }
    };

    const handleAndStoreFiles = (files) => {
        if (!files || files.length === 0) {
            return;
        }
        const storedFiles = JSON.parse(localStorage.getItem('uploadedImages')) || [];
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const MAX_SIZE_MB = 5;
        const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
        let filesAdded = false;
        let lastFileName = '';

        for (const file of files) {
            if (!allowedTypes.includes(file.type) || file.size > MAX_SIZE_BYTES) {
                continue;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const fileData = { name: file.name, url: event.target.result };
                storedFiles.push(fileData);
                localStorage.setItem('uploadedImages', JSON.stringify(storedFiles));
                updateTabStyles();
            };
            reader.readAsDataURL(file);
            filesAdded = true;
            lastFileName = file.name;
        }

        if (filesAdded) {
            if (currentUploadInput) {
                currentUploadInput.value = `https://sharefile.xyz/${lastFileName}`;
            }
            alert("Files selected successfully! Go to the 'Images' tab to view them.");
        }
    };

    if (copyButton && currentUploadInput) {
        copyButton.addEventListener('click', () => {
            const textToCopy = currentUploadInput.value;

            if (textToCopy && textToCopy !== 'https://') {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    copyButton.textContent = 'COPIED!';
                    setTimeout(() => {
                        copyButton.textContent = 'COPY';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            }
        });
    }

    if (imagesButton) {
        imagesButton.addEventListener('click', () => {
            window.location.href = 'images.html';
        });
    }

    fileUpload.addEventListener('change', (event) => {
        handleAndStoreFiles(event.target.files);
        event.target.value = '';
    });

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    dropzone.addEventListener('drop', (event) => {
        handleAndStoreFiles(event.dataTransfer.files);
    });

    updateTabStyles();
}); 