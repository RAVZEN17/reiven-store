/* =========================================================
   REIVEN STORE — SCRIPT.JS (limpio, sin chips ni 3D)
   Enfoque: Performance + UX + Responsividad
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ===================== LOADER ===================== */
  const loader = document.getElementById("loader");
  const loaderText = document.getElementById("loader-text");
  const loaderBar = document.querySelector(".loader-bar");

  let progress = 0;
  const loaderInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 18) + 18; // rápido pero natural
    if (progress >= 100) progress = 100;

    loaderText.textContent = `Cargando ${progress}%`;
    loaderBar.style.width = progress + "%";

    if (progress === 100) {
      clearInterval(loaderInterval);
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 300);
      }, 200);
    }
  }, 120);

  /* ===================== NAV TOGGLE (MÓVIL) ===================== */
  const navToggle = document.querySelector(".nav-toggle");
  const topbarNav = document.getElementById("topbar-nav");

  if (navToggle && topbarNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = topbarNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });

    // cerrar al hacer click en un enlace
    topbarNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        topbarNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ===================== INTERSECTION OBSERVER ===================== */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(
    ".card, .benefit, .testimonial, .hero-content"
  ).forEach(el => revealObserver.observe(el));

  /* ===================== FILTRO POR CATEGORÍA ===================== */
  const categoryButtons = document.querySelectorAll(".category");
  const cards = document.querySelectorAll(".card");

  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;

      cards.forEach(card => {
        const match =
          category === "todos" || card.dataset.category === category;
        card.style.display = match ? "block" : "none";
      });
    });
  });

  /* ===================== BUSCADOR ===================== */
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const term = searchInput.value.toLowerCase();

      cards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = title.includes(term) ? "block" : "none";
      });
    });
  }

  /* ===================== ESTADOS DE CTAs HERO ===================== */
  const heroCtas = document.querySelectorAll("[data-cta]");
  const activateCta = (cta) => {
    heroCtas.forEach(btn => {
      if (btn === cta) {
        btn.classList.add("btn-active");
        btn.classList.remove("btn-inactive");
      } else {
        btn.classList.remove("btn-active");
        btn.classList.add("btn-inactive");
      }
    });
  };

  heroCtas.forEach(btn => {
    btn.addEventListener("click", () => activateCta(btn));
  });

  /* ===================== MODAL ===================== */
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalPlans = document.getElementById("modalPlans");
  const modalClose = document.getElementById("modalClose");
  const whatsappBtn = document.getElementById("whatsappBtn");

  // helper para formato de precio: S/ amarillo, $ verde
  const formatPrice = (soles, dollars) => {
    const pen = `<span class="pen">S/ ${soles}</span>`;
    const usd = dollars ? `<span class="usd">$${dollars}</span>` : "";
    return dollars ? `${pen} / ${usd}` : pen;
  };

  const openModal = (card) => {
    modalImg.src = card.dataset.img;
    modalImg.alt = card.dataset.product;
    modalTitle.textContent = card.dataset.product;
    modalDesc.textContent = card.dataset.description;

    modalPlans.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const plan = card.dataset[`plan${i}`];
      if (!plan) continue;

      const [label, solesRaw, dollarsRaw] = plan.split("|");
      const soles = solesRaw.replace(/[^\d.,]/g, "");
      const dollars = dollarsRaw ? dollarsRaw.replace(/[^0-9.,]/g, "") : "";
      modalPlans.insertAdjacentHTML("beforeend", `
        <div class="plan">
          <span class="label">${label}</span>
          <span class="price">${formatPrice(soles, dollars)}</span>
        </div>
      `);
    }

    whatsappBtn.href =
      `https://api.whatsapp.com/send?phone=51941797198&text=` +
      encodeURIComponent(`Hola, quiero comprar: ${card.dataset.product}`);

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    setTimeout(() => modal.setAttribute("aria-hidden", "false"), 50);
  };

  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
    modal.setAttribute("aria-hidden", "true");
  };

  cards.forEach(card => card.addEventListener("click", () => openModal(card)));
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.style.display === "flex") closeModal();
  });
});
