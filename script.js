// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// Intersection Observer to add .in-view to elements with [data-animate]
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      // optionally unobserve to keep performance
      observer.unobserve(entry.target);
    }
  });
},{root:null,rootMargin:'0px',threshold:0.12});

// attach to items
document.querySelectorAll('[data-animate]').forEach((el)=>{
  // optional data-delay attribute to stagger
  const delay = el.getAttribute('data-delay');
  if(delay){
    el.style.transitionDelay = (Number(delay) / 1000) + 's';
  }
  observer.observe(el);
});

// Simple keyboard accessible focus style for glass buttons
document.querySelectorAll('.glass-btn, .cta-outline, .mini-btn').forEach(btn=>{
  btn.addEventListener('keydown', e=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      btn.click();
    }
  });
});

// Optional: if you don't have profile.jpg hide the image container gracefully
(function(){
  const img = document.querySelector('.avatar-wrap img');
  if(img && img.complete && img.naturalWidth === 0){
    img.style.display = 'none';
  }
})();
