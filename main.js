/* ============================================================
   LUXE INVITATION — js/main.js (Landing Page)
   Vanilla JS. Tidak ada framework. Semua konten dinamis
   (koleksi, fitur, harga, FAQ) dirender dari js/config.js.
   ============================================================ */
(function () {
  "use strict";
  const C = window.LUXE_CONFIG;
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
  }

  /* ---------- Lucide icons ---------- */
  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  /* ---------- Navbar: scrolled state + mobile ---------- */
  const navbar = $("#navbar");
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("active", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  });
  $$("#navLinks a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* Smooth scroll untuk semua link [data-nav] */
  $$("[data-nav]").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    a.addEventListener("click", (e) => {
      const target = $(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", href);
    });
  });

  /* ---------- Parallax ringan pada hero ---------- */
  const heroBg = $(".hero-bg");
  if (heroBg && !reducedMotion) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (y < window.innerHeight) heroBg.style.transform = "translateY(" + y * 0.22 + "px)";
    }, { passive: true });
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
    }),
    { threshold: 0.14 }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- Render: Koleksi ---------- */
  const collectionGrid = $("#collectionGrid");
  collectionGrid.innerHTML = C.themes.map((t) => `
    <article class="collection-card reveal" data-theme="${t.id}">
      <div class="cc-preview">
        <span class="cc-tag">${t.tag}</span>
        <div class="cc-preview-inner" style="background:${t.bg};color:${t.ink}">
          <span class="cc-eyebrow" style="color:${t.accent}">The Wedding Of</span>
          <p class="cc-names">Aditya<span>&amp;</span>Nabila</p>
          <span class="cc-line" style="background:${t.accent}"></span>
          <span class="cc-date">20 . 12 . 2026</span>
        </div>
      </div>
      <div class="cc-body">
        <h3>${t.name}</h3>
        <p>${t.desc}</p>
        <div class="cc-actions">
          <a class="btn btn-ghost-dark" href="invitation.html?to=Tamu%20Undangan&theme=${t.id}">Lihat Demo</a>
          <button class="btn btn-gold" data-order data-theme-link="${t.id}">Pilih Tema</button>
        </div>
      </div>
    </article>`).join("");
  $$(".collection-card .reveal, .collection-card").forEach((el) => io.observe(el));

  /* ---------- Render: Fitur ---------- */
  $("#featureGrid").innerHTML = C.features.map((f, i) => `
    <div class="feature-card reveal ${i % 4 === 1 ? "delay-1" : i % 4 === 2 ? "delay-2" : i % 4 === 3 ? "delay-3" : ""}">
      <div class="feature-icon"><i data-lucide="${f.icon}" aria-hidden="true"></i></div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>`).join("");
  $$(".feature-card").forEach((el) => io.observe(el));

  /* ---------- Render: Harga ---------- */
  $("#pricingGrid").innerHTML = C.packages.map((p, i) => `
    <div class="price-card reveal ${p.popular ? "popular" : ""} ${i === 1 ? "delay-1" : i === 2 ? "delay-2" : ""}">
      ${p.popular ? '<span class="popular-badge">Paling Populer</span>' : ""}
      <span class="price-name">${p.name}</span>
      <p class="price-value"><sup>Rp</sup>${p.price.toLocaleString("id-ID")}</p>
      <p class="price-period">${p.period}</p>
      <ul>${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
      <button class="btn ${p.popular ? "btn-gold" : "btn-dark"}" data-order data-package-link="${p.id}">Pilih Paket</button>
    </div>`).join("");
  $$(".price-card").forEach((el) => io.observe(el));

  /* ---------- FAQ accordion ---------- */
  $$(".faq-item").forEach((item) => {
    const btn = $(".faq-q", item);
    const ans = $(".faq-a", item);
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      $$(".faq-item.open").forEach((o) => {
        o.classList.remove("open");
        $(".faq-a", o).style.maxHeight = null;
        $(".faq-q", o).setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        ans.style.maxHeight = ans.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Preview interaktif ---------- */
  let currentTheme = C.themes[0].id;
  const pillsWrap = $("#themePills");
  pillsWrap.innerHTML = C.themes.map((t, i) => `
    <button class="theme-pill ${i === 0 ? "active" : ""}" role="tab" aria-selected="${i === 0}" data-pill="${t.id}">
      <span class="dot" style="background:${t.accent}"></span>${t.name}
    </button>`).join("");

  function applyTheme(id) {
    const t = C.themes.find((x) => x.id === id) || C.themes[0];
    currentTheme = t.id;
    [$("#pvScreen"), $("#pvDesktopBody")].forEach((el) => {
      if (!el) return;
      el.style.setProperty("--pv-bg", t.bg);
      el.style.setProperty("--pv-ink", t.ink);
      el.style.setProperty("--pv-accent", t.accent);
    });
    $("#pvThemeName").textContent = t.name;
    $("#pvDThemeName").textContent = t.name;
    $("#pvOpenDemo").href = "invitation.html?to=Tamu%20Undangan&theme=" + t.id;
    $("#pvChooseTheme").dataset.themeLink = t.id;
    $$(".theme-pill").forEach((p) => {
      const on = p.dataset.pill === t.id;
      p.classList.toggle("active", on);
      p.setAttribute("aria-selected", String(on));
    });
  }
  pillsWrap.addEventListener("click", (e) => {
    const pill = e.target.closest(".theme-pill");
    if (pill) applyTheme(pill.dataset.pill);
  });
  applyTheme(currentTheme);

  /* Toggle smartphone / desktop */
  const pvPhone = $("#pvPhone"), pvDesktop = $("#pvDesktop");
  function setMode(desktop) {
    pvPhone.classList.toggle("hidden", desktop);
    pvDesktop.classList.toggle("hidden", !desktop);
    $("#modePhone").classList.toggle("active", !desktop);
    $("#modeDesktop").classList.toggle("active", desktop);
    $("#modePhone").setAttribute("aria-selected", String(!desktop));
    $("#modeDesktop").setAttribute("aria-selected", String(desktop));
  }
  $("#modePhone").addEventListener("click", () => setMode(false));
  $("#modeDesktop").addEventListener("click", () => setMode(true));

  /* ---------- Footer: kontak & tahun ---------- */
  const waBase = "https://wa.me/" + C.whatsapp;
  $("#footerWa").href = waBase;
  $("#footerWa2").href = waBase;
  $("#footerIg").href = C.instagram;
  $("#footerIg2").href = C.instagram;
  $("#footerMail").href = "mailto:" + C.email;
  $("#year").textContent = new Date().getFullYear();

  /* ============================================================
     MODAL PEMESANAN
     ============================================================ */
  const modal = $("#orderModal");
  const form = $("#orderForm");
  const errEl = $("#orderError");

  /* Isi pilihan tema & paket dari config */
  $("#oTheme").innerHTML = C.themes.map((t) => `<option value="${t.id}">${t.name}</option>`).join("");
  $("#oPackage").innerHTML = C.packages.map((p) => `<option value="${p.id}">${p.name} — ${rupiah(p.price)}</option>`).join("");

  function openModal(themeId, packageId) {
    if (themeId) $("#oTheme").value = themeId;
    if (packageId) $("#oPackage").value = packageId;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    renderSummary();
    setTimeout(() => $("#oGroom").focus(), 250);
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    errEl.textContent = "";
  }

  /* Semua pemicu [data-order] membuka modal; dataset tema/paket otomatis terisi */
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-order]");
    if (!trigger) return;
    e.preventDefault();
    openModal(trigger.dataset.themeLink || null, trigger.dataset.packageLink || null);
  });
  $("#orderClose").addEventListener("click", closeModal);
  $("#orderBack").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });

  /* Ringkasan pemesanan live */
  function renderSummary() {
    const pkg = C.packages.find((p) => p.id === $("#oPackage").value) || C.packages[0];
    const thm = C.themes.find((t) => t.id === $("#oTheme").value) || C.themes[0];
    const v = (id) => $(id).value.trim();
    const rows = [
      ["Mempelai", v("#oGroom") && v("#oBride") ? v("#oGroom") + " & " + v("#oBride") : "—"],
      ["Panggilan", v("#oGroomNick") && v("#oBrideNick") ? v("#oGroomNick") + " & " + v("#oBrideNick") : "—"],
      ["Tanggal", v("#oDate") || "—"],
      ["Jam", v("#oTime") || "—"],
      ["Lokasi", v("#oVenue") || "—"],
      ["Tema", thm.name],
      ["Paket", pkg.name]
    ];
    $("#orderSummary").innerHTML =
      "<h4>Ringkasan</h4>" +
      rows.map(([k, val]) => `<div class="sum-row"><span>${k}</span><strong></strong></div>`.replace("<strong></strong>", "<strong>" + escapeHtml(val) + "</strong>")).join("") +
      `<div class="sum-total"><span>Estimasi</span><strong>${rupiah(pkg.price)}</strong></div>`;
  }
  form.addEventListener("input", renderSummary);
  form.addEventListener("change", renderSummary);

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* Validasi + kirim via WhatsApp */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    errEl.textContent = "";
    const required = ["#oGroom", "#oBride", "#oGroomNick", "#oBrideNick", "#oParents", "#oDate", "#oTime", "#oVenue", "#oAddress", "#oWa"];
    let firstBad = null;
    required.forEach((id) => {
      const f = $(id);
      const bad = !f.value.trim();
      f.classList.toggle("invalid", bad);
      if (bad && !firstBad) firstBad = f;
    });
    const wa = $("#oWa").value.replace(/[^\d]/g, "");
    if (wa.length < 9) {
      $("#oWa").classList.add("invalid");
      if (!firstBad) firstBad = $("#oWa");
    }
    if (firstBad) {
      errEl.textContent = "Mohon lengkapi seluruh field wajib dengan benar.";
      firstBad.focus();
      return;
    }
    const pkg = C.packages.find((p) => p.id === $("#oPackage").value);
    const thm = C.themes.find((t) => t.id === $("#oTheme").value);
    const v = (id) => $(id).value.trim();
    const lines = [
      "*PEMESANAN UNDANGAN — " + C.brand + "*",
      "",
      "Mempelai Pria: " + v("#oGroom") + " (" + v("#oGroomNick") + ")",
      "Mempelai Wanita: " + v("#oBride") + " (" + v("#oBrideNick") + ")",
      "Orang Tua: " + v("#oParents"),
      "Tanggal Acara: " + v("#oDate"),
      "Jam Acara: " + v("#oTime"),
      "Lokasi: " + v("#oVenue"),
      "Alamat: " + v("#oAddress"),
      "Tema: " + thm.name,
      "Paket: " + pkg.name + " (" + rupiah(pkg.price) + ")",
      "WhatsApp Pelanggan: " + v("#oWa"),
      v("#oNotes") ? "Catatan: " + v("#oNotes") : "",
      "",
      "Mohon konfirmasi ketersediaan jadwal. Terima kasih."
    ].filter(Boolean);
    const url = waBase + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
    toast("Membuka WhatsApp — tekan kirim untuk mengirim pesanan.");
  });

  /* Muat ulang ikon setelah render dinamis */
  refreshIcons();
})();
