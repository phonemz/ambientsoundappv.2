document.addEventListener("DOMContentLoaded", () => {
        const buttons = document.querySelectorAll("button[data-sound]");
        const audios = document.querySelectorAll("audio");

        buttons.forEach((button) => {
                button.addEventListener("click", () => {
                        const id = button.getAttribute("data-sound");
                        const audio = document.getElementById(id);

                        // Check if audio is loaded before playing
                        if (audio.readyState >= 3) {
                                // 3: HAVE_FUTURE_DATA
                                if (audio.paused) {
                                    audio.currentTime = 0;
                                    audio.loop = true;
                                        audio.play().catch((err) => {
                                                console.error(
                                                        "Playback failed:",
                                                        err
                                                );
                                        });
                                        button.classList.add("playing");
                                } else {
                                        audio.pause();
                                        audio.currentTime = 0;
                                        button.classList.remove("playing");
                                }
                        } else {
                                console.log(
                                        `Audio ${id} is not ready. Trying to load...`
                                );
                            audio.load(); // Load the audio
                        }
                });
        });

        // --- TIMER LOGIC ---
        let timerInterval = null;

        document.querySelector(".timer-button").addEventListener(
                "click",
                () => {
                        const timeDisplay = document.querySelector(".time");
                        let [minutes, seconds] = timeDisplay.textContent
                                .split(":")
                                .map(Number);

                        clearInterval(timerInterval);

                        let totalSeconds = minutes * 60 + seconds;

                        if (isNaN(totalSeconds) || totalSeconds <= 0) return;

                        timerInterval = setInterval(() => {
                                if (totalSeconds <= 0) {
                                        clearInterval(timerInterval);
                                        timeDisplay.textContent = "00:00";

                                        // Stop all playing audio
                                        audios.forEach((audio) => {
                                                audio.pause();
                                                audio.currentTime = 0;
                                        });

                                        // Reset button highlight
                                        buttons.forEach((btn) =>
                                                btn.classList.remove("playing")
                                        );
                                        return;
                                }

                                totalSeconds--;
                                const min = String(
                                        Math.floor(totalSeconds / 60)
                                ).padStart(2, "0");
                                const sec = String(totalSeconds % 60).padStart(
                                        2,
                                        "0"
                                );
                                timeDisplay.textContent = `${min}:${sec}`;
                        }, 1000);
                }
        );
});
