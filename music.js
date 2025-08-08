// Load sound via <audio> tag
const audioElement = document.querySelector("audio");
const audioCtx = new AudioContext();
const track = audioCtx.createMediaElementSource(audioElement);

// Player controls and attributes
const playButton = document.querySelector(".player-play-btn");
const playIcon = playButton.querySelector(".player-icon-play");
const pauseIcon = playButton.querySelector(".player-icon-pause");
const progress = document.querySelector(".player-progress");
const progressFilled = document.querySelector(".player-progress-filled");
const playerCurrentTime = document.querySelector(".player-time-current");
const playerDuration = document.querySelector(".player-time-duration");
const volumeControl = document.querySelector(".player-volume");

window.addEventListener("load", () => {
  // Set times after page load
  setTimes();

  // Update progress bar and time values as audio plays
  audioElement.addEventListener("timeupdate", () => {
    progressUpdate();
    setTimes();
  });

  // Play button toggle with mobile compatibility
  playButton.addEventListener("click", () => {
    // Ensure AudioContext is resumed for mobile autoplay restrictions
    if (audioCtx.state === "suspended") {
      audioCtx.resume().then(() => {
        console.log("AudioContext resumed");
      });
    }

    // Play or pause track depending on state
    if (playButton.dataset.playing === "false") {
      audioElement.play().catch((error) => {
        console.error("Playback failed:", error);
      });
      playButton.dataset.playing = "true";
      playIcon.classList.add("hidden");
      pauseIcon.classList.remove("hidden");
    } else if (playButton.dataset.playing === "true") {
      audioElement.pause();
      playButton.dataset.playing = "false";
      pauseIcon.classList.add("hidden");
      playIcon.classList.remove("hidden");
    }
  });

  // Reset player when track ends
  audioElement.addEventListener("ended", () => {
    playButton.dataset.playing = "false";
    pauseIcon.classList.add("hidden");
    playIcon.classList.remove("hidden");
    progressFilled.style.flexBasis = "0%";
    audioElement.currentTime = 0;
  });

  // Volume control
  const gainNode = audioCtx.createGain();
  volumeControl.addEventListener("input", () => {
    gainNode.gain.value = volumeControl.value;
  });
  track.connect(gainNode).connect(audioCtx.destination);

  // Display currentTime and duration
  function setTimes() {
    playerCurrentTime.textContent = new Date(audioElement.currentTime * 1000)
      .toISOString()
      .substr(11, 8);
    playerDuration.textContent = isNaN(audioElement.duration)
      ? "00:00"
      : new Date(audioElement.duration * 1000).toISOString().substr(11, 8);
  }

  // Update player timeline progress visually
  function progressUpdate() {
    const percent = (audioElement.currentTime / audioElement.duration) * 100 || 0;
    progressFilled.style.flexBasis = `${percent}%`;
  }

  // Scrub player timeline with touch support
  let isScrubbing = false;

  function scrub(event) {
    const rect = progress.getBoundingClientRect();
    const scrubTime =
      ((event.type.includes("touch") ? event.touches[0].clientX : event.clientX) - rect.left) /
      rect.width *
      audioElement.duration;
    audioElement.currentTime = Math.min(Math.max(0, scrubTime), audioElement.duration);
  }

  // Add event listeners for both mouse and touch
  progress.addEventListener("click", scrub);
  progress.addEventListener("mousedown", () => (isScrubbing = true));
  progress.addEventListener("mousemove", (e) => isScrubbing && scrub(e));
  progress.addEventListener("mouseup", () => (isScrubbing = false));
  progress.addEventListener("mouseleave", () => (isScrubbing = false));

  progress.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent default touch behavior
    isScrubbing = true;
    scrub(e);
  });
  progress.addEventListener("touchmove", (e) => isScrubbing && scrub(e));
  progress.addEventListener("touchend", () => (isScrubbing = false));
  progress.addEventListener("touchcancel", () => (isScrubbing = false));

  // Track credit: Outfoxing the Fox by Kevin MacLeod under Creative Commons
}, false);