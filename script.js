const body = document.body;
const loader = document.querySelector(".loader");
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

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

document.querySelectorAll("[data-mailto]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const requiredCheckboxName = form.dataset.requireCheckbox;

    if (requiredCheckboxName) {
      const hasSelection = form.querySelector(`input[name="${requiredCheckboxName}"]:checked`);
      if (!hasSelection) {
        form.querySelector(`input[name="${requiredCheckboxName}"]`)?.focus();
        window.alert(`Please select at least one ${requiredCheckboxName.toLowerCase()} option.`);
        return;
      }
    }

    const formData = new FormData(form);
    const lines = Array.from(formData.entries()).map(([key, value]) => `${key}: ${value}`);
    const subject = encodeURIComponent(form.dataset.subject || "PCG Interest Form");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${form.dataset.mailto}?subject=${subject}&body=${body}`;
  });
});
