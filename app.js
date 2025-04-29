// --- SOUND BUTTONS LOGIC ---
const buttons = document.querySelectorAll("button[data-sound]");
const audios = document.querySelectorAll("audio");

buttons.forEach((button) => {
        button.addEventListener("click", () => {
                const id = button.getAttribute("data-sound");
                const audio = document.getElementById(id);

                // If the selected audio is already playing, pause it
                if (!audio.paused) {
                        audio.pause();
                        button.classList.remove("playing");
                        return;
                }

                // Pause all other sounds and remove their active state
                audios.forEach((a) => {
                        a.pause();
                        a.currentTime = 0;
                });
                buttons.forEach((btn) => btn.classList.remove("playing"));

                // Play the selected sound
                audio.currentTime = 0;
                audio.play();
            button.classList.add("playing");
            
            document.getElementById("playBtn").addEventListener("click", () => {
                    const audio = new Audio("sounds/forest.mp3");
                    audio.play();
            });

        });
});

// --- TIMER LOGIC ---
let timerInterval = null;

// Handle timer start
document.querySelector(".timer-button").addEventListener("click", () => {
        const timeDisplay = document.querySelector(".time");
        let [minutes, seconds] = timeDisplay.textContent.split(":").map(Number);

        // Prevent multiple intervals
        clearInterval(timerInterval);

        let totalSeconds = minutes * 60 + seconds;

        if (isNaN(totalSeconds) || totalSeconds <= 0) return;

        timerInterval = setInterval(() => {
                if (totalSeconds <= 0) {
                        clearInterval(timerInterval);
                        timeDisplay.textContent = "00:00";

                        // Stop all playing audio
                        document.querySelectorAll("audio").forEach((audio) => {
                                audio.pause();
                                audio.currentTime = 0;
                        });

                        // Reset button highlight
                        document.querySelectorAll("button[data-sound]").forEach(
                                (btn) => btn.classList.remove("playing")
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


