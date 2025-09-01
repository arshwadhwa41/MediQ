// Tagline typing effect
const tagline = "Hospitals Available in Delhi For You 24/7 !";
let i = 0;
const taglineElement = document.getElementById("tagline-text");

function typeEffect() {
  if (i < tagline.length) {
    taglineElement.textContent += tagline.charAt(i);
    i++;
    setTimeout(typeEffect, 100);
  }
}
typeEffect();
