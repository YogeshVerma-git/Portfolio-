// 1. Set footer year
document.getElementById("time").textContent = new Date().getFullYear();

// 2. Intro animation
function firstPageAnim() {
  const tl = gsap.timeline();
  tl.from("#nav", { y: '-10', opacity: 0, duration: 1.5, ease: Expo.easeInOut })
    .to(".boundingelem", { y: 0, ease: Expo.easeInOut, duration: 2, stagger: 0.2, delay: -1 })
    .from("#heroFooter", { y: -10, opacity: 0, duration: 1.5, delay: -1, ease: Expo.easeInOut });
}
firstPageAnim();

// 3. miniCircle follow + scale
function circleChaptaKro() {
  let xPrev = 0, yPrev = 0, timeout;
  const clamp = gsap.utils.clamp(0.8, 1.2);
  const miniCircle = document.querySelector("#miniCircle");

  window.addEventListener("mousemove", e => {
    const dx = e.clientX - xPrev, dy = e.clientY - yPrev;
    const xScale = clamp(1 + dx * 0.001), yScale = clamp(1 + dy * 0.001);
    xPrev = e.clientX; yPrev = e.clientY;

    miniCircle.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${xScale},${yScale})`;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      miniCircle.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1,1)`;
    }, 400);
  });
}
circleChaptaKro();

// 4. Cache miniCircle
const miniCircle = document.querySelector("#miniCircle");

// 5. elem hover & click logic
document.querySelectorAll(".elem").forEach(elem => {
  let rotate = 0, diffrot = 0;
  const img = elem.querySelector("img");

  // Attach click to the image itself
  img.addEventListener("click", () => {
    const link = img.dataset.link;
    if (link) window.open(link, "_blank");
  });

  elem.addEventListener("mousemove", e => {
    const rect = elem.getBoundingClientRect();
    const diffY = e.clientY - rect.top;
    diffrot = e.clientX - rotate;
    rotate = e.clientX;

    // Show and move the image
    gsap.to(img, {
      opacity: 1,
      ease: Power3.easeOut,
      top: diffY,
      left: e.clientX - rect.left,
      rotate: gsap.utils.clamp(-40, 40, diffrot * 0.5),
      display: "block"
    });

    // Enable clicking on the image
    img.style.pointerEvents = "all";

    // Style miniCircle inside .elem
    Object.assign(miniCircle.style, {
      width: "80px",
      height: "80px",
      backgroundColor: "rgba(117, 113, 113, 0.79)",
      opacity: "1",
      pointerEvents: "none", // keep the circle non-intercepting
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: "12px",
      textAlign: "center"
    });
    miniCircle.textContent = "Click";
  });

  elem.addEventListener("mouseleave", () => {
    // Hide image
    gsap.to(img, {
      opacity: 0,
      ease: Power3.easeOut,
      duration: 0.5,
      onComplete: () => img.style.display = "none"
    });
    img.style.pointerEvents = "none";

    // Revert miniCircle to default
    Object.assign(miniCircle.style, {
      width: "20px",
      height: "20px",
      backgroundColor: "#fff",
      opacity: "1",
      pointerEvents: "none",
      display: "block",
      color: "",
      fontSize: ""
    });
    miniCircle.textContent = "";
  });
});

// 6. Locomotive Scroll init
new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});
