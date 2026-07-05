const body = document.body;
const loader = document.querySelector(".loader");
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSc-n0agg2b75Gey_7n255HL6e1tuHyp1qlpeEDs7alUfjDraw/formResponse";
const GOOGLE_FORM_FIELDS = {
  firstName: "entry.804893552",
  lastName: "entry.1641395971",
  email: "entry.130556750",
  interestedIn: "entry.1197041256",
  message: "entry.999343998"
};
const GOOGLE_FORM_FALLBACK_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc-n0agg2b75Gey_7n255HL6e1tuHyp1qlpeEDs7alUfjDraw/viewform";

body.classList.add("is-loading");

const hideLoader = () => {
  window.setTimeout(() => {
    loader?.classList.add("is-hidden");
    body.classList.remove("is-loading");
  }, 650);
};

window.addEventListener("DOMContentLoaded", hideLoader, { once: true });
window.addEventListener("load", hideLoader, { once: true });
window.setTimeout(hideLoader, 1800);

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const open = mobileMenu?.classList.toggle("is-open");
  header?.classList.toggle("is-open", Boolean(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("is-open");
    header?.classList.remove("is-open");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const number = entry.target;
    const target = Number(number.dataset.count || 0);
    const duration = 1100;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      number.textContent = Math.round(target * eased).toString() + (number.dataset.suffix || "");
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    countObserver.unobserve(number);
  });
}, { threshold: 0.5 });

document.querySelectorAll("[data-count]").forEach((number) => countObserver.observe(number));

document.querySelectorAll("[data-mailto], [data-google-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const requiredCheckboxName = form.dataset.requireCheckbox;
    const status = form.querySelector(".form-status");
    const submitButton = form.querySelector('button[type="submit"]');

    if (requiredCheckboxName) {
      const hasSelection = form.querySelector(`input[name="${requiredCheckboxName}"]:checked`);
      if (!hasSelection) {
        form.querySelector(`input[name="${requiredCheckboxName}"]`)?.focus();
        window.alert(`Please select at least one ${requiredCheckboxName.toLowerCase()} option.`);
        return;
      }
    }

    const formData = new FormData(form);

    if (form.matches("[data-google-form]")) {
      const isConfigured = GOOGLE_FORM_ACTION && Object.values(GOOGLE_FORM_FIELDS).every(Boolean);

      if (!isConfigured) {
        if (status) status.textContent = "This form is almost ready. Please add the Google Form URL and field IDs.";
        if (GOOGLE_FORM_FALLBACK_URL) window.open(GOOGLE_FORM_FALLBACK_URL, "_blank", "noopener,noreferrer");
        return;
      }

      const googleFormData = new URLSearchParams();
      googleFormData.append(GOOGLE_FORM_FIELDS.firstName, formData.get("First name") || "");
      googleFormData.append(GOOGLE_FORM_FIELDS.lastName, formData.get("Last name") || "");
      googleFormData.append(GOOGLE_FORM_FIELDS.email, formData.get("Email") || "");
      formData.getAll("Interested in").forEach((selection) => {
        googleFormData.append(GOOGLE_FORM_FIELDS.interestedIn, selection);
      });
      googleFormData.append(GOOGLE_FORM_FIELDS.message, formData.get("Notes") || "");

      if (status) status.textContent = "Submitting...";
      if (submitButton) submitButton.disabled = true;

      try {
        await fetch(GOOGLE_FORM_ACTION, {
          method: "POST",
          mode: "no-cors",
          body: googleFormData
        });
        form.reset();
        if (status) status.textContent = "Thank you. Your interest has been submitted.";
      } catch {
        if (status) status.textContent = "Submission failed. Opening the Google Form so you can submit there.";
        if (GOOGLE_FORM_FALLBACK_URL) window.open(GOOGLE_FORM_FALLBACK_URL, "_blank", "noopener,noreferrer");
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
      return;
    }

    const lines = Array.from(formData.entries()).map(([key, value]) => `${key}: ${value}`);
    const subject = encodeURIComponent(form.dataset.subject || "PCG Interest Form");
    const body = encodeURIComponent(lines.join("\n"));
    if (status) status.textContent = "Opening your email app to send this interest form.";
    window.location.href = `mailto:${form.dataset.mailto}?subject=${subject}&body=${body}`;
  });
});
