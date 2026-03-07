// ================= FADE-IN ON SCROLL =================
const faders = document.querySelectorAll(".fade-in");

const appearOptions = { threshold: 0.18 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach((fader) => appearOnScroll.observe(fader));

// ================= IMAGE MODAL =================
const imgModal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const imgCloseBtn = imgModal?.querySelector(".close");

document.querySelectorAll(".card img, .media-card img").forEach((img) => {
  img.addEventListener("click", (e) => {
    e.stopPropagation();
    imgModal.style.display = "flex";
    imgModal.setAttribute("aria-hidden", "false");
    modalImg.src = img.src;
  });
});

imgCloseBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  imgModal.style.display = "none";
  imgModal.setAttribute("aria-hidden", "true");
});

imgModal?.addEventListener("click", () => {
  imgModal.style.display = "none";
  imgModal.setAttribute("aria-hidden", "true");
});

// ================= INLINE VIDEO PLAY (NO MODAL) =================
const videoButtons = document.querySelectorAll("[data-yt]");

function stopAllInlineVideos() {
  videoButtons.forEach((btn) => {
    const wrap = btn.querySelector(".inline-player");
    const frame = wrap?.querySelector("iframe");
    if (frame) frame.src = ""; // stop playback
    if (wrap) wrap.hidden = true;
    btn.classList.remove("is-playing");
  });
}

videoButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const id = btn.dataset.yt;
    if (!id) return;

    const wrap = btn.querySelector(".inline-player");
    const frame = wrap?.querySelector("iframe");
    if (!wrap || !frame) return;

    const alreadyPlaying = btn.classList.contains("is-playing");

    // stop everything first
    stopAllInlineVideos();

    // toggle off if same one was playing
    if (alreadyPlaying) return;

    // play this one inline
    wrap.hidden = false;
    btn.classList.add("is-playing");
    frame.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  });
});

// ESC closes image modal + stops any playing inline video
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  if (imgModal?.style.display === "block") {
    imgModal.style.display = "none";
    imgModal.setAttribute("aria-hidden", "true");
  }

  stopAllInlineVideos();
});
