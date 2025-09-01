const tagline = document.getElementById("tagline-text");
const text = "About Us";
let i = 0;

function typeEffect() {
  if (i < text.length) {
    tagline.textContent += text.charAt(i);
    i++;
    setTimeout(typeEffect, 100);
  }
}

window.onload = typeEffect;
