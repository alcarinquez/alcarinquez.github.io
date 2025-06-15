// Saudi-China Opensource Exchange 2025 - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown timer
    initCountdown();
    
    // Initialize interactive agenda
    initInteractiveAgenda();
    
    // Initialize speaker filtering
    initSpeakerFilter();
    
    // Initialize form submission
    initFormSubmission();
    
    // Initialize social media sharing
    initSocialSharing();
});

// Countdown Timer
function initCountdown() {
    const eventDate = new Date('November 11, 2025 09:00:00').getTime();
    
    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('countdown-days').innerHTML = days;
        document.getElementById('countdown-hours').innerHTML = hours;
        document.getElementById('countdown-minutes').innerHTML = minutes;
        document.getElementById('countdown-seconds').innerHTML = seconds;
        
        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('countdown-container').innerHTML = '<div class="alert alert-success">The event has started!</div>';
        }
    }, 1000);
}

// Interactive Agenda
function initInteractiveAgenda() {
    const scheduleItems = document.querySelectorAll('.schedule-item');
    
    scheduleItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
}

// Speaker Filtering
function initSpeakerFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const speakerCards = document.querySelectorAll('.speaker-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter speakers
            if (filterValue === 'all') {
                speakerCards.forEach(card => card.style.display = 'block');
            } else {
                speakerCards.forEach(card => {
                    if (card.classList.contains(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Speaker search functionality
    const searchInput = document.getElementById('speaker-search');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchValue = this.value.toLowerCase();
            
            speakerCards.forEach(card => {
                const speakerName = card.querySelector('h4').textContent.toLowerCase();
                const speakerTitle = card.querySelector('.speaker-title').textContent.toLowerCase();
                
                if (speakerName.includes(searchValue) || speakerTitle.includes(searchValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Form Submission
function initFormSubmission() {
    const notifyForm = document.getElementById('notify-form');
    
    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            
            // In a real implementation, this would send the data to a server
            // For this demo, we'll just show a success message
            
            document.getElementById('form-response').innerHTML = `
                <div class="alert alert-success">
                    Thank you! We'll notify you about updates for the Saudi-China Opensource Exchange 2025.
                </div>
            `;
            
            notifyForm.reset();
        });
    }
}

// Social Media Sharing
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.social-share a');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const type = this.getAttribute('data-type');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            const description = encodeURIComponent('Join us at the Saudi-China Opensource Exchange 2025 on November 11, 2025 in Riyadh, Saudi Arabia.');
            
            let shareUrl = '';
            
            switch(type) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${description}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${description}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${description} ${url}`;
                    break;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetHref = this.getAttribute('href');
        // Only prevent default if it’s an internal link
        if (targetHref.startsWith('#')) {
          e.preventDefault();
        }
 
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});
