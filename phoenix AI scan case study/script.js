/* =========================================================
   PhoenixAIScan Case Study – Interactive Animations
   Startup / Gen-Z / Glass UI Effects
   ========================================================= */

/* ---------- Scroll Reveal Animation ---------- */
const cards = document.querySelectorAll(".card");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 120);
      }
    });
  },
  { threshold: 0.18 }
);

cards.forEach(card => revealObserver.observe(card));


/* ---------- Navbar Glow on Scroll ---------- */
const topbar = document.querySelector(".topbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    topbar.style.boxShadow = "0 0 25px rgba(99, 102, 241, 0.5)";
  } else {
    topbar.style.boxShadow = "none";
  }
});


/* ---------- Floating Blob Parallax Effect ---------- */
const blobs = document.querySelectorAll(".blob");

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;

  blobs.forEach((blob, i) => {
    const speed = (i + 1) * 30;
    blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});


/* ---------- Glass Card Tilt (3D Hover Effect) ---------- */
cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 25;
    const rotateY = (x - centerX) / 25;

    card.style.transform = `
      scale(1.03)
      rotateX(${ -rotateX }deg)
      rotateY(${ rotateY }deg)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1) rotateX(0) rotateY(0)";
  });
});


/* ---------- Scroll To Top Button ---------- */
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = "↑";
scrollBtn.className = "scroll-top";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* ---------- Add Scroll Button Styles Dynamically ---------- */
const style = document.createElement("style");
style.innerHTML = `
.scroll-top {
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #22d3ee);
  border: none;
  color: white;
  font-size: 22px;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  box-shadow: 0 0 25px rgba(99,102,241,0.6);
  z-index: 200;
}

.scroll-top.show {
  opacity: 1;
  pointer-events: auto;
}

.scroll-top:hover {
  transform: scale(1.15);
  box-shadow: 0 0 40px rgba(34,211,238,0.9);
}
`;
document.head.appendChild(style);


/* ---------- Section Fade Highlight (Active Section Effect) ---------- */
const sections = document.querySelectorAll(".card");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.borderColor = "rgba(99, 102, 241, 0.6)";
      } else {
        entry.target.style.borderColor = "rgba(255, 255, 255, 0.15)";
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));


/* ---------- Subtle Page Load Animation ---------- */
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 1s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
