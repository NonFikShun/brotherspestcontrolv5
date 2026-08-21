/* Brothers Pest Control — Template v5 shared behavior */

document.addEventListener("DOMContentLoaded", function () {
  /* Mobile nav toggle */
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* FAQ accordion */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    if (!question) return;
    question.addEventListener("click", function () {
      var isOpen = item.getAttribute("data-open") === "true";
      // Close all other items for a clean single-open accordion
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.setAttribute("data-open", "false");
          var oq = other.querySelector(".faq-question");
          if (oq) oq.setAttribute("aria-expanded", "false");
        }
      });
      item.setAttribute("data-open", isOpen ? "false" : "true");
      question.setAttribute("aria-expanded", isOpen ? "false" : "true");
    });
  });

  /* Contact form — no backend in this template, so we confirm client-side */
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    var successBox = document.getElementById("form-success");
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      if (successBox) {
        successBox.classList.add("is-visible");
        successBox.setAttribute("role", "status");
        successBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      contactForm.reset();
    });
  }
});
