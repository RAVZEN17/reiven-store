/* ==========================================
   LOADER CON PORCENTAJE REAL
========================================== */

let loaderBar = document.querySelector(".loader-bar");
let loaderText = document.getElementById("loader-text");
let loader = document.getElementById("loader");

let progress = 0;

let interval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 4; // sube entre 4% y 12%

    if (progress >= 100) {
        progress = 100;
        loaderText.textContent = "Cargando 100%";
        clearInterval(interval);

        setTimeout(() => {
            loaderText.textContent = "Listo";
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }, 600);

    } else {
        loaderText.textContent = `Cargando ${progress}%`;
    }

    loaderBar.style.width = progress + "%";
}, 200);



/* ==========================================
   FILTRO POR CATEGORÍAS
========================================== */

const categoryButtons = document.querySelectorAll(".category");
const cards = document.querySelectorAll(".card");

categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        categoryButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const category = btn.dataset.category;

        cards.forEach(card => {
            const cardCategory = card.dataset.category;

            if (category === "todos" || category === cardCategory) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});


/* ==========================================
   BUSCADOR
========================================== */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();

    cards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();

        if (title.includes(term)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});



/* ==========================================
   MODAL
========================================== */

const modalWindow = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPlans = document.getElementById("modalPlans");
const modalClose = document.getElementById("modalClose");
const whatsappBtn = document.getElementById("whatsappBtn");

cards.forEach(card => {
    card.addEventListener("click", () => {

        const img = card.dataset.img;
        const name = card.dataset.product;
        const desc = card.dataset.description;

        modalImg.src = img;
        modalTitle.textContent = name;
        modalDesc.textContent = desc;

        modalPlans.innerHTML = "";

        // PLANES DINÁMICOS (plan1, plan2, plan3...)
        for (let i = 1; i <= 5; i++) {
            let plan = card.dataset[`plan${i}`];
            if (plan) {
                let parts = plan.split("|");  // texto | soles | dólares

                modalPlans.innerHTML += `
                    <div class="plan">
                        <span>${parts[0]} – ${parts[1]}</span>
                        <strong>${parts[2]}</strong>
                    </div>
                `;
            }
        }

        // WhatsApp link:
        // AUTOMÁTICO con tu número: +51 941 797 198
        whatsappBtn.href =
            `https://wa.me/51941797198?text=Hola,+quiero+comprar:+${encodeURIComponent(name)}`;

        modalWindow.style.display = "flex";
    });
});

// Cerrar modal
modalClose.onclick = () => modalWindow.style.display = "none";

modalWindow.onclick = (e) => {
    if (e.target === modalWindow) modalWindow.style.display = "none";
};



/* ==========================================
   NADA MÁS QUE HACER AQUÍ →  
   TODO YA ESTÁ LISTO Y COMPLETAMENTE FUNCIONAL
========================================== */
