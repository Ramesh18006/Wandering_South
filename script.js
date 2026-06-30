// Smooth Fade-in on load
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease-in";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 50);

  // Initialize Auth State
  checkAuthState();
  
  // Attach Mobile Menu Listeners
  setupMobileMenu();
  
  // Attach Search Listeners
  setupSearch();

  // Attach Package Pop-up Book Buttons
  const bookBtns = document.querySelectorAll('.card-popup button.bg-primary');
  bookBtns.forEach(btn => {
    if (btn.innerText.includes('Book')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'about.html';
      });
    }
  });
});

// Setup Mobile Menu
function setupMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const closeBtn = document.getElementById("closeBtn");
  const mobileNav = document.getElementById("mobileNav"); // For tailwind pages

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (navLinks) navLinks.classList.add("active");
      if (mobileNav) mobileNav.style.right = "0"; // Tailwind slide-in
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      if (navLinks) navLinks.classList.remove("active");
      if (mobileNav) mobileNav.style.right = "-100%";
    });
  }
}

// Auth State Check
function checkAuthState() {
  const user = JSON.parse(localStorage.getItem("wanderingUser"));
  
  const userProfileElements = document.querySelectorAll('.userProfile');
  const planBtns = document.querySelectorAll('.nav-btn'); 
  
  if (user && user.name) {
    planBtns.forEach(btn => btn.style.display = 'none');
    userProfileElements.forEach(el => {
      el.style.display = 'flex';
      const nameSpan = el.querySelector('.userNameDisplay');
      if(nameSpan) nameSpan.innerText = user.name;
      
      el.addEventListener('click', () => {
        openEditPasswordModal();
      });
    });
  } else {
    planBtns.forEach(btn => btn.style.display = 'inline-block');
    userProfileElements.forEach(el => el.style.display = 'none');
    
    planBtns.forEach(btn => {
      btn.innerText = "Login / Sign Up";
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openAuthModal();
      });
    });
  }
}

// Auth Modal UI
function openAuthModal() {
  if (document.getElementById("authModal")) return;
  
  let modal = document.createElement("div");
  modal.id = "authModal";
  modal.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);";
  
  modal.innerHTML = `
    <div style="background:white;padding:30px;border-radius:12px;width:90%;max-width:400px;font-family:'Inter', sans-serif;">
      <h2 id="authTitle" style="font-size:24px;color:#0f5b4f;margin-bottom:20px;font-weight:600;">Login</h2>
      
      <!-- Login Form -->
      <form id="loginForm" style="display:flex;flex-direction:column;gap:15px;">
        <input type="email" id="loginEmail" placeholder="Email Address" required style="padding:12px;border:1px solid #ccc;border-radius:8px;">
        <input type="password" id="loginPassword" placeholder="Password" required style="padding:12px;border:1px solid #ccc;border-radius:8px;">
        <div id="loginError" style="color:red;font-size:14px;display:none;">Account not found. Please check credentials or create a new account.</div>
        <button type="submit" style="background:#0f5b4f;color:white;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer;">Login</button>
        <p style="text-align:center;font-size:14px;margin-top:10px;">Don't have an account? <a href="#" id="showSignUpBtn" style="color:#0f5b4f;font-weight:bold;text-decoration:underline;">Create Account</a></p>
      </form>
      
      <!-- Sign Up Form (hidden initially) -->
      <form id="createAccountForm" style="display:none;flex-direction:column;gap:15px;">
        <input type="text" id="authName" placeholder="Full Name" required style="padding:12px;border:1px solid #ccc;border-radius:8px;">
        <input type="email" id="authEmail" placeholder="Email Address" required style="padding:12px;border:1px solid #ccc;border-radius:8px;">
        <input type="password" id="authPassword" placeholder="Password" required style="padding:12px;border:1px solid #ccc;border-radius:8px;">
        <button type="submit" style="background:#0f5b4f;color:white;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer;">Create Account</button>
        <p style="text-align:center;font-size:14px;margin-top:10px;">Already have an account? <a href="#" id="showLoginBtn" style="color:#0f5b4f;font-weight:bold;text-decoration:underline;">Login</a></p>
      </form>

      <button type="button" id="closeAuthModal" style="margin-top:15px;background:transparent;border:none;color:#666;cursor:pointer;width:100%;">Cancel</button>
    </div>
  `;
  document.body.appendChild(modal);

  const loginForm = document.getElementById("loginForm");
  const createAccountForm = document.getElementById("createAccountForm");
  const authTitle = document.getElementById("authTitle");
  const loginError = document.getElementById("loginError");

  document.getElementById("closeAuthModal").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  document.getElementById("showSignUpBtn").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    createAccountForm.style.display = "flex";
    authTitle.innerText = "Create Account";
    loginError.style.display = "none";
  });

  document.getElementById("showLoginBtn").addEventListener("click", (e) => {
    e.preventDefault();
    createAccountForm.style.display = "none";
    loginForm.style.display = "flex";
    authTitle.innerText = "Login";
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    // Simulate checking against "database" (localStorage)
    const storedUser = JSON.parse(localStorage.getItem("wanderingUser_db"));
    
    if (storedUser && storedUser.email === email && storedUser.password === password) {
       // Successful login
       localStorage.setItem("wanderingUser", JSON.stringify(storedUser));
       document.body.removeChild(modal);
       checkAuthState();
    } else {
       loginError.style.display = "block";
    }
  });

  createAccountForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("authName").value;
    const email = document.getElementById("authEmail").value;
    const password = document.getElementById("authPassword").value;
    
    const btn = e.target.querySelector('button');
    btn.innerText = "Creating...";
    
    setTimeout(() => {
      const newUser = { name, email, password };
      // Save to fake DB
      localStorage.setItem("wanderingUser_db", JSON.stringify(newUser));
      // Log them in immediately
      localStorage.setItem("wanderingUser", JSON.stringify(newUser));
      
      document.body.removeChild(modal);
      checkAuthState();
      alert("Account created successfully!");
    }, 1000);
  });
}

