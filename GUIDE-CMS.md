# Guide du CMS — Yel Électricité

Ce guide explique **comment Yé Vincent modifie le site depuis son téléphone** sans appeler personne.

Durée de setup initial (une fois pour toutes) : ~15 min.
Ensuite, chaque modification prend moins d'une minute.

---

## 🔧 Setup initial (une seule fois)

### Étape 1 — Mettre le site sur GitHub

Le CMS a besoin d'un dépôt Git pour fonctionner. Le plus simple :

1. Créer un compte gratuit sur **[github.com](https://github.com)** (si pas déjà fait)
2. Cliquer sur **“New repository”** → nom : `yel-electricite-site` → **Public** ou **Private** (au choix)
3. Téléverser tout le contenu du dossier `site-yel-electricite/` dans ce dépôt (bouton *“uploading an existing file”* → glisser-déposer)

### Étape 2 — Connecter Netlify au dépôt

1. Sur **[netlify.com](https://app.netlify.com)** (compte gratuit) → **Add new site → Import from Git**
2. Choisir GitHub, autoriser, sélectionner le dépôt `yel-electricite-site`
3. Laisser les champs *Build command* et *Publish directory* par défaut → **Deploy**
4. Le site est en ligne sous `xxx.netlify.app` en ~30 secondes

### Étape 3 — Activer Netlify Identity (authentification)

1. Dans le tableau de bord du site Netlify → **Site configuration → Identity → Enable Identity**
2. Dans **Registration preferences** → cocher **“Invite only”** (seul Yé pourra se connecter, personne d'autre)
3. Dans **Services → Git Gateway** → cliquer sur **Enable Git Gateway**
4. Dans **Identity → Invite users** → entrer l'email de Yé (ex : `yevincent@hotmail.com`) → **Send**

### Étape 4 — Première connexion (sur smartphone)

1. Yé reçoit un email de Netlify avec un lien de confirmation
2. **Ouvrir le mail sur son téléphone** → cliquer sur le lien
3. Il arrive sur la page d'accueil du site — une petite fenêtre s'ouvre pour définir un mot de passe
4. Une fois le mot de passe choisi, il est redirigé automatiquement vers `/admin/`
5. Ajouter un raccourci à l'écran d'accueil du tél (Safari : “Ajouter à l'écran d'accueil” / Chrome : “Installer l'application”)

---

## 📱 Utiliser le CMS au quotidien (depuis smartphone)

L'admin est accessible à l'adresse **`https://yel-electricite.fr/admin/`** (ou `xxx.netlify.app/admin/` avant connexion du domaine).

La première fois que tu ouvres cette URL :
- Tu vois un bouton **“Login with Netlify Identity”**
- Tu entres l'email + mot de passe définis à l'étape 4

### Ajouter un avis client

1. Menu → **⭐ Avis clients → Liste des avis**
2. Bouton **“+ Add Avis”**
3. Remplir les 4 champs : Prénom + initiale, Commune, Texte, Note sur 5
4. Bouton **“Publish”** en haut à droite → **“Publish now”**
5. ✅ En ~30 secondes, l'avis apparaît sur le site en ligne

### Publier une actualité / photo de chantier

1. Menu → **📰 Actualités → Liste des actualités**
2. Bouton **“+ Add Actualités”**
3. Remplir : Titre, Date, **charger une photo** (bouton Image), Résumé court, et optionnellement un contenu plus long
4. **Publish**
5. ✅ La section **“Actualités”** apparaît automatiquement sur le site dès la 1re publication

> 💡 Astuce photo : prendre la photo avec le tél, la compresser avec une app type Photoshop Express avant d'envoyer. Objectif : moins de 500 Ko par photo pour un site qui reste rapide.

### Changer les horaires, le téléphone, ou les communes

1. Menu → **⚙️ Informations générales → Infos du site**
2. Modifier le champ voulu
3. **Publish**
4. ✅ Le site est mis à jour partout (hero, contact, footer, zone d'intervention)

---

## ⏱️ Combien de temps prend une modification ?

| Action | Temps |
|---|---|
| Ajouter un avis client | 30 s |
| Publier une actu avec photo | 2 min |
| Corriger un horaire | 15 s |
| Retirer/ajouter une commune | 10 s |

Après chaque **Publish**, Netlify redéploie le site automatiquement en 20-30 secondes.

---

## ❓ FAQ CMS

**Q : Si je supprime tous les avis, que se passe-t-il ?**
R : Les placeholders “Avis à venir” réapparaissent automatiquement. Aucune section vide ou cassée.

**Q : Si je ne publie pas d'actualité, la section s'affiche vide ?**
R : Non. La section **Actualités** est **masquée tant qu'il n'y a pas au moins 1 publication**. Elle apparaît dès la 1re actu.

**Q : Je peux ajouter quelqu'un d'autre comme admin ?**
R : Oui. Dans Netlify → Identity → Invite users → entrer l'email. Limite : 5 utilisateurs en plan gratuit (largement suffisant).

**Q : Et si je fais une bêtise ?**
R : Chaque modif fait un commit Git. On peut toujours revenir à une version précédente en cliquant sur “Revert” dans l'historique GitHub.

**Q : Combien ça coûte ?**
R : **Zéro euro.**
- Netlify : plan gratuit (100 Go de bande passante/mois, largement suffisant pour un site vitrine)
- Netlify Identity : gratuit jusqu'à 5 utilisateurs
- Git Gateway : gratuit
- Decap CMS : open source, 100 % gratuit

Seul coût éventuel : le **nom de domaine** `yel-electricite.fr` (~12 €/an chez OVH ou Gandi).

---

## 🆘 En cas de problème

- **“Git Gateway Error”** à la connexion → vérifier que Git Gateway est bien activé dans Netlify → Services
- **Les modifs ne s'affichent pas** → attendre 30 s que le redéploiement se termine, puis rafraîchir (sur iPhone : tirer vers le bas)
- **Impossible de se connecter** → vérifier que l'email d'invitation a bien été validé

Pour toute autre question, contacter la personne qui a mis en place le site.
