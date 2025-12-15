/* =========================================================
   REIVEN STORE — SCRIPT.JS
   Nivel: Producción / Premium
   Enfoque: Performance + UX + Escalabilidad
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

  /* ===================== HERO 3D ===================== */
  const hero3d = document.getElementById("hero3d");

  if (hero3d && window.matchMedia("(pointer:fine)").matches) {
    let rect = hero3d.getBoundingClientRect();

    window.addEventListener("mousemove", e => {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      hero3d.style.transform =
        `rotateY(${x * 12}deg) rotateX(${y * -12}deg)`;
    });

    window.addEventListener("resize", () => {
      rect = hero3d.getBoundingClientRect();
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
    ".card, .benefit, .testimonial, .hero-content, .hero-visual"
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

  /* ===================== MODAL ===================== */
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalPlans = document.getElementById("modalPlans");
  const modalClose = document.getElementById("modalClose");
  const whatsappBtn = document.getElementById("whatsappBtn");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      modalImg.src = card.dataset.img;
      modalImg.alt = card.dataset.product;
      modalTitle.textContent = card.dataset.product;
      modalDesc.textContent = card.dataset.description;

      modalPlans.innerHTML = "";
      for (let i = 1; i <= 5; i++) {
        const plan = card.dataset[`plan${i}`];
        if (!plan) continue;

        const [label, soles, dollars] = plan.split("|");
        modalPlans.innerHTML += `
          <div class="plan">
            <span>${label} – ${soles}</span>
            <strong>${dollars}</strong>
          </div>
        `;
      }

      whatsappBtn.href =
        `https://wa.me/51941797198?text=` +
        encodeURIComponent(`Hola, quiero comprar: ${card.dataset.product}`);

      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  };

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

});
