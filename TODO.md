## Éléments manquants, bonnes pratiques non appliquées, améliorations d'architecture et de conception envisagées.

#### Absence de Logging & Monitoring
- Les outils simple:
    - Winston, Pino, Morgan, Log4js
- Les outils plus complex
    - Grafana, Datadog, Splunk

#### Plus de tests (Test Unitaire VS Test Intégration) 

#### Plus de types Typescript + DTOs + Mapper
- Éviter d'utilisation de `any`
- Remplacer `"noImplicitAny": false` avec `"noImplicitAny": true`

#### CI/CD
- Ajouter des tests automatisés
- Ajouter un déploiement 
    - pour Demo c'est possible d'utiliser (Vercel)[https://vercel.com/]
    - GCP/AWS
