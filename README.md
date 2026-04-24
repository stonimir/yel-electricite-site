# Site Yel Électricité

Site vitrine statique pour **Yel Électricité** — électricien à Beaumont-lès-Valence (Drôme, 26).

Tech : HTML / CSS / JavaScript vanilla — aucun framework, aucune dépendance de build.
Compatible avec n'importe quel hébergeur statique (Netlify, OVH, GitHub Pages, Infomaniak…).

---

## 📁 Arborescence

```
site-yel-electricite/
├── index.html                       # Page principale (hero, services, à propos, zone, FAQ, contact)
├── mentions-legales.html            # Mentions légales
├── politique-confidentialite.html   # RGPD & cookies
├── robots.txt                       # Robots / référencement
├── sitemap.xml                      # Sitemap SEO
├── site.webmanifest                 # PWA / icônes mobile
├── netlify.toml                     # Config Netlify (headers sécurité + cache)
├── _redirects                       # Redirections Netlify
├── admin/                           # 🔐 Interface CMS (Decap) — accessible sur /admin
│   ├── index.html                   #     Loader Decap CMS + Netlify Identity
│   └── config.yml                   #     Schéma des contenus éditables
├── content/                         # 📝 Données éditables via le CMS
│   ├── avis.json                    #     Avis clients
│   ├── actualites.json              #     Actualités
│   └── site-info.json               #     Tél, email, horaires, communes, dispo
├── GUIDE-CMS.md                     # 📱 Mode d'emploi du CMS pour Yé Vincent
└── assets/
    ├── css/style.css                # Feuille de style unique
    ├── js/main.js                   # Interactions + hydratation CMS
    ├── logos/                       # Logos SVG
    ├── icons/                       # 6 icônes métier SVG
    ├── images/uploads/              # Photos publiées via le CMS
    ├── favicon.ico + favicon-32.png + apple-touch-icon.png
```

## 📱 Interface d'administration (CMS)

Le site intègre **Decap CMS**, une interface d'admin responsive accessible sur `/admin` depuis n'importe quel smartphone. Elle permet à Yé Vincent d'ajouter des avis, publier des actualités avec photos, modifier les horaires / téléphone / communes, **sans toucher au code**.

👉 **Voir le guide pas à pas : [`GUIDE-CMS.md`](GUIDE-CMS.md)**

Le CMS nécessite :
- un dépôt Git (GitHub) — gratuit
- Netlify Identity + Git Gateway activés — gratuit jusqu'à 5 utilisateurs
- L'invitation de Yé par email (une fois)

---

## 🚀 Déploiement (2 étapes)

> ℹ️ **Pas de formulaire de devis en ligne** — le contact se fait uniquement par téléphone et email. Aucun service tiers (Formspree, etc.) à configurer. Les visiteurs appellent directement le **06 19 85 06 22** ou écrivent à **yevincent@hotmail.com**.

### 1. Déployer sur Netlify (option recommandée)

**Méthode 1 — Drag & drop (la plus simple) :**

1. Créer un compte gratuit sur **[netlify.com](https://app.netlify.com/signup)**
2. Sur le tableau de bord, aller dans **Sites**
3. **Glisser tout le dossier `site-yel-electricite/`** dans la zone “Drop your site folder here”
4. Netlify déploie automatiquement et fournit une URL `xxx.netlify.app`
5. Dans **Site settings → Domain management**, ajouter le domaine `yel-electricite.fr` (si acheté)
6. Suivre les instructions pour pointer les DNS du domaine vers Netlify

**Méthode 2 — Via GitHub (pour les mises à jour faciles) :**

1. Créer un dépôt Git `yel-electricite-site` et y pousser ce dossier
2. Sur Netlify : **Add new site → Import from Git → GitHub** → sélectionner le dépôt
3. Build command : *laisser vide* — Publish directory : `.`
4. Chaque `git push` redéploie automatiquement le site ✨

### 2. Nom de domaine (`yel-electricite.fr`)

- Acheter le domaine chez un registrar (OVH, Gandi, Infomaniak, Namecheap…)
- Dans Netlify : **Domain settings → Add custom domain** → `yel-electricite.fr`
- Netlify affiche les valeurs DNS à configurer (enregistrements `A` et `CNAME`)
- Le certificat SSL (HTTPS) est généré **automatiquement et gratuitement** sous 24 h

---

## ✏️ Contenu à compléter avant mise en ligne

### Mentions légales (`mentions-legales.html`)

Remplacer les mentions *“à compléter”* :
- **SIRET** de l'entreprise
- **N° TVA intracommunautaire** (si applicable)
- **Compagnie d'assurance RC Pro** + numéro de contrat
- (Optionnel) N° médiateur de la consommation

### Avis clients

Dans `index.html`, section `#avis`, remplacer les 3 blocs placeholders par des vrais avis au fur et à mesure :

```html
<div class="testimonial reveal">
  <p>“Intervention rapide et soignée, tableau refait en 2 jours. Je recommande.”</p>
  <strong>— Julie M., Valence</strong>
</div>
```

### (Optionnel) Open Graph image

Créer une image `og-image.jpg` (1200 × 630 px) représentant la marque et la déposer dans `assets/`. Elle s'affichera quand le site est partagé sur Facebook, LinkedIn, WhatsApp…

---

## 🛠️ Modifier le site

Tout se modifie directement dans les fichiers HTML/CSS :
- **Textes et structure** → `index.html`
- **Couleurs, polices, espacements** → variables CSS en haut de `assets/css/style.css`
- **Ajout/retrait de services** → dupliquer un bloc `<article class="service-card">` dans `index.html`
- **Ajout d'une ville dans la zone** → ajouter `<span class="zone-commune">…</span>`

---

## 🎨 Palette (rappel charte — skill yel-electricite)

| Rôle | Couleur | Hex |
|------|---------|-----|
| Jaune électrique (primaire) | ████ | `#F5C518` |
| Bleu nuit (secondaire) | ████ | `#0D1B2A` |
| Blanc pur | ████ | `#FFFFFF` |
| Gris clair (neutre) | ████ | `#F4F4F4` |
| Gris anthracite | ████ | `#2D2D2D` |
| Texte principal | ████ | `#1A1A1A` |
| Vert validation / CTA secondaire | ████ | `#2ECC71` |

**Typographie** : Montserrat (titres + boutons Bold MAJUSCULES) + Open Sans (corps)
**Certifications** : Qualifelec · RGE · IRVE

---

## ✅ Checklist de mise en ligne

- [x] Pousser le site sur GitHub
- [x] Connecter le repo à Netlify (Import from Git)
- [ ] Compléter SIRET / assurance dans `mentions-legales.html`
- [ ] Activer **Netlify Identity + Git Gateway** (voir `GUIDE-CMS.md`)
- [ ] Inviter Yé Vincent comme utilisateur du CMS
- [ ] Connecter le domaine `yel-electricite.fr`
- [ ] Vérifier téléphone / email / lien `/admin` sur mobile
- [ ] Soumettre le site à **Google Search Console** et y ajouter le sitemap
- [ ] Créer une fiche **Google Business Profile** (ex‑Google My Business) pour le référencement local

---

## 📞 Contact (en cas de besoin)

Projet : **Yel Électricité** — Beaumont-lès-Valence (26760)
Gérant : Yé Vincent — 06 19 85 06 22 — yevincent@hotmail.com
