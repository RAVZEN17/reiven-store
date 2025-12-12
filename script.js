// ===== LOADER REAL =====
window.addEventListener("load", () => {

    const bar = document.querySelector(".loader-bar");
    const text = document.getElementById("loader-text");
    const loader = document.getElementById("loader");

    let progress = 0;

    const interval = setInterval(() => {

        if (progress < 100) {
            progress += Math.floor(Math.random() * 15) + 5;
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
            }, 500);
        }

    }, 300);
});


// ===== FILTRO DE CATEGORÍAS =====
const categoryButtons = document.querySelectorAll(".category");
const cards = document.querySelectorAll(".card");

categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        categoryButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const cat = btn.dataset.category;

        cards.forEach(card => {
            const cardCat = card.dataset.category;

            card.style.display =
                (cat === "todos" || cat === cardCat) ? "block" : "none";
        });
    });
});


// ===== BUSCADOR =====
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();

    cards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(term) ? "block" : "none";
    });
});


// ===== MODAL =====
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");

const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const whatsappBtn = document.getElementById("whatsappBtn");

// abrir modal
cards.forEach(card => {
    card.addEventListener("click", () => {

        const product = card.dataset.product;
        const price = card.dataset.price;

        modalTitle.textContent = product;
        modalPrice.textContent = "Precio: S/" + price;

        // enlace de WhatsApp
        whatsappBtn.href =
            `https://wa.me/51941797198?text=Hola,+quiero+información+sobre:+${encodeURIComponent(product)}`;

        modal.style.display = "flex";
    });
});

// cerrar modal
modalClose.onclick = () => modal.style.display = "none";
modal.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
};
