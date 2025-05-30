// Smooth scrolling for navbar links
document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Prepare for future animations and interactivity

// Dark/Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

function setTheme(mode) {
  if (mode === 'light') {
    body.classList.add('light-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    body.classList.remove('light-mode');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
  localStorage.setItem('theme', mode);
}

// Load theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  setTheme('light');
} else {
  setTheme('dark');
}

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('light-mode')) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
});

// Contact form: open mail client directly
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const mailto = `mailto:anjalikrishna2163@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
    window.location.href = mailto;
  });
}

// Profile image hover/click animation (landing and about)
function setupProfileImageSwitch(imgId, resumeBtnId) {
  const img = document.getElementById(imgId);
  const resumeBtn = resumeBtnId ? document.getElementById(resumeBtnId) : null;
  if (!img) return;
  let toggled = false;
  img.addEventListener('mouseenter', () => {
    img.src = 'profile1.jpeg';
    if (resumeBtn) resumeBtn.style.display = 'block';
  });
  img.addEventListener('mouseleave', () => {
    img.src = 'profile2.jpeg';
    toggled = false;
    if (resumeBtn) resumeBtn.style.display = 'none';
  });
  img.addEventListener('click', () => {
    toggled = !toggled;
    img.src = toggled ? 'profile1.jpeg' : 'profile2.jpeg';
  });
  // Always allow single click download
  if (resumeBtn) {
    resumeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = 'resume.pdf';
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}
setupProfileImageSwitch('profile-img', 'resume-btn');
setupProfileImageSwitch('about-img'); 