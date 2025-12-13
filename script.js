/* ================= LOADER 2.4s ================= */

let loader = document.getElementById("loader");
let loaderText = document.getElementById("loader-text");
let loaderBar = document.querySelector(".loader-bar");

let progress = 0;

let interval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 6; // sube 6–14%

    if (progress >= 100) {
        progress = 100;
        loaderText.textContent = "Cargando 100%";
        clearInterval(interval);

        setTimeout(() => {
            loaderText.textContent = "Listo";
            loader.style.opacity = "0";
            setTimeout(() => loader.style.display = "none", 350);
        }, 400);

    } else {
        loaderText.textContent = `Cargando ${progress}%`;
    }

    loaderBar.style.width = progress + "%";
}, 180);



/* ================= FILTRO POR CATEGORÍAS ================= */

const categoryButtons = document.querySelectorAll(".category");
const cards = document.querySelectorAll(".card");

categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        categoryButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        let category = btn.dataset.category;

        cards.forEach(card => {
            let c = card.dataset.category;
            card.style.display = (category === "todos" || category === c)
                ? "block"
                : "none";
        });
    });
});



/* ================= BUSCADOR ================= */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    let term = searchInput.value.toLowerCase();

    cards.forEach(card => {
        let title = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = title.includes(term) ? "block" : "none";
    });
});



/* ================= MODAL ================= */

const modalWindow = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPlans = document.getElementById("modalPlans");
const modalClose = document.getElementById("modalClose");
const whatsappBtn = document.getElementById("whatsappBtn");

cards.forEach(card => {
    card.addEventListener("click", () => {

        let img = card.dataset.img;
        let name = card.dataset.product;
        let desc = card.dataset.description;

        modalImg.src = img;
        modalTitle.textContent = name;
        modalDesc.textContent = desc;

        modalPlans.innerHTML = "";

        for (let i = 1; i <= 5; i++) {
            let plan = card.dataset[`plan${i}`];
            if (!plan) continue;

            let [label, soles, dollars] = plan.split("|");

            modalPlans.innerHTML += `
                <div class="plan">
                    <span>${label} – ${soles}</span>
                    <strong>${dollars}</strong>
                </div>
            `;
        }

        whatsappBtn.href = `https://wa.me/51941797198?text=Hola,+quiero+comprar:+${encodeURIComponent(name)}`;

        modalWindow.style.display = "flex";
    });
});

modalClose.onclick = () => modalWindow.style.display = "none";

modalWindow.onclick = e => {
    if (e.target === modalWindow) modalWindow.style.display = "none";
};
