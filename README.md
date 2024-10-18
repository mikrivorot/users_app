## Démarrer l'application

### Step 1: Lancer l'application et la base de données

[Aller sur le local (development + debug)](./docs/local.md)

ou 

[Aller sur le docker](./docs/docker.md)


### Step 2: Vérifiez si l'application est accessible via `localhost`

Aller sur le site `http://localhost:3000/api` pour voir Swagger.

![alt text](./docs/image-1.png)

### Step 3: Configurer le premier utilisateur administrateur pour gérer les utilisateurs

#### 3.1 Créé premier utilisateur

On a besoin de cree premier utilisateur (admin) pour faire autorisation et utiliser l'application

```
docker exec -it mongo_for_test_technique bash
mongosh -u <MONGO_USERNAME> -p <MONGO_PASSWORD>
use <MONGO_DB>

db.users.insertOne({
  pseudonyme: "admin",
  name: "admin",
  address: "",
  commentaire: "Utilisateur Admin pour commencer utilisation et creer les autres utilisateur",
  password: "admin", // Change to a strong password
  userType: "admin"
});
```
#### 3.2 Vérifiez si `mongo-express` est accessible
Aller sur le site `http://localhost:8081/` pour acceder Mongo Admin console

Utiliser l'informations d'identification proposé:

![alt text](./docs/image-2.png)

Premier Admin a été créé
![alt text](./docs/image-3.png)

#### 3.3 Cree jwt token pour lancer l'utilisation de Swagger