// Edit Password Modal
function openEditPasswordModal() {
  const user = JSON.parse(localStorage.getItem("wanderingUser"));
  if (!user) return;
  if (document.getElementById("editModal")) return;
  
  let modal = document.createElement("div");
  modal.id = "editModal";
  modal.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);";
  
  modal.innerHTML = `
    <div style="background:white;padding:30px;border-radius:12px;width:90%;max-width:400px;font-family:'Inter', sans-serif;">
      <h2 style="font-size:24px;color:#0f5b4f;margin-bottom:20px;font-weight:600;">Edit Password</h2>
      <form id="editPasswordForm" style="display:flex;flex-direction:column;gap:15px;">
        <input type="password" id="newPassword" placeholder="New Password" required style="padding:12px;border:1px solid #ccc;border-radius:8px;">
        <button type="submit" style="background:#0f5b4f;color:white;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer;">Update Password</button>
        <button type="button" id="logoutBtn" style="background:#dc3545;color:white;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer;">Log Out</button>
      </form>
      <button type="button" id="closeEditModal" style="margin-top:15px;background:transparent;border:none;color:#666;cursor:pointer;width:100%;">Cancel</button>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById("closeEditModal").addEventListener("click", () => {
    document.body.removeChild(modal);
  });
  
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("wanderingUser");
    document.body.removeChild(modal);
    checkAuthState();
  });

  document.getElementById("editPasswordForm").addEventListener("submit", (e) => {
    e.preventDefault();
    user.password = document.getElementById("newPassword").value;
    localStorage.setItem("wanderingUser", JSON.stringify(user));
    alert("Password updated!");
    document.body.removeChild(modal);
  });
}

// Intercept Enquiry Forms
document.addEventListener("DOMContentLoaded", () => {
  const enquiryForms = document.querySelectorAll("form.enquiry-form, #enquiryForm");
  
  enquiryForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const user = JSON.parse(localStorage.getItem("wanderingUser"));
      if (!user) {
        alert("Please log in or create an account before submitting an enquiry.");
        openAuthModal();
        return;
      }
      
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const originalText = btn.innerText;
      btn.innerText = "Submitting...";
      
      setTimeout(() => {
        alert("Enquiry submitted successfully! We will contact you soon.");
        form.reset();
        btn.innerText = originalText;
      }, 1000);
    });
  });
});

// Setup Search
function setupSearch() {
  const searchInputs = document.querySelectorAll(".search-box input");
  const searchBtns = document.querySelectorAll(".search-box button");

  searchInputs.forEach((input, index) => {
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            searchBtns[index].click();
        }
    });
  });

  searchBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const query = searchInputs[index].value.toLowerCase().trim();
      if (!query) return;

      // Map query to valid IDs in package.html
      const validTargets = {
        "hill": "hill-stations",
        "hill stations": "hill-stations",
        "munnar": "munnar-card",
        "ooty": "hill-stations",
        "beach": "beaches",
        "beaches": "beaches",
        "temple": "temples",
        "temples": "temples",
        "madurai": "madurai-card",
        "backwater": "backwaters",
        "backwaters": "backwaters",
        "alleppey": "alleppey-card"
      };

      let targetId = null;
      for (const [key, id] of Object.entries(validTargets)) {
        if (query.includes(key)) {
          targetId = id;
          break;
        }
      }

      if (targetId) {
        // If on package.html, scroll to it
        if (window.location.pathname.includes("package.html")) {
          const section = document.getElementById(targetId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            if (targetId.endsWith('-card')) {
                openCardModal(section);
            }
          }
        } else {
          // Otherwise navigate to package.html with hash
          window.location.href = "package.html#" + targetId;
        }
      } else {
        alert("Sorry, we couldn't find a package matching '" + query + "'. Please try 'hills', 'beaches', or 'temples'.");
      }
    });
  });

  // Handle hash scrolling on load
  if (window.location.hash) {
    setTimeout(() => {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        if (window.location.hash.endsWith('-card')) {
            openCardModal(element);
        }
      }
    }, 600); // Wait for fade-in
  }
}

function openCardModal(card) {
    // Add class for mobile/desktop fallback logic
    card.classList.add('mobile-modal-active');
    document.body.style.overflow = 'hidden';
    
    // Manage scrim manually if present
    const scrim = document.getElementById('global-scrim');
    if (scrim) {
        scrim.style.opacity = '1';
        scrim.style.pointerEvents = 'auto';
    }
}
