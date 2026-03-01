// Page Transition
document.querySelectorAll("a").forEach(link => {
  if (link.hostname === window.location.hostname) {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href").startsWith("#")) return;
      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => window.location = this.href, 500);
    });
  }
});

// Scroll Reveal
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// Dynamic Gradient Shift
window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  document.body.style.background =
    `linear-gradient(${135 + scroll * .05}deg,#050816,#000)`;
});

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      applyVideoEffects();
      ticking = false;
    });
    ticking = true;
  }
});

function applyVideoEffects() {
  const videos = document.querySelectorAll(".section-video");

  videos.forEach(video => {
    const rect = video.parentElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const visible = 1 - (rect.top / windowHeight);
    const progress = Math.min(Math.max(visible, 0), 1);

    const brightness = 1 - (progress * 0.4);
    const scale = 1 + (progress * 0.15);

    video.style.filter = `brightness(${brightness})`;
    video.style.transform = `scale(${scale})`;
  });
}
// Cinematic Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1200);
});
// Hamburger Toggle
// const hamburger=document.querySelector(".hamburger");
// const navLinks=document.querySelector(".nav-links");

// if(hamburger){
//   hamburger.addEventListener("click",()=>{
//     navLinks.classList.toggle("active");
//     hamburger.classList.toggle("open");
//   });
// }

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
  "Analytics"
];

keywords.forEach((word, index) => {

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
    span.style.transform = `translateY(-100vh)`;
    setTimeout(() => {
      span.style.transform = `translateY(0)`;
    }, 10000);
  }, 10000);
});
// let rank = 27;
// const rankEl = document.getElementById("rank");

// if (rankEl) {
//   const interval = setInterval(() => {
//     if (rank > 1) {
//       rank--;
//       rankEl.textContent = rank;
//     } else {
//       clearInterval(interval);
//     }
//   }, 120);
// }