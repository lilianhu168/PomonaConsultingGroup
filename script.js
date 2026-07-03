const body = document.body;
const loader = document.querySelector(".loader");
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const typing = document.querySelector("[data-typing]");
const stage = document.querySelector("[data-stage]");

body.classList.add("is-loading");

window.addEventListener("load", () => {
  window.setTimeout(() => {
    loader?.classList.add("is-hidden");
    body.classList.remove("is-loading");
  }, 650);
});

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

const phrases = [
  "building insight",
  "mapping markets",
  "testing strategy",
  "delivering clarity"
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

const typeLoop = () => {
  if (!typing) return;

  const phrase = phrases[phraseIndex];
  typing.textContent = phrase.slice(0, charIndex);

  if (!deleting && charIndex < phrase.length) {
    charIndex += 1;
  } else if (deleting && charIndex > 0) {
    charIndex -= 1;
  } else if (!deleting) {
    deleting = true;
    window.setTimeout(typeLoop, 1000);
    return;
  } else {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  window.setTimeout(typeLoop, deleting ? 42 : 74);
};

typeLoop();

const tabContent = {
  discover: {
    kicker: "01 / Discovery",
    title: "Frame the right question before chasing the answer.",
    copy: "We align on the organization, constraints, audience, and strategic decision the project needs to support."
  },
  research: {
    kicker: "02 / Research",
    title: "Turn fragmented information into a usable picture.",
    copy: "Teams combine interviews, secondary research, competitor scans, and market mapping to build the evidence base."
  },
  strategy: {
    kicker: "03 / Strategy",
    title: "Pressure-test options and make tradeoffs visible.",
    copy: "We translate research into recommendations, decision criteria, risks, and the operating logic behind each path."
  },
  delivery: {
    kicker: "04 / Delivery",
    title: "Leave clients with clear next moves.",
    copy: "Final deliverables are designed to be presented, shared, and acted on after the project closes."
  }
};

document.querySelectorAll("[data-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.tab;
    const content = tabContent[key];
    if (!content || !stage) return;

    document.querySelectorAll("[data-tab]").forEach((button) => {
      button.classList.toggle("is-active", button === tab);
      button.setAttribute("aria-selected", String(button === tab));
    });

    stage.animate([
      { opacity: 0.55, transform: "translateY(10px)" },
      { opacity: 1, transform: "translateY(0)" }
    ], { duration: 360, easing: "ease-out" });

    const card = stage.querySelector(".stage-card");
    card.innerHTML = `
      <p class="stage-card__kicker">${content.kicker}</p>
      <h3>${content.title}</h3>
      <p>${content.copy}</p>
    `;
  });
});

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
      number.textContent = Math.round(target * eased).toString() + (target >= 20 ? "+" : "");
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    countObserver.unobserve(number);
  });
}, { threshold: 0.5 });

document.querySelectorAll("[data-count]").forEach((number) => countObserver.observe(number));

const parallaxBand = document.querySelector(".feature-band");
const setParallax = () => {
  if (!parallaxBand) return;
  const rect = parallaxBand.getBoundingClientRect();
  const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
  const clamped = Math.max(0, Math.min(progress, 1));
  parallaxBand.style.setProperty("--parallax", `${(clamped - 0.5) * -80}px`);
};

setParallax();
window.addEventListener("scroll", setParallax, { passive: true });
