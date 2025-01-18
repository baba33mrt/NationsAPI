# NationsAPI
[![npm version](https://badge.fury.io/js/nationsapi.svg)](https://www.npmjs.com/package/nationsapi)
![NPM](https://img.shields.io/npm/l/nationsapi)
![npm](https://img.shields.io/npm/dt/nationsapi)
![GitHub last commit](https://img.shields.io/github/last-commit/baba33mrt/nationsapi)
[![Node.js Package](https://github.com/baba33mrt/NationsAPI/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/baba33mrt/NationsAPI/actions/workflows/npm-publish.yml)

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
- Disposer une clé API. Vous pouvez en obtenir une en créant un compte sur le  [readme de NationsGlory](https://nationsglory.readme.io/reference/intro/getting-started).
# Installation

```bash
npm install nationsapi
```
Utilisation
```javascript
const NationsAPI = require('nationsapi');
const ngApi = new NationsAPI('API_KEY');

// Récupérer le nombre de joueurs actuel
ngApi.server.getPlayersCount().then((data) => {
    console.log(data);
}).catch((error) => {
    console.error(error);
});

// Récupérer des informations sur un joueur 
ngApi.user.get('baba_33_mrt').then((data) => {
    console.log(data);
}).catch((error) => {
    console.error(error);
});

// Il est fortement recommandé de stocker les
// clés d'API dans un fichier .env
```
## Méthodes
Meri de regarder la page [Wiki]("https://github.com/baba33mrt/NationsAPI/wiki/methods") pour plus d'informations sur les méthodes disponibles.

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
