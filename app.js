const buttons = document.querySelectorAll("button[data-sound]");
const audios = document.querySelectorAll("audio");

buttons.forEach((button) => {
        button.addEventListener("click", () => {
                const id = button.getAttribute("data-sound");
                const audio = document.getElementById(id);

                // Pause all others
                audios.forEach((a) => {
                        if (a !== audio) {
                                a.pause();
                                a.currentTime = 0;
                        }
                });

                // Toggle current audio
                if (audio.paused) {
                        audio.currentTime = 0;
                        audio.play().catch((err) =>
                                console.error("Playback failed:", err)
                        );
                        buttons.forEach((btn) =>
                                btn.classList.remove("playing")
                        );
                        button.classList.add("playing");
                } else {
                        audio.pause();
                        button.classList.remove("playing");
                }
        });
});

// --- TIMER LOGIC ---
let timerInterval = null;

document.querySelector(".timer-button").addEventListener("click", () => {
        const timeDisplay = document.querySelector(".time");
        let [minutes, seconds] = timeDisplay.textContent.split(":").map(Number);

        clearInterval(timerInterval);

        let totalSeconds = minutes * 60 + seconds;

        if (isNaN(totalSeconds) || totalSeconds <= 0) return;

        timerInterval = setInterval(() => {
                if (totalSeconds <= 0) {
                        clearInterval(timerInterval);
                        timeDisplay.textContent = "00:00";

                        // Stop all audio
                        audios.forEach((audio) => {
                                audio.pause();
                                audio.currentTime = 0;
                        });
                        buttons.forEach((btn) =>
                                btn.classList.remove("playing")
                        );
                        return;
                }

                totalSeconds--;
                const min = String(Math.floor(totalSeconds / 60)).padStart(
                        2,
                        "0"
                );
                const sec = String(totalSeconds % 60).padStart(2, "0");
                timeDisplay.textContent = `${min}:${sec}`;
        }, 1000);
});
