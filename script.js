/* ============================= */
/* CURTAIN OPEN FUNCTION */
/* ============================= */

// function openInvitation(){

//   const intro = document.getElementById("intro");
//   const music = document.getElementById("bgMusic");
//   const curtain = document.getElementById("curtain");

//   // Open intro animation (if you already use it)
//   intro.classList.add("open");

//   // 🎭 Open curtain
//   curtain.classList.add("open");

//   // Remove intro after animation
//   setTimeout(() => {
//     intro.style.display = "none";
//   }, 2000);

//   // Remove curtain after slide finishes
//   setTimeout(() => {
//     curtain.style.display = "none";
//   }, 1700);

//   // Unlock scroll
//   document.body.style.overflow = "auto";

//   // Play music (mobile safe)
//   music.play().catch(() => {});
// }

// function openInvitation(){

//   const intro = document.getElementById("intro");
//   const music = document.getElementById("bgMusic");

//   // Slide curtains open
//   intro.classList.add("open");

//   // Hide intro after animation
//   setTimeout(() => {
//     intro.style.display = "none";
//   }, 1800);

//   // Unlock scroll
//   document.body.style.overflow = "auto";

//   // Play music
//   music.play().catch(() => {});
// }

// function openInvitation(){

//   const curtain = document.getElementById("curtain");
//   const music = document.getElementById("bgMusic");

//   curtain.classList.add("open");

//   setTimeout(() => {
//     curtain.remove();
//     document.body.style.overflow = "auto";
//   }, 1800);

//   music.play().catch(() => {});
// }

function openInvitation(){

  const enterText = document.querySelector('.enter-text');
  
  // 2. Hide it immediately
  enterText.style.display = 'none';

  const curtain = document.getElementById("curtain");
  const music = document.getElementById("bgMusic");

  curtain.classList.add("open");

  setTimeout(() => {
    launchConfetti();   // 🎉 trigger here
  }, 1200);

  setTimeout(() => {
    curtain.remove();
    document.body.style.overflow = "auto";
  }, 1800);

  music.play().catch(() => {});
}

/* ============================= */
/* MUSIC TOGGLE */
/* ============================= */

function toggleMusic(){
  const music = document.getElementById("bgMusic");

  if(music.paused){
    music.play();
  }else{
    music.pause();
  }
}

/* ============================= */
/* SCRATCH EFFECT FUNCTION */
/* ============================= */

function makeScratch(canvasId){

  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  let isDrawing = false;
  let revealed = false;

  let scratchedArea = 0;
  const brushSize = 30;

  function resizeCanvas(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#6e2a1e";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.globalCompositeOperation = "destination-out";
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function getPosition(e){
    const rect = canvas.getBoundingClientRect();
    return {
      x:(e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
      y:(e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    };
  }

  function scratch(e){
    if(!isDrawing || revealed) return;

    const pos = getPosition(e);

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, brushSize, 0, Math.PI * 2);
    ctx.fill();

    scratchedArea += Math.PI * brushSize * brushSize * 0.35;

    if(scratchedArea / (canvas.width * canvas.height) > 0.55){
      reveal();
    }
  }

  function reveal(){
    revealed = true;

    // unlock scroll
    document.body.classList.remove("no-scroll");

    canvas.style.transition = "opacity 0.8s ease";
    canvas.style.opacity = 0;

    setTimeout(()=>{
      canvas.style.display = "none";
    },800);
  }

  /* =========================
     DESKTOP EVENTS
  ========================== */

  canvas.addEventListener("mousedown", () => {
    isDrawing = true;
  });

  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
  });

  canvas.addEventListener("mousemove", scratch);

  /* =========================
     MOBILE EVENTS (FIXED)
  ========================== */

  canvas.addEventListener("touchstart", (e) => {
    document.body.classList.add("no-scroll"); // lock scroll
    isDrawing = true;
  }, { passive: false });

  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault(); // prevent scrolling
    scratch(e);
  }, { passive: false });

  canvas.addEventListener("touchend", () => {
    isDrawing = false;
  });

}

/* Initialize scratch for all 3 */
makeScratch("dayCanvas");
makeScratch("monthCanvas");
makeScratch("yearCanvas");

/* ============================= */
/* REAL-TIME COUNTDOWN */
/* ============================= */

const weddingDate = new Date("2026-04-01T18:00:00+02:00").getTime();

function updateCountdown(){
  const now = Date.now();
  const diff = weddingDate - now;

  if(diff <= 0){
    document.getElementById("days").innerText = "0";
    document.getElementById("hours").innerText = "0";
    document.getElementById("minutes").innerText = "0";
    document.getElementById("seconds").innerText = "0";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours.toString().padStart(2,'0');
  document.getElementById("minutes").innerText = minutes.toString().padStart(2,'0');
  document.getElementById("seconds").innerText = seconds.toString().padStart(2,'0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// function launchConfetti(){

//   const duration = 2000;
//   const end = Date.now() + duration;

//   (function frame(){
//     confetti({
//       particleCount: 4,
//       angle: 60,
//       spread: 55,
//       origin: { x: 0 }
//     });

//     confetti({
//       particleCount: 4,
//       angle: 120,
//       spread: 55,
//       origin: { x: 1 }
//     });

//     if (Date.now() < end) {
//       requestAnimationFrame(frame);
//     }
//   }());
// }

function launchConfetti(){

  const duration = 2000;
  const end = Date.now() + duration;

  (function frame(){

    confetti({
      particleCount: 5,
      spread: 60,
      startVelocity: 30,
      gravity: 0.8,
      ticks: 200,
      origin: { x: 0 },
      colors: ['#6e2a1e', '#d4af37', '#ffffff']
    });

     confetti({
      particleCount: 5,
      spread: 60,
      startVelocity: 30,
      gravity: 0.8,
      ticks: 200,
      origin: { x: 1 },
      colors: ['#6e2a1e', '#d4af37', '#ffffff']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }

  }());

}