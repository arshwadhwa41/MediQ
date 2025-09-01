// ========== Tagline Typing Animation ==========
const taglines = [
  "Select your city to find nearby hospitals.",
  "Healthcare made simple with MediQ."
];
let taglineIndex = 0, charIndex = 0, typing = true;
const taglineElement = document.getElementById("tagline-text");

function typeTagline() {
  if (typing) {
    if (charIndex < taglines[taglineIndex].length) {
      taglineElement.textContent += taglines[taglineIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeTagline, 100);
    } else {
      typing = false;
      setTimeout(typeTagline, 1500);
    }
  } else {
    if (charIndex > 0) {
      taglineElement.textContent = taglines[taglineIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeTagline, 50);
    } else {
      typing = true;
      taglineIndex = (taglineIndex + 1) % taglines.length;
      setTimeout(typeTagline, 300);
    }
  }
}
typeTagline();

// ========== City Search ==========
const cities = ["Delhi","Mumbai","Pune","Chennai","Chandigarh","Bangalore","Gurgaon","Shimla","Ludhiana"];
const searchInput = document.getElementById("city-search");
const suggestions = document.getElementById("city-suggestions");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  suggestions.innerHTML = "";
  if (query) {
    const filtered = cities.filter(city => city.toLowerCase().includes(query));
    filtered.forEach(city => {
      const li = document.createElement("li");
      li.textContent = city;
      li.onclick = () => {
        searchInput.value = city;
        suggestions.style.display = "none";

        // ✅ Redirect to proper city page
        const cityPages = {
          chandigarh: "chandigarh.html",
          bangalore: "bangalore.html",
          chennai: "chennai.html",
          delhi: "delhi.html",
          gurgaon: "gurgaon.html",
          ludhiana: "ludhiana.html",
          mumbai: "mumbai.html",
          pune: "pune.html",
          shimla: "shimla.html"
        };

        const page = cityPages[city.toLowerCase()];
        if (page) {
          window.location.href = `./${page}`;
        }
      };
      suggestions.appendChild(li);
    });
    suggestions.style.display = "block";
  } else {
    suggestions.style.display = "none";
  }
});

// ========== Health Issues Data ==========
const issues = {
  teeth: {
    title: "Teeth Pain",
    precautions: ["Brush twice daily", "Avoid too much sugar", "Regular dental checkups"],
    treatment: "Warm salt water rinse, clove oil. Visit dentist if persistent."
  },
  stomach: {
    title: "Stomach Pain",
    precautions: ["Eat light meals", "Avoid spicy food", "Stay hydrated"],
    treatment: "ORS solution, bland diet, consult doctor if severe."
  },
  cold: {
    title: "Common Cold",
    precautions: ["Wash hands often", "Avoid cold drinks", "Wear warm clothes"],
    treatment: "Ginger tea, steam inhalation, rest well."
  },
  headache: {
    title: "Headache",
    precautions: ["Avoid stress", "Stay hydrated", "Maintain posture"],
    treatment: "Rest, hydration, mild pain relievers if required."
  },
  fever: {
    title: "Fever",
    precautions: ["Drink fluids", "Take rest", "Monitor temperature"],
    treatment: "Paracetamol, sponge bath, consult doctor if persists."
  },
  acidity: {
    title: "Acidity",
    precautions: [
      "Avoid spicy and oily food",
      "Eat smaller and frequent meals",
      "Do not lie down immediately after eating",
      "Limit caffeine and alcohol intake"],
    treatment: "Drink cold milk, take antacids if necessary, and consult a doctor if the problem persists."
  }

};

// ========== Modal Handling ==========
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalPrecautions = document.getElementById("modal-precautions");
const modalTreatment = document.getElementById("modal-treatment");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".health-card").forEach(card => {
  card.addEventListener("click", () => {
    const issue = card.getAttribute("data-issue");
    modalTitle.textContent = issues[issue].title;
    modalPrecautions.innerHTML = issues[issue].precautions.map(p => `<li>${p}</li>`).join("");
    modalTreatment.textContent = issues[issue].treatment;
    modal.style.display = "flex";
  });
});

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };
