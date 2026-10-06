# Sécurité

## Périmètre

ReadMy ne demande pas de secret, de clé d'API, de mot de passe ni de donnée de profil privé. Ne les collez pas dans une issue, une pull request, un gabarit, une image ou un exemple.

Le rendu s'arrête avec `SECRET_DETECTE` s'il reconnaît un motif de jeton. Le message d'erreur ne répète pas la valeur.

## Signalement

Si vous trouvez un secret, une donnée personnelle, un lien malveillant ou un autre problème de sécurité, n'ouvrez pas d'issue publique avec le détail. Contactez la personne qui maintient le dépôt en privé et indiquez le chemin du fichier.

## Ce que les contributions évitent

- Jetons et identifiants.
- Coordonnées personnelles réelles.
- Pixels de suivi.
- Procédures d'attaque dans les gabarits.
- Copies d'écrans identifiables.

## État

La politique de `main` est conservée et précisée pour la CLI v2.

## Prochaines actions

Aucun programme de prime n'est ouvert. Ne pas en annoncer un.

## Risques

Le détecteur de secrets reconnaît quelques préfixes courants. Il ne remplace pas une revue humaine.

### Notion bonus

- Journal privé des signalements, sans coller le secret.
- Lien vers le code `SECRET_DETECTE`.
- Rappel : l'archive v1 n'est pas le catalogue supporté.
