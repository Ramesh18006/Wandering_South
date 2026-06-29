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
}
);
