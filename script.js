// MOBILE MENU

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// GOOGLE SHEET FORM SUBMIT

const form = document.getElementById("enquiryForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  try {
    await fetch("PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE", {
      method: "POST",
      body: JSON.stringify(data),
    });

    alert("Enquiry Submitted Successfully!");

    form.reset();
  } catch (error) {
    alert("Something went wrong!");
  }
});
// EXPLORE MOBILE MENU //
  const exploreMenuToggle = document.getElementById("exploreMenuToggle");
  const exploreNavLinks = document.getElementById("exploreNavLinks");
  if (exploreMenuToggle) {
    exploreMenuToggle.addEventListener("click", () => {
      exploreNavLinks.classList.toggle("active");
    });
  } 
// SEARCH SUGGESTIONS // 
const places = [
  "Munnar",
  "Ooty",
  "Kodaikanal",
  "Alleppey",
  "Madurai",
  "Mahabalipuram",
  "Kanyakumari",
  "Wayanad",
  "Kochi",
  "Rameswaram",
  "Varkala",
  "Thekkady",
];
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestionsBox");
if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let input = searchInput.value.toLowerCase();
    suggestionsBox.innerHTML = "";
    if (input.length === 0) {
      return;
    }
    let filtered = places.filter((place) =>
      place.toLowerCase().includes(input),
    );
    filtered.forEach((place) => {
      const div = document.createElement("div");
      div.classList.add("suggestion-item");
      div.innerText = place;
      div.onclick = () => {
        searchInput.value = place;
        suggestionsBox.innerHTML = "";
      };
      suggestionsBox.appendChild(div);
    });
  });
} // ========================================== // DESTINATION FILTER // ==========================================
function filterDestinations(type) {
  const cards = document.querySelectorAll(".destination-card");
  cards.forEach((card) => {
    if (card.classList.contains(type)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
} // ========================================== // STATE FILTER // ==========================================
function filterState(state) {
  const cards = document.querySelectorAll(".destination-card");
  cards.forEach((card) => {
    if (card.classList.contains(state)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
} // ========================================== // SHOW ALL // ==========================================
function showAll() {
  const cards = document.querySelectorAll(".destination-card");
  cards.forEach((card) => {
    card.style.display = "block";
  });
}
