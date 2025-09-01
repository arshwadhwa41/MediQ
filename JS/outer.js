// ================= TAGLINE TYPING ANIMATION =================
const taglines = [
  "Your Health, Our Priority",
  "Book OPD Appointments Easily",
  "Skip the Queue, Stay Healthy",
  "MediQ — Care Made Simple"
];

let taglineIndex = 0;
let charIndex = 0;
let typing = true;
const taglineElement = document.getElementById("tagline-text");

function typeTagline() {
  if (typing) {
    // Typing characters
    if (charIndex < taglines[taglineIndex].length) {
      taglineElement.textContent += taglines[taglineIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeTagline, 100);
    } else {
      typing = false;
      setTimeout(typeTagline, 1500); // pause before deleting
    }
  } else {
    // Deleting characters
    if (charIndex > 0) {
      taglineElement.textContent = taglines[taglineIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeTagline, 50);
    } else {
      typing = true;
      taglineIndex = (taglineIndex + 1) % taglines.length; // next tagline
      setTimeout(typeTagline, 300);
    }
  }
}

// Start tagline animation after DOM load
document.addEventListener("DOMContentLoaded", () => {
  typeTagline();
});

// ================= FOOTER FLY-IN ANIMATION =================
document.addEventListener("DOMContentLoaded", () => {
  const serviceItems = document.querySelectorAll(".footer-left ul li");

  const revealOnScroll = () => {
    serviceItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        item.style.animationPlayState = "running";
      }
    });
  };

  // Initially pause animation
  serviceItems.forEach((item) => {
    item.style.animationPlayState = "paused";
  });

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // run once on load
});

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".service-card, .contact-box");

  const revealOnScroll = () => {
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.style.animationPlayState = "running";
      }
    });
  };

  // Initially pause animation
  elements.forEach((el) => {
    el.style.animationPlayState = "paused";
  });

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});


document.addEventListener("DOMContentLoaded", () => {
  // Select all except tagline
  const elements = document.querySelectorAll(
    ".hero-text, .hero-image, .service-card, .contact-box, .footer-heading"
  );

  elements.forEach((el, index) => {
    el.classList.add("fade-in");
    el.style.animationDelay = `${index * 0.2}s`; // stagger
  });

  // ✨ Start tagline typing animation separately
  typeTagline();
});
