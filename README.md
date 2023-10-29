# NationsAPI
[![npm version](https://badge.fury.io/js/nationsapi.svg)](https://www.npmjs.com/package/nationsapi)
![NPM](https://img.shields.io/npm/l/nationsapi)
![npm](https://img.shields.io/npm/dt/nationsapi)
![GitHub last commit](https://img.shields.io/github/last-commit/baba33mrt/nationsapi)

Une interface de programmation simple pour accéder à l'API publique de NationsGlory.

# Table des matières
- [Préréquis](#préréquis)
- [Installation](#Installation)
- [Méthodes](#méthodes)
- [Gestion des erreurs](#gestion-des-erreurs)
- [Contribution](#contribution)
- [Retours](#retours)
- [Licence](#licence)


# Préréquis
- Disposer d'un jeton API valide. Vous pouvez en obtenir un en contactant NationsGlory à l'adresse suivante [gestion@nationsglory.fr](mailto:gestion@nationsglory.fr).
    - *Petit conseil : essayez de décrire votre projet et ne demandez pas un jeton simplement pour en avoir un.*

# Installation

```bash
npm install nationsapi
```
Utilisation
javascript
```javascript
const NationsAPI = require('your-npm-package-name');
const api = new NationsAPI('YOUR_API_TOKEN');

// Obtenir le nombre de joueurs
api.getPlayersCount().then(data => console.log(data));

// Obtenir des notations
api.getNotations(week, country, server).then(data => console.log(data));

// ... (et ainsi de suite pour les autres méthodes)
// Remarque : n'oubliez pas de remplacer 'YOUR_API_TOKEN' par votre véritable jeton API.
```
## Méthodes
- `getPlayersCount()`
<br>Renvoie le nombre actuel de joueurs.

- `getNotations(week?, country?, server)`
<br>Obtient les notations pour une semaine donnée, un pays et un serveur. Si aucun paramètre n'est fourni, la semaine par défaut est calculée en fonction de la date actuelle.

- `getPlanning(server, month, year)`
<br>Obtient les informations de planification pour un serveur, un mois et une année spécifiques.

- `getUser(username)`
<br>Récupère les informations sur un utilisateur spécifique.

- `getCountry(server, country)`
<br>Récupère les informations sur un pays spécifique pour un serveur donné.

## Gestion des erreurs
Toutes les méthodes renvoient une promesse. En cas d'échec de la requête, un objet d'erreur est renvoyé avec un champ error.

## Contribution
Si vous souhaitez contribuer à ce projet, veuillez suivre ces étapes :
1. Forkez le dépôt.
2. Créez une nouvelle branche pour vos modifications.
3. Soumettez une pull request.

## Retours
N'hésitez pas à ouvrir une issue sur GitHub si vous avez des retours ou des suggestions. Vos commentaires sont toujours les bienvenus!

## Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

Conçu avec ❤️ par baba33mrt