# NationsAPI

[![npm version](https://badge.fury.io/js/@baba33mrt%2Fnationsapi.svg)](https://badge.fury.io/js/@baba33mrt%2Fnationsapi)
[![NPM Downloads](https://img.shields.io/npm/dt/@baba33mrt/nationsapi.svg)](https://www.npmjs.com/package/@baba33mrt/nationsapi)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/npm/l/@baba33mrt%2Fnationsapi)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/baba33mrt/nationsapi/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/baba33mrt/nationsapi/actions/workflows/npm-publish.yml)
[![GitHub last commit](https://img.shields.io/github/last-commit/baba33mrt/nationsapi)](https://github.com/baba33mrt/nationsapi/commits/main)
[![GitHub issues](https://img.shields.io/github/issues/baba33mrt/nationsapi)](https://github.com/baba33mrt/nationsapi/issues)
[![GitHub forks](https://img.shields.io/github/forks/baba33mrt/nationsapi)](https://github.com/baba33mrt/nationsapi/network)
[![GitHub stars](https://img.shields.io/github/stars/baba33mrt/nationsapi)](https://github.com/baba33mrt/nationsapi/stargazers)

Une interface de programmation simple et typée pour accéder à l'API publique de NationsGlory.

Ce package est écrit en TypeScript et fournit des définitions de types prêtes à l'emploi pour une meilleure expérience de développement avec l'auto-complétion et la sécurité des types.

## Table des matières
- [Préréquis](#préréquis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Typings](#typings)
- [Méthodes](#méthodes)
- [Gestion des erreurs](#gestion-des-erreurs)
- [Contribution](#contribution)
- [Retours](#retours)
- [Licence](#licence)

## Préréquis
- Disposer d'une clé API. Vous pouvez en obtenir une en créant un compte sur le [portail des développeurs de NationsGlory](https://nationsglory.readme.io/reference/intro/getting-started).

## Installation

```bash
# Avec npm
npm install @baba33mrt/nationsapi

# Avec yarn
yarn add @baba33mrt/nationsapi

# Avec pnpm
pnpm add @baba33mrt/nationsapi
```

## Utilisation

Voici un exemple de base en TypeScript pour récupérer des informations sur un joueur.

```typescript
import NationsAPI from '@baba33mrt/nationsapi';

// Il est fortement recommandé de stocker les clés d'API dans des variables d'environnement
const ngApi = new NationsAPI(process.env.NATIONSGLORY_API_KEY);

async function getPlayerInfo() {
    try {
        const playerCount = await ngApi.server.getPlayersCount();
        console.log('Joueurs en ligne :', playerCount);

        const player = await ngApi.user.get('baba_33_mrt');
        if ('error' in player) {
            console.error('Erreur lors de la récupération du joueur:', player.error);
        } else {
            console.log('Informations sur le joueur:', player);
        }
    } catch (error) {
        console.error('Une erreur inattendue est survenue:', error);
    }
}

getPlayerInfo();
```

## Typings

Ce package inclut ses propres définitions de types TypeScript. Cela signifie que vous bénéficiez de l'auto-complétion dans votre éditeur de code et de la vérification des types, ce qui rend le développement plus rapide et plus sûr.

## Méthodes

Pour une liste complète des méthodes disponibles, veuillez consulter la page [Wiki](https://github.com/baba33mrt/NationsAPI/wiki/methods) du projet.

## Gestion des erreurs

Toutes les méthodes asynchrones renvoient une promesse. En cas d'erreur de l'API (par exemple, un joueur non trouvé ou une clé API invalide), la promesse se résoudra avec un objet contenant une propriété `error`. Il est recommandé de vérifier la présence de cette propriété avant de traiter les données.

Pour les erreurs réseau ou les erreurs inattendues, la promesse sera rejetée. Utilisez des blocs `try...catch` pour gérer ces cas.

## Contribution

Si vous souhaitez contribuer à ce projet, veuillez suivre ces étapes :
1. Forkez le dépôt.
2. Créez une nouvelle branche pour vos modifications (`git checkout -b feature/amélioration-x`).
3. Validez vos modifications (`git commit -m 'Ajout de la fonctionnalité X'`).
4. Poussez vers la branche (`git push origin feature/amélioration-x`).
5. Soumettez une pull request.

## Retours

N'hésitez pas à ouvrir une issue sur GitHub si vous avez des retours ou des suggestions. Vos commentaires sont toujours les bienvenus!

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

Conçu avec ❤️ par baba33mrt