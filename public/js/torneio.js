document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and content
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current tab and content
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Add purple glow to hovering over overview details
    const prizePool = document.querySelector('.prize-pool');
    const format = document.querySelector('.format');

    if (prizePool) {
        prizePool.addEventListener('mouseenter', () => {
            prizePool.style.boxShadow = '0 10px 25px rgba(157, 78, 221, 0.4)';
        });
        prizePool.addEventListener('mouseleave', () => {
            prizePool.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    }

    if (format) {
        format.addEventListener('mouseenter', () => {
            format.style.boxShadow = '0 10px 25px rgba(157, 78, 221, 0.4)';
        });
        format.addEventListener('mouseleave', () => {
            format.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    }

    // Add animation to team cards
    const teamCards = document.querySelectorAll('.team-card');
    const teamLogos = document.querySelectorAll('.team-logo, .team-logo-small');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    teamCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
        
        // Add pulse animation to team logos
        const logo = card.querySelector('.team-logo');
        if (logo) {
            card.addEventListener('mouseenter', () => {
                logo.style.boxShadow = '0 0 20px rgba(157, 78, 221, 0.7)';
                logo.style.transform = 'scale(1.05)';
            });
            
            card.addEventListener('mouseleave', () => {
                logo.style.boxShadow = '';
                logo.style.transform = '';
            });
        }
    });

    // Add glow effect to match team logos
    const matchCards = document.querySelectorAll('.match-card');
    matchCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const teamLogos = card.querySelectorAll('.team-logo-small');
            teamLogos.forEach(logo => {
                logo.style.boxShadow = '0 0 10px rgba(157, 78, 221, 0.6)';
                logo.style.borderColor = '#9d4edd';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const teamLogos = card.querySelectorAll('.team-logo-small');
            teamLogos.forEach(logo => {
                logo.style.boxShadow = '';
                logo.style.borderColor = 'rgba(157, 78, 221, 0.5)';
            });
        });
    });
});