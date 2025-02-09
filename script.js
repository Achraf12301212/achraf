// Theme management
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Initialize theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.body.classList.toggle('dark-mode', savedTheme === 'dark');
} else {
  document.body.classList.toggle('dark-mode', prefersDarkScheme.matches);
}

themeToggle.addEventListener('click', () => {
  document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
  document.body.classList.toggle('dark-mode');
  themeToggle.classList.add('rotate');
  
  setTimeout(() => {
    themeToggle.classList.remove('rotate');
  }, 500);
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

// Enhanced scroll to section with highlight
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    
    // Add highlight effect
    section.classList.add('section-highlight');
    setTimeout(() => {
      section.classList.remove('section-highlight');
    }, 1000);
    
    // Update active nav item
    document.querySelectorAll('nav a').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
    });
  }
}

// Enhanced transactions data
const transactions = [
  { 
    type: 'deposit', 
    amount: 5000, 
    date: '2024-01-10', 
    description: 'Dépôt', 
    category: 'income',
    icon: '💰'
  },
  { 
    type: 'payment', 
    amount: -1200, 
    date: '2024-01-15', 
    description: 'Achat', 
    category: 'shopping',
    icon: '🛍️'
  },
  { 
    type: 'transfer', 
    amount: -800, 
    date: '2024-01-18', 
    description: 'Virement', 
    category: 'transfer',
    icon: '📤'
  },
  { 
    type: 'deposit', 
    amount: 3000, 
    date: '2024-01-20', 
    description: 'Salaire', 
    category: 'income',
    icon: '💳'
  },
];

// Enhanced transaction population with animations
function populateTransactions() {
  const transactionsList = document.querySelector('.transactions-list');
  if (!transactionsList) return;
  
  transactionsList.innerHTML = ''; // Clear existing transactions
  
  transactions.forEach((transaction, index) => {
    const element = document.createElement('div');
    element.className = 'transaction-item';
    element.style.animationDelay = `${index * 0.1}s`;
    
    const date = new Date(transaction.date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long'
    });
    
    element.innerHTML = `
      <div class="transaction-info">
        <span class="transaction-icon">${transaction.icon}</span>
        <div class="transaction-details">
          <div class="transaction-description">${transaction.description}</div>
          <div class="transaction-date">${date}</div>
        </div>
      </div>
      <div class="transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}">
        ${Math.abs(transaction.amount).toLocaleString('fr-FR')} DH
      </div>
    `;
    
    transactionsList.appendChild(element);
  });
}

// Enhanced active navigation handling
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= (sectionTop - sectionHeight/3)) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active');
    }
  });
}

// Add scroll event listener for navigation highlighting
window.addEventListener('scroll', updateActiveNav);
document.addEventListener('DOMContentLoaded', updateActiveNav);

// Add welcome particles
function createWelcomeParticles() {
  const particlesContainer = document.querySelector('.welcome-particles');
  if (!particlesContainer) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 4px and 12px
    const size = Math.random() * 8 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 2}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// Enhanced initialization
document.addEventListener('DOMContentLoaded', () => {
  createWelcomeParticles();
  populateTransactions();
  
  // Enhanced intersection observer with more subtle animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        if (entry.target.classList.contains('stat-number')) {
          animateNumber(entry.target);
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, .stat-number, .transaction-item').forEach(el => {
    el.classList.add('animate-out');
    observer.observe(el);
  });

  // Enhanced number animation with formatting
  function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-value'));
    const duration = 2000;
    const steps = 60;
    const stepValue = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += stepValue;
      
      // Format the number based on its value
      if (target >= 1000) {
        element.textContent = Math.round(current).toLocaleString('fr-FR') + '+';
      } else if (target === 100) {
        element.textContent = Math.round(current) + '%';
      } else {
        element.textContent = Math.round(current);
      }
      
      if (current >= target) {
        if (target >= 1000) {
          element.textContent = target.toLocaleString('fr-FR') + '+';
        } else if (target === 100) {
          element.textContent = target + '%';
        } else {
          element.textContent = target;
        }
        clearInterval(timer);
      }
    }, duration / steps);
  }

  // Initialize number animations when stats become visible
  document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll('.stat-number');
          statNumbers.forEach(number => {
            animateNumber(number);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
      observer.observe(statsContainer);
    }
  });

  // Enhanced animations for the credit card
  document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.credit-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
  });

  // Reset card position when mouse leaves
  document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.credit-card');
    cards.forEach(card => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });

  // Enhanced button hover effects
  document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      button.style.setProperty('--x', `${x}px`);
      button.style.setProperty('--y', `${y}px`);
    });
  });

  // Logo animation
  const logo = document.querySelector('.logo');
  let hue = 0;

  function animateLogo() {
    hue = (hue + 1) % 360;
    logo.style.filter = `hue-rotate(${hue}deg)`;
    requestAnimationFrame(animateLogo);
  }

  animateLogo();
});

// Enhanced Credit Card Functionality
let isCardActivated = false;

function toggleCard() {
  const card = document.querySelector('.credit-card');
  card.classList.toggle('flipped');
}

function activateCard() {
  if (isCardActivated) return;
  
  const card = document.querySelector('.credit-card');
  const btn = document.querySelector('.card-activate-btn');
  const status = document.querySelector('.card-status');
  
  // Add activation animation class
  card.classList.add('activating');
  btn.disabled = true;
  btn.style.opacity = '0.7';
  btn.textContent = 'Activation en cours...';
  
  // Simulate activation process with more visual feedback
  setTimeout(() => {
    // Create sparkle effect
    for (let i = 0; i < 20; i++) {
      createSparkle(card);
    }
    
    // Update card status
    setTimeout(() => {
      card.classList.remove('activating');
      isCardActivated = true;
      btn.textContent = 'Carte Activée';
      btn.style.background = '#10b981';
      status.textContent = '✅ Votre carte est maintenant active et prête à être utilisée';
      status.classList.add('active');
      
      // Add success animation
      card.style.animation = 'successPulse 0.5s ease-in-out';
      
      // Remove success animation after it completes
      setTimeout(() => {
        card.style.animation = 'cardFloat 3s ease-in-out infinite';
      }, 500);
    }, 500);
  }, 2000);
}

function createSparkle(parent) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  
  // Random position around the card
  const left = Math.random() * parent.offsetWidth;
  const top = Math.random() * parent.offsetHeight;
  
  sparkle.style.cssText = `
    position: absolute;
    left: ${left}px;
    top: ${top}px;
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    pointer-events: none;
    animation: sparkleAnimation 0.8s ease-in-out forwards;
  `;
  
  parent.appendChild(sparkle);
  
  // Remove sparkle after animation
  setTimeout(() => sparkle.remove(), 800);
}

// Add sparkle animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes sparkleAnimation {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 0;
    }
    50% {
      transform: scale(1) rotate(180deg);
      opacity: 1;
    }
    100% {
      transform: scale(0) rotate(360deg);
      opacity: 0;
    }
  }
  
  @keyframes successPulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;
document.head.appendChild(style);

// Initialize card number masking
document.addEventListener('DOMContentLoaded', () => {
  const cardNumber = document.querySelector('.card-number');
  if (cardNumber) {
    const number = cardNumber.textContent;
    cardNumber.textContent = number.replace(/(\d{4})/g, '$1 ').trim();
  }
});

// Add smooth scroll behavior to all navigation links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('href').substring(1);
    scrollToSection(sectionId);
  });
});