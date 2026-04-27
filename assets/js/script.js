/* =========================
   PAGE TRANSITION
========================= */
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // 👉 INTERNAL SECTION
    if (href && href.startsWith("#")) {
      e.preventDefault();

      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        document.body.classList.add("section-switch");

        setTimeout(() => {
          document.body.classList.remove("section-switch");
        }, 400);
      }
      return;
    }

    // 👉 SAME DOMAIN PAGE TRANSITION
    if (this.hostname === window.location.hostname) {
      e.preventDefault();

      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = this.href;
      }, 500);
    }
  });
});

/* =========================
   ELEMENT SELECTORS
========================= */
const reveals = document.querySelectorAll(".reveal");
const steps = document.querySelectorAll(".road-step");
const cards = document.querySelectorAll("#services .service-card");
const grid = document.querySelector(".services-premium");
const videos = document.querySelectorAll(".section-video");


/* =========================
   REVEAL FUNCTIONS
========================= */
function revealElements() {
  // 👉 Scroll reveal
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });

  // 👉 Roadmap stagger
  steps.forEach((step, index) => {
    if (step.getBoundingClientRect().top < window.innerHeight - 100) {
      setTimeout(() => {
        step.classList.add("active");
      }, index * 200);
    }
  });

  // 👉 Services wave animation
  // 👉 Services wave animation
  if (grid) {
    const columns = 4; // 🔥 force 4 cards per row

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();

      if (rect.top < window.innerHeight - 100) {
        if (!card.classList.contains("show")) {
          const row = Math.floor(index / columns);
          const col = index % columns;

          const delay = row * 250 + col * 120;

          setTimeout(() => {
            card.classList.add("show");
          }, delay);
        }
      }
    });
  }
}

/* =========================
   CARD SCALE EFFECT
========================= */
function scaleCards() {
  const center = window.innerHeight / 2;

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const distance = Math.abs(center - rect.top);

    if (distance < 150) {
      card.style.transform = "scale(1.05)";
    } else {
      card.style.transform = "scale(1)";
    }
  });
}

/* =========================
   VIDEO EFFECT
========================= */
function applyVideoEffects() {
  videos.forEach((video) => {
    const rect = video.parentElement.getBoundingClientRect();
    const visible = 1 - rect.top / window.innerHeight;
    const progress = Math.min(Math.max(visible, 0), 1);

    const brightness = 1 - progress * 0.4;
    const scale = 1 + progress * 0.15;

    video.style.filter = `brightness(${brightness})`;
    video.style.transform = `scale(${scale})`;
  });
}

/* =========================
   BACKGROUND GRADIENT
========================= */
function dynamicBackground() {
  const scroll = window.scrollY;
  document.body.style.background = `linear-gradient(${135 + scroll * 0.05}deg,#050816,#000)`;
}

/* =========================
   MAIN SCROLL HANDLER (OPTIMIZED)
========================= */
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      revealElements();
      scaleCards();
      applyVideoEffects();
      dynamicBackground();
      ticking = false;
    });
    ticking = true;
  }
});

/* =========================
   INITIAL LOAD
========================= */
window.addEventListener("load", () => {
  revealElements();
  applyVideoEffects();

  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 1200);
  }
});

/* =========================
   LOGO RESET
========================= */
const logo = document.querySelector(".logo-link");

if (logo) {
  logo.addEventListener("click", () => {
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.remove("active");
    });

    document.querySelectorAll(".service-card").forEach((card) => {
      card.classList.remove("show");
    });

    setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
    }, 400);
  });
}

/* =========================
   FLOATING KEYWORDS
========================= */
const keywords = [
  "SEO",
  "Backlinks",
  "Google Rank",
  "Traffic",
  "Leads",
  "Conversions",
  "Branding",
  "Growth",
  "Authority",
  "Analytics",
];

keywords.forEach((word) => {
  const span = document.createElement("span");

  span.textContent = word;
  span.style.position = "fixed";
  span.style.left = Math.random() * 100 + "vw";
  span.style.top = Math.random() * 100 + "vh";
  span.style.color = "#00ff88";
  span.style.opacity = "0.15";
  span.style.fontSize = "14px";
  span.style.pointerEvents = "none";
  span.style.zIndex = "-1";
  span.style.transition = "transform 10s linear";

  document.body.appendChild(span);

  setInterval(() => {
    span.style.transform = "translateY(-100vh)";
    setTimeout(() => {
      span.style.transform = "translateY(0)";
    }, 10000);
  }, 10000);
});
// SHOW CTA AFTER SCROLL
const floatingCTA = document.querySelector(".floating-cta");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    floatingCTA.style.opacity = "1";
    floatingCTA.style.transform = "translateY(0)";
  } else {
    floatingCTA.style.opacity = "0";
    floatingCTA.style.transform = "translateY(50px)";
  }
});
let shown = false;

document.addEventListener("mouseleave", (e) => {
  if (e.clientY < 0 && !shown) {
    shown = true;

    const popup = document.createElement("div");
    popup.className = "exit-popup";
    popup.innerHTML = `
      <div class="popup-box">
        <h3>Wait! 🚀</h3>
        <p>Get a FREE marketing strategy for your business.</p>
        <a href="https://wa.me/917358182759" target="_blank" class="btn whatsapp">
          Claim Now
        </a>
      </div>
    `;
    document.body.appendChild(popup);
  }
});