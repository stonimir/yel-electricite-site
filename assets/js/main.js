/* ==========================================================================
   YEL ÉLECTRICITÉ — JS d'interaction (vanilla, sans dépendance)
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Menu burger mobile ---------- */
  var burger = document.getElementById("burgerBtn");
  var nav = document.getElementById("mainNav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      burger.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    // Ferme le menu quand on clique un lien
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }
      });
    });
    // Affiche les CTA téléphone/devis dans le menu mobile
    var mobileHidden = nav.querySelectorAll('.btn[style*="display:none"]');
    // On les montrera uniquement quand le menu est ouvert en mobile
    // (CSS s'en charge via .nav.is-open .btn)
  }

  /* ---------- Accordéon FAQ ---------- */
  document.querySelectorAll(".faq-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  /* ---------- Animation d'apparition (reveal au scroll) ---------- */
  if ("IntersectionObserver" in window) {
    var reveals = document.querySelectorAll(".reveal");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Année dynamique dans le footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Formulaire devis (Formspree ou fallback mailto) ---------- */
  var form = document.getElementById("devisForm");
  var feedback = document.getElementById("formFeedback");
  if (form && feedback) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      feedback.className = "form-feedback";
      feedback.textContent = "";

      // Validation simple
      var required = form.querySelectorAll("[required]");
      var hasError = false;
      required.forEach(function (f) {
        if (!f.value || (f.type === "checkbox" && !f.checked)) {
          f.style.borderColor = "#DC2626";
          hasError = true;
        } else {
          f.style.borderColor = "";
        }
      });
      if (hasError) {
        feedback.classList.add("is-error");
        feedback.textContent = "Merci de compléter les champs obligatoires.";
        return;
      }

      // Si Formspree n'est pas encore configuré, fallback mailto
      var action = form.getAttribute("action") || "";
      if (action.indexOf("YOUR_FORM_ID") !== -1) {
        var body = Array.from(form.elements).filter(function (f) {
          return f.name && f.name[0] !== "_" && f.type !== "checkbox" && f.type !== "submit";
        }).map(function (f) {
          return f.labels && f.labels[0] ? (f.labels[0].innerText.replace(/\*/g, "").trim() + " : " + f.value) : (f.name + " : " + f.value);
        }).join("\n");
        var mailto = "mailto:yevincent@hotmail.com"
          + "?subject=" + encodeURIComponent("Demande de devis depuis le site")
          + "&body=" + encodeURIComponent(body);
        window.location.href = mailto;
        feedback.classList.add("is-success");
        feedback.textContent = "Ouverture de votre messagerie… Si rien ne se passe, écrivez à yevincent@hotmail.com ou appelez le 06 19 85 06 22.";
        return;
      }

      // Envoi Formspree (AJAX)
      var submitBtn = form.querySelector("button[type=submit]");
      var originalLabel = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Envoi en cours…";

      fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            feedback.classList.add("is-success");
            feedback.textContent = "✅ Votre demande a bien été envoyée. Je reviens vers vous sous 48 h ouvrées. Merci !";
            form.reset();
          } else {
            return res.json().then(function (data) { throw new Error(data && data.error ? data.error : "Erreur d'envoi"); });
          }
        })
        .catch(function () {
          feedback.classList.add("is-error");
          feedback.innerHTML = "Une erreur est survenue. Merci de réessayer ou de me joindre directement au <a href='tel:+33619850622'>06 19 85 06 22</a>.";
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalLabel;
        });
    });
  }

  /* ======================================================================
     HYDRATATION DU CONTENU CMS (Decap)
     Charge /content/*.json et met à jour les sections éditables.
     Si les fichiers ne sont pas accessibles (ouverture locale en file://),
     on garde le contenu par défaut du HTML : zéro casse.
     ====================================================================== */

  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Markdown très léger (titres, gras, italique, liens, listes, paragraphes).
  // Pas de dépendance externe — largement suffisant pour des actus courtes.
  function renderMarkdown(md) {
    if (!md) return "";
    var src = String(md).replace(/\r\n/g, "\n");
    // Échappe d'abord
    src = escapeHtml(src);
    // Titres
    src = src.replace(/^### (.*)$/gm, "<h4>$1</h4>");
    src = src.replace(/^## (.*)$/gm, "<h3>$1</h3>");
    // Gras / italique
    src = src.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    src = src.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    // Liens
    src = src.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" rel="noopener">$1</a>');
    // Listes -
    src = src.replace(/(?:^|\n)((?:- .*(?:\n|$))+)/g, function (_, block) {
      var items = block.trim().split(/\n/).map(function (l) {
        return "<li>" + l.replace(/^- /, "") + "</li>";
      }).join("");
      return "\n<ul>" + items + "</ul>\n";
    });
    // Paragraphes (double saut)
    src = src.split(/\n{2,}/).map(function (chunk) {
      var c = chunk.trim();
      if (!c) return "";
      if (/^<(h\d|ul|ol|p|blockquote)/.test(c)) return c;
      return "<p>" + c.replace(/\n/g, "<br>") + "</p>";
    }).join("\n");
    return src;
  }

  function formatDateFr(iso) {
    if (!iso) return "";
    try {
      var d = new Date(iso);
      if (isNaN(d)) return String(iso);
      return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
    } catch (_) { return String(iso); }
  }

  function fetchJson(path) {
    return fetch(path, { cache: "no-cache" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; });
  }

  /* --- Infos générales --- */
  fetchJson("content/site-info.json").then(function (info) {
    if (!info) return;

    // Disponibilité (hero badge)
    if (info.message_disponibilite) {
      var dispo = document.querySelector('[data-bind="message_disponibilite"]');
      if (dispo) dispo.textContent = info.message_disponibilite;
    }

    // Téléphone (tel:)
    if (info.telephone) {
      var telClean = "+33" + info.telephone.replace(/[^0-9]/g, "").replace(/^0/, "");
      document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
        a.setAttribute("href", "tel:" + telClean);
      });
      // On ne remplace le *texte* que sur le bloc contact dédié (data-bind)
      var telEl = document.querySelector('[data-bind="telephone_href"]');
      if (telEl) telEl.textContent = info.telephone;
    }

    // Horaires (bloc contact)
    if (info.horaires_semaine || info.horaires_samedi) {
      var h = document.querySelector('[data-bind="horaires"]');
      if (h) {
        h.innerHTML = escapeHtml(info.horaires_semaine || "") +
          (info.horaires_samedi ? "<br>" + escapeHtml(info.horaires_samedi) : "");
      }
    }

    // Communes
    if (Array.isArray(info.communes) && info.communes.length) {
      var container = document.querySelector("[data-communes]");
      if (container) {
        container.innerHTML = info.communes.map(function (c) {
          return '<span class="zone-commune">' + escapeHtml(c) + "</span>";
        }).join("");
      }
    }
  });

  /* --- Avis clients --- */
  fetchJson("content/avis.json").then(function (data) {
    if (!data || !Array.isArray(data.avis) || !data.avis.length) return;
    var grid = document.querySelector("[data-avis]");
    if (!grid) return;
    grid.innerHTML = data.avis.map(function (av) {
      var note = Math.max(1, Math.min(5, parseInt(av.note, 10) || 5));
      var stars = "★".repeat(note) + "☆".repeat(5 - note);
      var initiale = (av.auteur || "?").trim().charAt(0).toUpperCase();
      return (
        '<div class="testimonial-filled reveal">' +
          '<div class="stars" aria-label="Note : ' + note + ' sur 5">' + stars + "</div>" +
          '<p class="quote">« ' + escapeHtml(av.texte || "") + " »</p>" +
          '<div class="author">' +
            '<div class="avatar">' + escapeHtml(initiale) + "</div>" +
            '<div class="author-meta">' +
              '<span class="name">' + escapeHtml(av.auteur || "") + "</span>" +
              (av.commune ? '<span class="commune">' + escapeHtml(av.commune) + "</span>" : "") +
            "</div>" +
          "</div>" +
        "</div>"
      );
    }).join("");
    // Réobserve les nouveaux blocs pour l'animation reveal
    grid.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  });

  /* --- Actualités --- */
  fetchJson("content/actualites.json").then(function (data) {
    if (!data || !Array.isArray(data.actualites) || !data.actualites.length) return;
    var grid = document.querySelector("[data-actus]");
    var section = document.getElementById("actualites");
    if (!grid || !section) return;

    // Tri par date décroissante
    var items = data.actualites.slice().sort(function (a, b) {
      return (b.date || "").localeCompare(a.date || "");
    });

    grid.innerHTML = items.map(function (a) {
      var imgHtml;
      if (a.image) {
        imgHtml = '<div class="actu-image" style="background-image:url(\'' + escapeHtml(a.image) + '\')" role="img" aria-label="' + escapeHtml(a.titre || "") + '"></div>';
      } else {
        imgHtml = '<div class="actu-no-image" aria-hidden="true">⚡</div>';
      }
      var contenuHtml = a.contenu ? renderMarkdown(a.contenu) : "";
      return (
        '<article class="actu-card reveal">' +
          imgHtml +
          '<div class="actu-body">' +
            '<span class="actu-date">' + escapeHtml(formatDateFr(a.date)) + "</span>" +
            "<h3>" + escapeHtml(a.titre || "") + "</h3>" +
            (a.resume ? "<p>" + escapeHtml(a.resume) + "</p>" : "") +
            (contenuHtml ? '<details><summary>Lire la suite</summary><div class="actu-content">' + contenuHtml + "</div></details>" : "") +
          "</div>" +
        "</article>"
      );
    }).join("");

    // Affiche la section maintenant qu'elle a du contenu
    section.hidden = false;
    grid.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  });

  /* ---------- Header ombre au scroll ---------- */
  var header = document.querySelector(".header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        header.style.boxShadow = "0 2px 12px rgba(10,37,64,.08)";
      } else {
        header.style.boxShadow = "";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
