// Global authentication check
document.addEventListener("DOMContentLoaded", () => {
    // Check if we're on the login page
    const isLoginPage = window.location.pathname.includes('login.html');
    
    if (!isLoginPage) {
        let user = localStorage.getItem("user");
        if (!user) {
            // Redirect to login page if not authenticated
            window.location.href = "login.html";
        } else {
            // Show the logout button and hide the login button
            document.getElementById("loginNav").classList.add("hidden");
            document.getElementById("logoutNav").classList.remove("hidden");
            
            // Load gallery content if on index page
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
                loadGallery();
            }
        }
    }
    
    // Initialize mobile menu toggle for all pages
    initMobileMenu();
});

// Initialize mobile menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            document.getElementById('navMenu').classList.toggle('show');
        });
    }
}

// Load artwork gallery
function loadGallery() {
    const artGallery = document.getElementById("artGallery");
    if (!artGallery) return;
    
    // Sample artworks data - in a real app, this would come from a server
    const artworks = [
        { 
            title: "Mountain Sunset", 
            img: "art1.jpg",
            description: "A beautiful sunset view over mountain ranges",
            artist: {
                name: "Emma Johnson",
                avatar: "default-profile.jpg"
            }
        },
        { 
            title: "Abstract Emotion", 
            img: "art2.jpg",
            description: "An abstract representation of human emotions",
            artist: {
                name: "Michael Chen",
                avatar: "default-profile.jpg"
            }
        },
        { 
            title: "Urban Portrait", 
            img: "art3.jpg",
            description: "A portrait capturing the essence of urban life",
            artist: {
                name: "Sarah Williams",
                avatar: "default-profile.jpg"
            }
        },
        { 
            title: "Nature's Patterns", 
            img: "art1.jpg", // Reusing image for demo
            description: "Exploring patterns found in nature",
            artist: {
                name: "David Miller",
                avatar: "default-profile.jpg"
            }
        },
        { 
            title: "Digital Dreams", 
            img: "art2.jpg", // Reusing image for demo
            description: "A digital artwork exploring dreamscapes",
            artist: {
                name: "Lisa Chen",
                avatar: "default-profile.jpg"
            }
        },
        { 
            title: "Modern Architecture", 
            img: "art3.jpg", // Reusing image for demo
            description: "Photographic study of contemporary buildings",
            artist: {
                name: "James Wilson",
                avatar: "default-profile.jpg"
            }
        }
    ];

    // Clear existing content
    artGallery.innerHTML = '';

    // Create and append artwork elements
    artworks.forEach(art => {
        let artDiv = document.createElement("div");
        artDiv.classList.add("art-item", "fade-in");
        artDiv.innerHTML = `
            <img src="${art.img}" alt="${art.title}">
            <div class="art-content">
                <h3>${art.title}</h3>
                <p>${art.description}</p>
                <div class="artist">
                    <img src="${art.artist.avatar}" alt="${art.artist.name}">
                    <span>${art.artist.name}</span>
                </div>
            </div>
        `;
        artGallery.appendChild(artDiv);
    });
}

// Logout function
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// Upload form handling (if on upload page)
const uploadForm = document.getElementById("uploadForm");
if (uploadForm) {
    uploadForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // In a real app, you would handle file uploads here
        alert("Artwork uploaded successfully!");
        setTimeout(() => {
            window.location.href = "profile.html";
        }, 500);
    });
}

// Add css-based animation triggers
function addAnimations() {
    // Add fade-in effect to elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        
        observer.observe(element);
    });
}

// Extra utility functions for a better user experience

// Function to show notification messages
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize animations when page is loaded
document.addEventListener('DOMContentLoaded', addAnimations);



        document.querySelector('.mobile-menu-btn').addEventListener('click', function () {
            document.getElementById('navMenu').classList.toggle('show');
        });

        document.addEventListener("DOMContentLoaded", function () {
            const user = localStorage.getItem("user");
            const loginNav = document.getElementById("loginNav");
            const logoutNav = document.getElementById("logoutNav");
            const uploadNav = document.getElementById("uploadNav");
            const profileNav = document.getElementById("profileNav");

            if (!user) {
                loginNav.classList.remove("hidden");
                logoutNav.classList.add("hidden");
                uploadNav.classList.add("hidden");
                profileNav.classList.add("hidden");
            } else {
                loginNav.classList.add("hidden");
                logoutNav.classList.remove("hidden");
                uploadNav.classList.remove("hidden");
                profileNav.classList.remove("hidden");
            }
        });

        function logout() {
            localStorage.removeItem("user");
            window.location.href = "login.html";
        }

        const searchInput = document.getElementById("searchInput");
        const searchButton = document.getElementById("searchButton");
        const artGallery = document.getElementById("artGallery");
        const noResultsMessage = document.getElementById("noResultsMessage");

        searchButton.addEventListener("click", performSearch);
        searchInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                performSearch();
            }
        });

        function performSearch() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            const artItems = artGallery.querySelectorAll('.art-item');
            let foundItems = 0;

            artItems.forEach(item => {
                const title = item.dataset.title ? item.dataset.title.toLowerCase() : '';
                const artist = item.dataset.artist ? item.dataset.artist.toLowerCase() : '';
                const tags = item.dataset.tags ? item.dataset.tags.toLowerCase() : '';
                const searchableText = `${title} ${artist} ${tags}`;

                if (searchTerm === '' || searchableText.includes(searchTerm)) {
                    item.classList.remove('hidden');
                    item.style.display = '';
                    foundItems++;
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });

            if (foundItems === 0 && searchTerm !== '') {
                noResultsMessage.classList.remove('hidden');
                noResultsMessage.textContent = `No artworks found matching "${searchInput.value}".`;
            } else {
                noResultsMessage.classList.add('hidden');
            }
        }
   
