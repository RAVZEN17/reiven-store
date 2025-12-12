// ===== LOADER REAL =====
window.addEventListener("load", () => {

    const bar = document.querySelector(".loader-bar");
    const text = document.getElementById("loader-text");
    const loader = document.getElementById("loader");

    let progress = 0;

    const interval = setInterval(() => {
        if (progress < 100) {
            progress += Math.floor(Math.random() * 10) + 5;
            if (progress > 100) progress = 100;

            bar.style.width = progress + "%";

            if (progress < 100) text.textContent = "Cargando...";
        }

        if (progress === 100) {
            text.textContent = "Listo";

            clearInterval(interval);

            setTimeout(() => {
                loader.style.opacity = "0";
                setTimeout(() => loader.style.display = "none", 500);
            }, 700);
        }

    }, 300);
});
