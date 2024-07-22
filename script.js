document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://api.artic.edu/api/v1/artworks';
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const galleryElement = document.querySelector('.gallery');

    // Fetch artwork data from the API
    fetch(apiUrl + `?limit=20&fields=id,title,image_id`, {
        headers: {
            'Api-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        data.data.forEach(artwork => {
            // Create artwork element
            const artworkElement = document.createElement('div');
            artworkElement.classList.add('artwork');
            artworkElement.innerHTML = `<img src="images/${artwork.image_id}.jpg" alt="${artwork.title}" data-artwork-id="${artwork.id}">`;
            galleryElement.appendChild(artworkElement);

            // Add click event listener to display artwork details
            artworkElement.addEventListener('click', function() {
                displayArtworkDetails(artwork.id);
            });
        });
    })
    .catch(error => console.error('Error fetching artworks:', error));

    // Modal functionality
    const modal = document.getElementById('artworkModal');
    const closeBtn = document.querySelector('.close');

    // Close modal when close button or outside modal is clicked
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    function displayArtworkDetails(artworkId) {
        fetch(apiUrl + `/${artworkId}`, {
            headers: {
                'Api-Key': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            const artwork = data.data;
            const modalContent = document.getElementById('artworkDetails');
            modalContent.innerHTML = `
                <h2>${artwork.title}</h2>
                <img src="images/${artwork.image_id}.jpg" alt="${artwork.title}">
                <p>${artwork.description ? artwork.description : 'No description available.'}</p>
            `;
            modal.style.display = 'block';
        })
        .catch(error => console.error('Error fetching artwork details:', error));
    }

    function closeModal() {
        modal.style.display = 'none';
    }
});
