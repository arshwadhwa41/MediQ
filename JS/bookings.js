// ===== Tagline typing animation (loops forever) =====
const taglines = [
  "Apni details fill karo appointment book karne ke liye…",
  "Sahi date & time choose karo, baaki hum sambhaal lenge!",
  "Fast, simple, reliable — MediQ Appointment Booking"
];

const taglineEl = document.getElementById("tagline-text");
let tIndex = 0, cIndex = 0, typing = true;

function typeLoop(){
  const text = taglines[tIndex];

  if(typing){
    if(cIndex < text.length){
      taglineEl.textContent += text.charAt(cIndex++);
      setTimeout(typeLoop, 60);
    }else{
      typing = false;
      setTimeout(typeLoop, 1200); // pause after full line
    }
  }else{
    if(cIndex > 0){
      taglineEl.textContent = text.substring(0, --cIndex);
      setTimeout(typeLoop, 30);
    }else{
      typing = true;
      tIndex = (tIndex + 1) % taglines.length;
      setTimeout(typeLoop, 250);
    }
  }
}
typeLoop();

// ===== Read hospital from URL (?hospital=...) and show in header + review =====
const params = new URLSearchParams(window.location.search);
const hospitalFromURL = params.get("hospital");
const chosenHospitalEl = document.getElementById("chosenHospital");
const reviewHospitalEl = document.getElementById("r-hospital");

if(hospitalFromURL){
  chosenHospitalEl.textContent = decodeURIComponent(hospitalFromURL);
  reviewHospitalEl.textContent = decodeURIComponent(hospitalFromURL);
}else{
  chosenHospitalEl.textContent = "Not selected";
  reviewHospitalEl.textContent = "Not selected";
}

// ===== Inputs & constraints =====
const form = document.getElementById("bookingForm");
const inputs = {
  name: document.getElementById("name"),
  guardian: document.getElementById("guardian"),
  phone: document.getElementById("phone"),
  sex: document.getElementById("sex"),
  age: document.getElementById("age"),
  address: document.getElementById("address"),
  date: document.getElementById("date"),
  time: document.getElementById("time"),
};

// Set min date = today
(function setMinDate(){
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  inputs.date.min = `${yyyy}-${mm}-${dd}`;
})();

// Live Review panel update
function updateReview(){
  document.getElementById("r-name").textContent     = inputs.name.value || "—";
  document.getElementById("r-guardian").textContent = inputs.guardian.value || "—";
  document.getElementById("r-phone").textContent    = inputs.phone.value || "—";
  document.getElementById("r-sex").textContent      = inputs.sex.value || "—";
  document.getElementById("r-age").textContent      = inputs.age.value || "—";
  document.getElementById("r-address").textContent  = inputs.address.value || "—";
  document.getElementById("r-date").textContent     = inputs.date.value || "—";
  document.getElementById("r-time").textContent     = inputs.time.value || "—";
}
Object.values(inputs).forEach(el => el.addEventListener("input", updateReview));
updateReview();

// Simple validators
function showError(id, msg){
  const el = document.querySelector(`small.error[data-for="${id}"]`);
  if(el) el.textContent = msg || "";
}
function validate(){
  let ok = true;

  if(!inputs.name.value.trim()){ showError("name","Please enter full name"); ok=false; } else showError("name");
  if(!inputs.guardian.value.trim()){ showError("guardian","Please enter father/husband name"); ok=false; } else showError("guardian");

  const phoneOk = /^[0-9]{10}$/.test(inputs.phone.value.trim());
  if(!phoneOk){ showError("phone","Enter valid 10-digit number"); ok=false; } else showError("phone");

  if(!inputs.sex.value){ showError("sex","Please select"); ok=false; } else showError("sex");
  const ageVal = Number(inputs.age.value);
  if(!(ageVal>=0 && ageVal<=120)){ showError("age","Enter valid age (0-120)"); ok=false; } else showError("age");

  if(!inputs.address.value.trim()){ showError("address","Please enter address"); ok=false; } else showError("address");

  if(!inputs.date.value){ showError("date","Please pick a date"); ok=false; } else showError("date");

  // Time between 10:00 and 17:00 inclusive
  if(!inputs.time.value){
    showError("time","Please pick a time");
    ok=false;
  }else{
    const [hh, mm] = inputs.time.value.split(":").map(Number);
    const mins = hh*60+mm;
    const start = 10*60, end = 17*60;
    if(mins < start || mins > end){
      showError("time","Time must be between 10:00 and 17:00");
      ok=false;
    }else{
      showError("time");
    }
  }

  return ok;
}

// Submit handler (fake submit + pretty toast)
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  if(!validate()) return;

  // Generate a lightweight token number (just for UI)
  const token = "MQ" + Math.floor(100000 + Math.random()*900000);

  toastText.textContent = `Token ${token} for ${inputs.date.value} at ${inputs.time.value} sent to ${inputs.phone.value}`;
  toast.classList.add("show");

  // Optional: Scroll to top so user sees the toast
  window.scrollTo({top:0, behavior:"smooth"});

  // Hide toast after some time
  setTimeout(()=> toast.classList.remove("show"), 4200);

  // Reset form after short delay (only UI)
  setTimeout(()=> {
    form.reset();
    updateReview();
  }, 800);
});

// Clear errors on input
Object.entries(inputs).forEach(([id, el])=>{
  el.addEventListener("input", ()=> showError(id,""));
});
