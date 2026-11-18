/* ============================================================
   Sunshine Villa — Interactions
   ============================================================ */

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header state ---------- */
  var header = document.querySelector(".site-header");
  var toTop = document.querySelector(".to-top");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 24);
    if (toTop) toTop.classList.toggle("is-visible", y > 520);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("nav-open");
  }

  function openNav() {
    if (!nav || !navToggle) return;
    nav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close navigation");
    document.body.classList.add("nav-open");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) closeNav();
      else openNav();
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (!nav.contains(event.target) && !navToggle.contains(event.target)) closeNav();
    });

    var mq = window.matchMedia("(min-width: 901px)");
    var handleMq = function (event) {
      if (event.matches) closeNav();
    };
    if (mq.addEventListener) mq.addEventListener("change", handleMq);
    else if (mq.addListener) mq.addListener(handleMq);
  }

  /* ---------- Active nav link ---------- */
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".primary-nav a[href]").forEach(function (link) {
    var target = link.getAttribute("href").split("/").pop();
    if (target === path || (path === "" && target === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });

  /* ---------- Scroll reveal ---------- */
  var revealItems = document.querySelectorAll(".reveal");

  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.08 }
    );
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }

  /* ---------- Testimonial carousel ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll(".testimonial-slide"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".carousel-dots button"));
  var prevBtn = document.querySelector(".carousel-btn--prev");
  var nextBtn = document.querySelector(".carousel-btn--next");
  var carousel = document.querySelector(".testimonial-track");
  var current = 0;
  var timer = null;

  function showSlide(index) {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      var active = i === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");
    });
    dots.forEach(function (dot, i) {
      if (i === current) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function startAuto() {
    if (reduceMotion || slides.length < 2) return;
    stopAuto();
    timer = window.setInterval(function () { showSlide(current + 1); }, 6500);
  }

  function stopAuto() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  if (slides.length) {
    showSlide(0);
    startAuto();

    if (prevBtn) prevBtn.addEventListener("click", function () { showSlide(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { showSlide(current + 1); startAuto(); });

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { showSlide(i); startAuto(); });
    });

    if (carousel) {
      carousel.addEventListener("mouseenter", stopAuto);
      carousel.addEventListener("mouseleave", startAuto);
      carousel.addEventListener("focusin", stopAuto);
      carousel.addEventListener("focusout", startAuto);
    }
  }

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxClose = document.getElementById("lightbox-close");
  var lightboxPrev = document.getElementById("lightbox-prev");
  var lightboxNext = document.getElementById("lightbox-next");
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var activeImage = 0;
  var lastFocused = null;

  function renderLightbox() {
    var item = galleryItems[activeImage];
    if (!item || !lightboxImg) return;
    var full = item.getAttribute("data-full") || item.querySelector("img").getAttribute("src");
    lightboxImg.setAttribute("src", full);
    lightboxImg.setAttribute("alt", item.getAttribute("data-caption") || "Sunshine Villa gallery image");
    if (lightboxCaption) lightboxCaption.textContent = item.getAttribute("data-caption") || "";
  }

  function openLightbox(index) {
    if (!lightbox) return;
    activeImage = index;
    lastFocused = document.activeElement;
    renderLightbox();
    lightbox.hidden = false;
    document.body.classList.add("nav-open");
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.body.classList.remove("nav-open");
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  if (lightbox) {
    galleryItems.forEach(function (item, i) {
      item.addEventListener("click", function () { openLightbox(i); });
    });

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener("click", function () {
      activeImage = (activeImage - 1 + galleryItems.length) % galleryItems.length;
      renderLightbox();
    });
    if (lightboxNext) lightboxNext.addEventListener("click", function () {
      activeImage = (activeImage + 1) % galleryItems.length;
      renderLightbox();
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (event) {
      if (lightbox.hidden) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft" && lightboxPrev) lightboxPrev.click();
      if (event.key === "ArrowRight" && lightboxNext) lightboxNext.click();
      if (event.key === "Tab") {
        var focusables = Array.prototype.slice.call(
          lightbox.querySelectorAll("button:not([disabled])")
        );
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ---------- Tabs ---------- */
  var tabButtons = Array.prototype.slice.call(document.querySelectorAll(".tab-btn"));
  var menuPanels = Array.prototype.slice.call(document.querySelectorAll(".menu-panel"));

  function activateTab(button) {
    var target = button.getAttribute("aria-controls");
    tabButtons.forEach(function (tab) {
      var selected = tab === button;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.tabIndex = selected ? 0 : -1;
    });
    menuPanels.forEach(function (panel) {
      var active = panel.id === target;
      panel.classList.toggle("is-active", active);
      panel.setAttribute("aria-hidden", active ? "false" : "true");
    });
  }

  tabButtons.forEach(function (button, index) {
    button.addEventListener("click", function () { activateTab(button); });
    button.addEventListener("keydown", function (event) {
      var next = null;
      if (event.key === "ArrowRight") next = tabButtons[(index + 1) % tabButtons.length];
      if (event.key === "ArrowLeft") next = tabButtons[(index - 1 + tabButtons.length) % tabButtons.length];
      if (event.key === "Home") next = tabButtons[0];
      if (event.key === "End") next = tabButtons[tabButtons.length - 1];
      if (next) {
        event.preventDefault();
        activateTab(next);
        next.focus();
      }
    });
  });

  /* ---------- Date helpers ---------- */
  var checkin = document.getElementById("checkin");
  var checkout = document.getElementById("checkout");

  function isoDate(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  if (checkin && checkout) {
    var today = new Date();
    checkin.min = isoDate(today);
    checkout.min = isoDate(new Date(today.getTime() + 86400000));

    checkin.addEventListener("change", function () {
      if (!checkin.value) return;
      var next = new Date(checkin.value + "T00:00:00");
      next.setDate(next.getDate() + 1);
      checkout.min = isoDate(next);
      if (checkout.value && checkout.value < checkout.min) checkout.value = checkout.min;
    });
  }

  /* ---------- Booking form ---------- */
  var bookingForm = document.getElementById("booking-form");
  var bookingStatus = document.getElementById("booking-status");
  var roomSelect = document.getElementById("room");

  var requestedRoom = new URLSearchParams(window.location.search).get("room");
  if (requestedRoom && roomSelect) {
    Array.prototype.slice.call(roomSelect.options).some(function (option) {
      if (option.value.toLowerCase() === requestedRoom.toLowerCase()) {
        option.selected = true;
        return true;
      }
      return false;
    });
  }

  function setError(id, message) {
    var field = document.getElementById(id);
    var error = document.getElementById(id + "-error");
    if (error) error.textContent = message || "";
    if (field) {
      if (message) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    }
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var valid = true;
      var firstInvalid = null;

      var name = document.getElementById("name");
      var email = document.getElementById("email");
      var phone = document.getElementById("phone");
      var guests = document.getElementById("guests");
      var room = document.getElementById("room");

      function fail(id, message) {
        setError(id, message);
        if (!firstInvalid) firstInvalid = document.getElementById(id);
        valid = false;
      }

      if (!name.value.trim()) fail("name", "Please enter your full name.");
      else setError("name", "");

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) fail("email", "Enter a valid email address.");
      else setError("email", "");

      if (!phone.value.trim()) fail("phone", "Please enter a contact number.");
      else setError("phone", "");

      if (!checkin.value) fail("checkin", "Choose a check-in date.");
      else setError("checkin", "");

      if (!checkout.value) fail("checkout", "Choose a check-out date.");
      else if (checkin.value && checkout.value <= checkin.value) fail("checkout", "Check-out must be after check-in.");
      else setError("checkout", "");

      if (!guests.value) fail("guests", "Select the number of guests.");
      else setError("guests", "");

      if (!room.value) fail("room", "Choose a room type.");
      else setError("room", "");

      if (!valid) {
        if (bookingStatus) bookingStatus.classList.remove("is-visible");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (bookingStatus) {
        bookingStatus.textContent =
          "Thank you, " + name.value.trim() + "! We received your request for the " +
          room.options[room.selectedIndex].text + " (" + checkin.value + " to " +
          checkout.value + "). Our reservations team will email you shortly.";
        bookingStatus.classList.add("is-visible");
        bookingStatus.setAttribute("role", "status");
        bookingStatus.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }

      bookingForm.reset();
      if (checkin && checkout) {
        var t = new Date();
        checkin.min = isoDate(t);
        checkout.min = isoDate(new Date(t.getTime() + 86400000));
      }
      ["name", "email", "phone", "checkin", "checkout", "guests", "room"].forEach(function (id) {
        setError(id, "");
      });
    });
  }

  /* ---------- Newsletter ---------- */
  var newsletterForm = document.getElementById("newsletter-form");
  var newsletterMsg = document.getElementById("newsletter-msg");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = document.getElementById("newsletter-email");
      if (!input) return;
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      if (newsletterMsg) {
        newsletterMsg.textContent = ok
          ? "You're on the list. See you in your inbox!"
          : "Please enter a valid email address.";
      }
      if (ok) input.value = "";
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
