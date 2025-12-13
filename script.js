/* ==========================================================
   LOADER — PORCENTAJE REAL + ACELERADO + SUAVE
========================================================== */

let loader = document.getElementById("loader");
let loaderText = document.getElementById("loader-text");
let loaderBar = document.querySelector(".loader-bar");

let progress = 0;

let interval = setInterval(() => {
    progress += Math.floor(Math.random() * 10) + 8; // sube 8%–18%

    if (progress >= 100) {
        progress = 100;
        loaderText.textContent = "Cargando 100%";
        clearInterval(interval);

        // pequeña pausa final elegante
        setTimeout(() => {
            loaderText.textContent = "Listo";
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 350);

        }, 250); // loader más rápido por tu petición

    } else {
        loaderText.textContent = `Cargando ${progress}%`;
    }

    loaderBar.style.width = progress + "%";
}, 120); // intervalo más corto para rapidez



/* ==========================================================
   CATEGORÍAS — FILTRO PROFESIONAL Y RÁPIDO
========================================================== */

const categoryButtons = document.querySelectorAll(".category");
const cards = document.querySelectorAll(".card");

categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        categoryButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        let category = btn.dataset.category;

        cards.forEach(card => {
            let cardCat = card.dataset.category;

            if (category === "todos" || cardCat === category) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});



/* ==========================================================
   BUSCADOR — FUNCIONAL Y SUAVE
========================================================== */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    let term = searchInput.value.toLowerCase();

    cards.forEach(card => {
        let title = card.querySelector("h3").textContent.toLowerCase();

        card.style.display = title.includes(term)
            ? "block"
            : "none";
    });
});



/* ==========================================================
   MODAL — ZOOM, BLUR, PRECIOS Y WHATSAPP
========================================================== */

const modalWindow = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPlans = document.getElementById("modalPlans");
const modalClose = document.getElementById("modalClose");
const whatsappBtn = document.getElementById("whatsappBtn");

cards.forEach(card => {
    card.addEventListener("click", () => {

        // Datos del producto
        let img = card.dataset.img;
        let name = card.dataset.product;
        let desc = card.dataset.description;

        // Setear contenido del modal
        modalImg.src = img;
        modalTitle.textContent = name;
        modalDesc.textContent = desc;

        // Limpiar planes anteriores
        modalPlans.innerHTML = "";

        // Agregar planes dinámicos (plan1, plan2, plan3…)
        for (let i = 1; i <= 5; i++) {
            let rawPlan = card.dataset[`plan${i}`];
            if (!rawPlan) continue;

            let [texto, soles, dolares] = rawPlan.split("|");

            modalPlans.innerHTML += `
                <div class="plan">
                    <span>${texto} – ${soles}</span>
                    <strong>${dolares}</strong>
                </div>
            `;
        }

        // Botón WhatsApp — tu número fijo
        whatsappBtn.href =
            `https://wa.me/51941797198?text=Hola,+quiero+comprar:+${encodeURIComponent(name)}`;

        modalWindow.style.display = "flex";
    });
});

// Cerrar modal con X
modalClose.onclick = () => {
    modalWindow.style.display = "none";
};

// Cerrar modal tocando fuera del recuadro
modalWindow.onclick = (e) => {
    if (e.target === modalWindow) {
        modalWindow.style.display = "none";
    }
};



/* ==========================================================
   FIN DEL SCRIPT — YA NO NECESITAS TOCAR JS
========================================================== */
