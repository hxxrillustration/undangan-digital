/* ============================================================
   LUXE INVITATION — js/invitation.js (Halaman Undangan)
   Vanilla JS: cover, musik (Web Audio API via <audio>),
   countdown, galeri + lightbox, RSVP via WhatsApp + LocalStorage,
   hadiah digital, guestbook LocalStorage dengan sanitasi.
   ============================================================ */
(function () {
  "use strict";
  const C = window.LUXE_CONFIG;
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function refreshIcons() { if (window.lucide) window.lucide.createIcons(); }
  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 3000);
  }

  /* ============================================================
     1) TEMA VIA QUERY PARAM (?theme=eternal|modern|garden|royal)
     ============================================================ */
  const params = new URLSearchParams(location.search);
  const themeParam = params.get("theme");
  const theme = C.themes.find((t) => t.id === themeParam) || C.themes[0];
  if (theme) {
    const r = document.documentElement.style;
    r.setProperty("--inv-accent", theme.accent);
    r.setProperty("--inv-accent-deep", theme.accent);
    document.title = "Undangan Pernikahan — " +
      C.couple.groom.nickname + " & " + C.couple.bride.nickname + " | " + C.brand;
  }

  /* ============================================================
     2) NAMA TAMU DARI URL (?to=Nama+Tamu)
     ============================================================ */
  const guestParam = params.get("to");
  $("#guestName").textContent = guestParam ? guestParam.replace(/\+/g, " ").trim() : "Tamu Undangan";

  /* ============================================================
     3) ISI DATA MEMPELAI & ACARA DARI CONFIG
     ============================================================ */
  const g = C.couple.groom, b = C.couple.bride, ev = C.event;
  $("#groomPhoto").src = g.photo;
  $("#bridePhoto").src = b.photo;
  $("#groomName").textContent = g.fullName;
  $("#brideName").textContent = b.fullName;
  $("#groomNick").textContent = g.nickname;
  $("#brideNick").textContent = b.nickname;
  $("#groomParents").textContent = g.parents;
  $("#brideParents").textContent = b.parents;
  $("#groomDesc").textContent = g.desc;
  $("#brideDesc").textContent = b.desc;
  $("#groomIg").href = g.instagram;
  $("#brideIg").href = b.instagram;
  $("#groomIgHandle").textContent = "@" + g.instagram.split("/").pop();
  $("#brideIgHandle").textContent = "@" + b.instagram.split("/").pop();

  $("#akadTitle").textContent = ev.akad.title;
  $("#akadDate").textContent = ev.akad.date;
  $("#akadTime").textContent = ev.akad.time;
  $("#akadVenue").textContent = ev.akad.locationName;
  $("#akadAddress").textContent = ev.akad.address;
  $("#resepsiTitle").textContent = ev.resepsi.title;
  $("#resepsiDate").textContent = ev.resepsi.date;
  $("#resepsiTime").textContent = ev.resepsi.time;
  $("#resepsiVenue").textContent = ev.resepsi.locationName;
  $("#resepsiAddress").textContent = ev.resepsi.address;
  // Google Maps dari alamat (bukan koordinat palsu)
  const maps = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  $("#akadMap").href = maps(ev.akad.locationName + " " + ev.akad.address);
  $("#resepsiMap").href = maps(ev.resepsi.locationName + " " + ev.resepsi.address);

  /* ============================================================
     4) GALERI + LIGHTBOX (keyboard: Esc, panah kiri/kanan)
     ============================================================ */
  const galGrid = $("#galGrid");
  galGrid.innerHTML = C.gallery.map((img, i) => `
    <button class="gal-item" data-idx="${i}" aria-label="Perbesar foto: ${img.alt}">
      <img src="${img.src}" alt="${img.alt}" loading="lazy">
    </button>`).join("");

  const lightbox = $("#lightbox"), lbImg = $("#lbImg"), lbCounter = $("#lbCounter");
  let lbIndex = 0;
  function openLb(i) {
    lbIndex = (i + C.gallery.length) % C.gallery.length;
    const item = C.gallery[lbIndex];
    lbImg.src = item.src.replace("w=1000", "w=1600");
    lbImg.alt = item.alt;
    lbCounter.textContent = (lbIndex + 1) + " / " + C.gallery.length;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLb() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  galGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".gal-item");
    if (btn) openLb(Number(btn.dataset.idx));
  });
  $("#lbClose").addEventListener("click", closeLb);
  $("#lbPrev").addEventListener("click", () => openLb(lbIndex - 1));
  $("#lbNext").addEventListener("click", () => openLb(lbIndex + 1));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") openLb(lbIndex - 1);
    if (e.key === "ArrowRight") openLb(lbIndex + 1);
  });

  /* ============================================================
     5) LOVE STORY
     ============================================================ */
  $("#storyList").innerHTML = C.loveStory.map((s) => `
    <div class="story-item reveal">
      <time>${s.date}</time>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    </div>`).join("");

  /* ============================================================
     6) HADIAH DIGITAL + SALIN NOMOR REKENING
     ============================================================ */
  $("#giftList").innerHTML = C.gifts.map((gft, i) => `
    <div class="gift-card reveal ${i === 1 ? "delay-1" : ""}">
      <h4>${gft.bank}</h4>
      <p class="gift-number">${gft.number}</p>
      <p class="gift-holder">${gft.holder}</p>
      <button class="btn btn-ghost btn-copy" data-copy="${gft.number}">
        <i data-lucide="copy" aria-hidden="true"></i> Salin Nomor
      </button>
    </div>`).join("");
  $("#giftAddressText").textContent = C.giftAddress;

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((res, rej) => {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy") ? res() : rej(); } catch (e) { rej(e); }
      document.body.removeChild(ta);
    });
  }
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    copyText(btn.dataset.copy)
      .then(() => toast("Nomor rekening berhasil disalin."))
      .catch(() => toast("Gagal menyalin. Salin manual: " + btn.dataset.copy));
  });

  /* ============================================================
     7) COUNTDOWN (diperbarui tiap detik, zona waktu dari config)
     ============================================================ */
  const target = new Date(C.event.dateISO).getTime();
  const cdEls = { d: $("#cdDays"), h: $("#cdHours"), m: $("#cdMins"), s: $("#cdSecs") };
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      $("#cdGrid").classList.add("hidden");
      const done = $("#cdDone");
      done.classList.remove("hidden");
      done.textContent = "Hari yang dinanti telah tiba. Terima kasih atas doa dan kehadiran Anda.";
      clearInterval(cdTimer);
      return;
    }
    cdEls.d.textContent = Math.floor(diff / 864e5);
    cdEls.h.textContent = pad(Math.floor(diff / 36e5) % 24);
    cdEls.m.textContent = pad(Math.floor(diff / 6e4) % 60);
    cdEls.s.textContent = pad(Math.floor(diff / 1e3) % 60);
  }
  const cdTimer = setInterval(tick, 1000);
  tick();

  /* ============================================================
     8) RSVP — validasi + WhatsApp + simpan demo LocalStorage
     ============================================================ */
  const maxG = C.rsvp.maxGuests || 5;
  $("#rCount").innerHTML =
    '<option value="">— Pilih —</option>' +
    Array.from({ length: maxG }, (_, i) => `<option value="${i + 1}">${i + 1} orang</option>`).join("");

  $("#rsvpForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const err = $("#rsvpError");
    err.textContent = "";
    const name = $("#rName").value.trim();
    const status = $("#rStatus").value;
    const count = $("#rCount").value;
    if (!name || !status || !count) {
      err.textContent = "Mohon lengkapi nama, status kehadiran, dan jumlah tamu.";
      return;
    }
    // simpan demo lokal
    try {
      const list = JSON.parse(localStorage.getItem("luxe_rsvp") || "[]");
      list.push({ name, wa: $("#rWa").value.trim(), status, count, msg: $("#rMsg").value.trim(), at: new Date().toISOString() });
      localStorage.setItem("luxe_rsvp", JSON.stringify(list));
    } catch (err2) { /* storage penuh/diblokir — abaikan, WhatsApp tetap jalan */ }

    const lines = [
      "*KONFIRMASI KEHADIRAN — " + C.couple.groom.nickname + " & " + C.couple.bride.nickname + "*",
      "",
      "Nama: " + name,
      "Kehadiran: " + status,
      "Jumlah Tamu: " + count + " orang",
      $("#rWa").value.trim() ? "WhatsApp: " + $("#rWa").value.trim() : "",
      $("#rMsg").value.trim() ? "Ucapan: " + $("#rMsg").value.trim() : "",
      "",
      "Dikirim dari undangan digital (demo statis)."
    ].filter(Boolean);
    window.open("https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
    toast("Membuka WhatsApp — tekan kirim untuk mengonfirmasi kehadiran.");
    e.target.reset();
  });

  /* ============================================================
     9) GUESTBOOK — LocalStorage + sanitasi (textContent, bukan innerHTML)
     ============================================================ */
  const WISH_KEY = "luxe_wishes";
  const SEED_WISHES = [
    { name: "Keluarga Besar Hartono", rel: "Keluarga", msg: "Selamat menempuh hidup baru! Semoga samawa hingga ke Jannah-Nya. (contoh demo)", at: "2026-10-01T09:00:00" },
    { name: "Sahabat SMA", rel: "Sahabat", msg: "Happy wedding Adit & Nabila! Bahagia selalu ya. (contoh demo)", at: "2026-10-05T10:30:00" }
  ];
  function loadWishes() {
    try {
      const raw = localStorage.getItem(WISH_KEY);
      return raw ? JSON.parse(raw) : SEED_WISHES.slice();
    } catch (e) { return SEED_WISHES.slice(); }
  }
  function saveWishes(list) {
    try { localStorage.setItem(WISH_KEY, JSON.stringify(list)); } catch (e) { /* abaikan */ }
  }
  function renderWishes() {
    const list = loadWishes();
    const wrap = $("#wishList");
    wrap.innerHTML = "";
    if (!list.length) {
      const p = document.createElement("p");
      p.className = "wish-empty";
      p.textContent = "Belum ada ucapan. Jadilah yang pertama!";
      wrap.appendChild(p);
      return;
    }
    list.slice().reverse().forEach((w) => {
      const item = document.createElement("article");
      item.className = "wish-item";
      const header = document.createElement("header");
      const strong = document.createElement("strong");
      strong.textContent = w.name; // textContent = aman dari XSS
      const time = document.createElement("time");
      time.textContent = new Date(w.at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
      header.appendChild(strong);
      header.appendChild(time);
      if (w.rel) {
        const rel = document.createElement("span");
        rel.className = "wish-rel";
        rel.textContent = w.rel;
        header.appendChild(rel);
      }
      const p = document.createElement("p");
      p.textContent = w.msg;
      item.appendChild(header);
      item.appendChild(p);
      wrap.appendChild(item);
    });
  }
  $("#wishForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const err = $("#wishError");
    err.textContent = "";
    const name = $("#wName").value.trim();
    const rel = $("#wRelation").value.trim();
    const msg = $("#wMsg").value.trim();
    if (!name || !msg) { err.textContent = "Nama dan ucapan wajib diisi."; return; }
    if (msg.length > 250) { err.textContent = "Ucapan maksimal 250 karakter."; return; }
    const list = loadWishes();
    list.push({ name, rel, msg, at: new Date().toISOString() });
    saveWishes(list);
    renderWishes();
    e.target.reset();
    toast("Ucapan terkirim (tersimpan di browser ini).");
  });
  renderWishes();

  /* ============================================================
     10) MUSIK — hanya setelah interaksi; aman jika file hilang
     ============================================================ */
  const musicBtn = $("#musicBtn");
  const audio = new Audio();
  audio.loop = true;
  audio.preload = "none";
  let musicReady = false, playing = false;

  if (C.music && C.music.enabled) {
    audio.src = C.music.url;
    audio.addEventListener("canplaythrough", () => { musicReady = true; }, { once: true });
    audio.addEventListener("error", () => {
      // File musik tidak ada → sembunyikan kontrol agar tidak menipu
      musicBtn.classList.add("hidden");
    });
  } else {
    musicBtn.classList.add("hidden");
  }

  function setMusicUI(on) {
    playing = on;
    musicBtn.classList.toggle("playing", on);
    musicBtn.setAttribute("aria-pressed", String(on));
    $("#musicIconOn").classList.toggle("hidden", !on);
    $("#musicIconOff").classList.toggle("hidden", on);
  }
  async function tryPlay() {
    if (!musicReady) return;
    try { await audio.play(); setMusicUI(true); }
    catch (e) { setMusicUI(false); }
  }
  musicBtn.addEventListener("click", () => {
    if (playing) { audio.pause(); setMusicUI(false); }
    else tryPlay();
  });

  /* ============================================================
     11) BUKA UNDANGAN — animasi cover, lalu mulai musik
     ============================================================ */
  const cover = $("#invCover");
  const main = $("#invMain");
  let opened = false;
  $("#openInvite").addEventListener("click", () => {
    if (opened) return;
    opened = true;
    cover.classList.add("closed");
    main.classList.add("opened");
    main.removeAttribute("aria-hidden");
    document.body.style.overflow = "";
    musicBtn.classList.remove("hidden");
    if (C.music && C.music.enabled && C.music.autoplayAfterOpen && !reducedMotion) {
      // Beberapa browser butuh gesture lebih dulu; tombol ini adalah gesture-nya.
      audio.load();
      audio.play().then(() => setMusicUI(true)).catch(() => setMusicUI(false));
    }
    initRevealAndParallax();
    setTimeout(() => cover.remove(), 1000);
    window.scrollTo(0, 0);
  });

  /* Kunci scroll sebelum undangan dibuka */
  document.body.style.overflow = "hidden";

  /* ============================================================
     12) REVEAL + PARALLAX + SCROLL-SPY (aktif setelah dibuka)
     ============================================================ */
  let fxInit = false;
  function initRevealAndParallax() {
    if (fxInit) return;
    fxInit = true;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      }),
      { threshold: 0.12 }
    );
    $$(".reveal").forEach((el) => io.observe(el));

    const heroBg = $(".inv-hero-bg");
    if (heroBg && !reducedMotion) {
      window.addEventListener("scroll", () => {
        const y = window.scrollY;
        if (y < window.innerHeight) heroBg.style.transform = "translateY(" + y * 0.2 + "px)";
      }, { passive: true });
    }

    /* Scroll-spy untuk navigasi bawah */
    const sections = ["home", "couple", "event", "gallery", "rsvp"];
    const links = $$(".inv-bnav a");
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    sections.forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* Smooth scroll semua [data-scroll] */
  $$("[data-scroll]").forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = $(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    });
  });

  refreshIcons();
})();
