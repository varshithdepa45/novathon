// Modal Controls
const modal = document.getElementById("quoteModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const getQuoteBtn = document.getElementById("getQuoteBtn");
const heroQuoteBtn = document.getElementById("heroQuoteBtn");
const successModal = document.getElementById("successModal");
const successClose = document.getElementById("successClose");
const quoteForm = document.getElementById("quoteForm");

// Grid Knowledge Controls
const gridKnowledgeRadios = document.querySelectorAll(
  'input[name="gridKnowledge"]'
);
const gridAvailabilityGroup = document.getElementById("gridAvailabilityGroup");

// Open Modal Functions
function openModal() {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Event Listeners for Modal
getQuoteBtn.addEventListener("click", openModal);
heroQuoteBtn.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// Learn More Button - Smooth Scroll
document.getElementById("learnMoreBtn").addEventListener("click", () => {
  document.getElementById("about").scrollIntoView({ behavior: "smooth" });
});

// Grid Knowledge Logic
gridKnowledgeRadios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    if (e.target.value === "yes") {
      gridAvailabilityGroup.style.display = "block";
      const gridAvailableRadios = document.querySelectorAll(
        'input[name="gridAvailable"]'
      );
      gridAvailableRadios.forEach((r) => (r.required = true));
    } else {
      gridAvailabilityGroup.style.display = "none";
      const gridAvailableRadios = document.querySelectorAll(
        'input[name="gridAvailable"]'
      );
      gridAvailableRadios.forEach((r) => {
        r.required = false;
        r.checked = false;
      });
    }
  });
});

// Form Submission
quoteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = quoteForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

  // Get form data
  const formData = new FormData(quoteForm);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    contact: formData.get("contact"),
    address: formData.get("address"),
    city: formData.get("city"),
    pincode: formData.get("pincode"),
    monthlyBill: parseFloat(formData.get("monthlyBill")),
    terraceArea: parseFloat(formData.get("terraceArea")),
    gridKnowledge: formData.get("gridKnowledge"),
    monthlyConsumption: parseFloat(formData.get("monthlyConsumption") || "0"),
    peakConsumption: parseFloat(formData.get("peakConsumption") || "0"),
    lowestConsumption: parseFloat(formData.get("lowestConsumption") || "0"),
  };

  try {
    // Send data to backend
    const response = await fetch(
      "http://localhost:3000/api/submit-assessment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const result = await response.json();
      // Close quote modal
      closeModal();

      // Show success modal with assessment ID
      const successMessage = document.getElementById("successMessage");
      successMessage.textContent = `Your solar assessment has been submitted successfully. Your reference ID is: ${result.id}`;
      successModal.classList.add("active");

      // Reset form
      quoteForm.reset();
    } else {
      const error = await response.json();
      throw new Error(error.message || "Failed to submit form");
    }
  } catch (error) {
    console.error("Error:", error);
    alert(
      error.message ||
        "There was an error submitting your assessment. Please try again or contact us directly."
    );
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML =
      '<i class="fas fa-paper-plane"></i> Submit Assessment';
  }
});

// Success Modal Close
successClose.addEventListener("click", () => {
  successModal.classList.remove("active");
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Form Validation Helper
function validatePhone(phone) {
  return /^[0-9]{10}$/.test(phone);
}

function validatePincode(pincode) {
  return /^[0-9]{6}$/.test(pincode);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Real-time validation feedback
document.getElementById("contact").addEventListener("blur", (e) => {
  if (!validatePhone(e.target.value)) {
    e.target.style.borderColor = "#ef4444";
  } else {
    e.target.style.borderColor = "#10b981";
  }
});

document.getElementById("pincode").addEventListener("blur", (e) => {
  if (!validatePincode(e.target.value)) {
    e.target.style.borderColor = "#ef4444";
  } else {
    e.target.style.borderColor = "#10b981";
  }
});

document.getElementById("email").addEventListener("blur", (e) => {
  if (!validateEmail(e.target.value)) {
    e.target.style.borderColor = "#ef4444";
  } else {
    e.target.style.borderColor = "#10b981";
  }
});

// Calculate estimated savings based on consumption
document.getElementById("monthlyBill").addEventListener("input", (e) => {
  const monthlyBill = parseFloat(e.target.value);
  if (monthlyBill) {
    const estimatedSavings = monthlyBill * 0.9; // 90% savings
    const yearlySavings = estimatedSavings * 12;
    console.log(`Estimated Monthly Savings: ₹${estimatedSavings.toFixed(2)}`);
    console.log(`Estimated Yearly Savings: ₹${yearlySavings.toFixed(2)}`);
  }
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".about-card, .service-card, .benefit-item, .info-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

// Close modal on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (modal.classList.contains("active")) {
      closeModal();
    }
    if (successModal.classList.contains("active")) {
      successModal.classList.remove("active");
    }
  }
});

// Prevent form submission on Enter key except in textarea
quoteForm.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
    e.preventDefault();
  }
});

// Auto-format phone number
document.getElementById("contact").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
});

// Auto-format pincode
document.getElementById("pincode").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
});
