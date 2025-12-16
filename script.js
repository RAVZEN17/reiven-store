/* =========================================================
   REIVEN STORE — SCRIPT.JS
   Optimizado, limpio, funcional
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // === LOADER ===
  const loader = document.getElementById("loader");
  const loaderText = document.getElementById("loader-text");
  const loaderBar = document.querySelector(".loader-bar");

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 15;
    if (progress >= 100) progress = 100;

    loaderText. textContent = `Cargando ${progress}%`;
    loaderBar. style.width = `${progress}%`;

    if (progress === 100) {
      clearInterval(loadInterval);
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 300);
      }, 200);
    }
  }, 100);

  // === NAV TOGGLE ===
  const navToggle = document.querySelector(".nav-toggle");
  const topbarNav = document. getElementById("topbar-nav");

  if (navToggle && topbarNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = topbarNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    topbarNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        topbarNav.classList. remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // === CATEGORY FILTER ===
  const categoryBtns = document. querySelectorAll(". category");
  const cards = document.querySelectorAll(".card");

  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach(b => b.classList. remove("active"));
      btn.classList. add("active");

      const cat = btn.dataset.category;
      cards.forEach(card => {
        const show = cat === "todos" || card.dataset.category === cat;
        card.style.display = show ? "block" : "none";
      });
    });
  });

  // === SEARCH ===
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput. addEventListener("input", () => {
      const term = searchInput.value.toLowerCase();
      cards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = title.includes(term) ? "block" : "none";
      });
    });
  }

  // === MODAL ===
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalPlans = document. getElementById("modalPlans");
  const modalClose = document.getElementById("modalClose");
  const whatsappBtn = document.getElementById("whatsappBtn");

  const formatPrice = (soles, usd) => {
    const penSpan = `<span class="pen">S/ ${soles}</span>`;
    const usdSpan = usd ? ` / <span class="usd">$${usd}</span>` : "";
    return penSpan + usdSpan;
  };

  const openModal = (card) => {
    modalImg.src = card. dataset.img;
    modalImg.alt = card. dataset.product;
    modalTitle.textContent = card.dataset.product;
    modalDesc. textContent = card. dataset.description;

    modalPlans.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const plan = card.dataset[`plan${i}`];
      if (! plan) continue;
      const [label, soles, usd] = plan.split("|");
      modalPlans.innerHTML += `
        <div class="plan">
          <span class="label">${label}</span>
          <span class="price">${formatPrice(soles, usd)}</span>
        </div>
      `;
    }

    whatsappBtn.href = `https://api.whatsapp. com/send?phone=51941797198&text=${encodeURIComponent(`Hola, quiero comprar:  ${card.dataset. product}`)}`;

    modal.style.display = "flex";
    document.body.style. overflow = "hidden";
  };

  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  };

  cards.forEach(card => card.addEventListener("click", () => openModal(card)));
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

});
