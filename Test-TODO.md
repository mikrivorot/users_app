Les scénarios possible de tests:

### Test Unitaire (jest + expect)
- Rajouter les tests pour `users/user.service`
- Rajouter les tests pour `users/mappers/users.ts`
- Rajouter les tests pour `authentication/authentication.service.ts`

### Test Intégration (supertest)
- Rajouter les tests pour API
    - Scénario pour l'utilisateur non-existant:
        - Login (❌ échec)

    - Scenario pour User (l'utilisateur existant, `userType=user`)
        - Login (✅ success)
        - La tentative d'obtenir list de tous les utilisateurs (❌ échec)
        - La tentative de créer un nouveau utilisateur (❌ échec)
        - La tentative de modifier l'utilisateur (❌ échec)
        - La tentative de modifier son profile (✅ success)
        - La tentative de supprimer l'utilisateur (❌ échec)

    - Scenario pour Admin (l'utilisateur existant, `userType=admin`)
        - Login (✅ success)
        - La tentative d'obtenir list de tous les utilisateurs (✅ success)
        - La tentative de créer un nouveau utilisateur (✅ succès)
        - La tentative de modifier l'utilisateur (✅ succès)
        - La tentative de modifier son profile (✅ succès)
        - La tentative de supprimer l'utilisateur (✅ succès)
       
    - Scénario sans Bearer Token (access API sans autorisation)
        - La tentative d'obtenir list de tous les utilisateurs (❌ échec)
        - La tentative de créer un nouveau utilisateur (❌ échec)
        - La tentative de modifier l'utilisateur (❌ échec)
        - La tentative de modifier son profile (❌ échec)
        - La tentative de supprimer l'utilisateur (❌ échec)