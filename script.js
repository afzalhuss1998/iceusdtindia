// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Registration Form Modal Functions
function openRegistrationForm() {
    const modal = document.getElementById('registrationModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
        modal.querySelector('.modal-content').style.opacity = '1';
    }, 10);
}

function closeRegistrationForm() {
    const modal = document.getElementById('registrationModal');
    modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
    modal.querySelector('.modal-content').style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('registrationModal');
    if (event.target === modal) {
        closeRegistrationForm();
    }
});

// Handle Registration Form Submission
function handleRegistration(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: formData.get('password')
    };
    
    // Show loading state
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Account created successfully! Welcome to ICE USDT!', 'success');
        
        // Close modal
        closeRegistrationForm();
        
        // Reset form
        event.target.reset();
        
        // In a real application, you would send this data to your backend
        console.log('Registration data:', userData);
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #00ff9d, #00d4ff)' : 'linear-gradient(45deg, #ff6b6b, #ffa500)'};
        color: #0a0a0a;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 255, 157, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        max-width: 350px;
        font-weight: 500;
    `;
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        font-size: 0.9rem;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Parallax Effect for Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Intersection Observer for Animation Triggers
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .section-title');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});

// Dynamic USDT Coin Generation
function createFloatingCoin() {
    const coin = document.createElement('div');
    coin.className = 'floating-coin';
    coin.innerHTML = '<i class="fab fa-ethereum"></i>';
    
    // Random position and animation duration
    const startX = Math.random() * window.innerWidth;
    const duration = 3000 + Math.random() * 2000;
    
    coin.style.cssText = `
        position: fixed;
        left: ${startX}px;
        bottom: -60px;
        width: 40px;
        height: 40px;
        background: linear-gradient(45deg, #00ff9d, #00d4ff);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #0a0a0a;
        box-shadow: 0 0 15px rgba(0, 255, 157, 0.6);
        z-index: 1;
        pointer-events: none;
        animation: floatUp ${duration}ms linear forwards;
    `;
    
    document.body.appendChild(coin);
    
    // Remove coin after animation
    setTimeout(() => {
        if (coin.parentElement) {
            coin.remove();
        }
    }, duration);
}

// Add floating coin animation CSS
const floatingCoinStyles = document.createElement('style');
floatingCoinStyles.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatingCoinStyles);

// Generate floating coins periodically
setInterval(createFloatingCoin, 3000);

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Add loading screen
document.addEventListener('DOMContentLoaded', () => {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loadingScreen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">ICE USDT</div>
            <div class="loading-spinner">
                <div class="spinner-coin"></div>
                <div class="spinner-coin"></div>
                <div class="spinner-coin"></div>
            </div>
            <div class="loading-text">Loading the future of gaming...</div>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease-out;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
});

// Add loading screen styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    .loading-content {
        text-align: center;
        color: white;
    }
    
    .loading-logo {
        font-size: 3rem;
        font-weight: 700;
        background: linear-gradient(45deg, #00ff9d, #00d4ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 2rem;
    }
    
    .loading-spinner {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 2rem;
    }
    
    .spinner-coin {
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, #00ff9d, #00d4ff);
        border-radius: 50%;
        animation: bounce 1.4s ease-in-out infinite both;
    }
    
    .spinner-coin:nth-child(1) { animation-delay: -0.32s; }
    .spinner-coin:nth-child(2) { animation-delay: -0.16s; }
    
    .loading-text {
        color: #b0b0b0;
        font-size: 1.1rem;
    }
    
    @keyframes bounce {
        0%, 80%, 100% {
            transform: scale(0);
        }
        40% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(loadingStyles);

// Add modal entrance animation styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal-content {
        transform: scale(0.8);
        opacity: 0;
        transition: all 0.3s ease-out;
    }
`;
document.head.appendChild(modalStyles);
