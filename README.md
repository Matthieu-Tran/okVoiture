**okVoiture**
Il s'agit d'une application Web construite à l'aide du framework Next.js. L'application est conçue pour afficher des annonces de voitures et permettre aux utilisateurs de mettre sur l'application des annonces pour les particuliers.

*Installation*
Pour exécuter l'application localement, vous devrez avoir Node.js installé sur votre machine. Vous pouvez télécharger et installer Node.js à partir du site officiel : https://nodejs.org/.

Une fois que vous avez installé Node.js, vous pouvez cloner le dépôt sur votre machine locale en utilisant la commande suivante :

git clone https://github.com/Matthieu-Tran/okVoiture.git
Après avoir cloné le dépôt, accédez au répertoire du projet et installez les dépendances nécessaires en exécutant les commandes suivantes :

cd okvoiture
npm install

*Base de données et environnements*
Pour pouvoir visualiser les données que vous créé car je n'ai pas eu le temps de commencer cette user story, vous pouvez vous créer une base de données sur Railway.app : https://railway.app/

Pour créer la base de donnée faire:

- Start a New Project
- Empty Project puis cliquer sur Add a Service
- Database
- Add PostgreSQL
- Cliquer dessus
- Copier l'URL dans la fenêtre connect sous la variable *DATABASE_URL*
- Coller l'URL dans le .env
- Enfin il va falloir copier le schéma de base de donnée présente dans schema.prisma dans la base de donnée que vous avez créé.
- Dans le terminal tapez: *npx prisma migrate dev*
- Et voila votre base de donnée est créé

*Authentification*
Pour l'authentification, il va falloir aller sur *https://console.cloud.google.com/*

- Créer un nouveau projet 
- Puis quand vous aurez créer votre projet, allez dans le menu de navigation et cliquez sur API et services
- Allez sur Identifiants
- Créer des Identifiants
- ID client OAuth
- Type d'application: Application Web
- Dans Origines JavaScript autorisées mettez:
"http://localhost:3000"
- Dans URI de redirection autorisés mettez:
"http://localhost:3000/api/auth/callback/google"
-Enfin cliquez sur Créer
-Copiez l'identifiant et le mot de passe et coller le dans le fichier *.env.local*
- Dans AUTH_SECRET mettez n'importe quel mot de passe


Ensuite démarrer l'application, exécutez la commande suivante :
npm run dev

Cela démarrera le serveur de développement et ouvrira l'application dans votre navigateur web par défaut. Vous devriez maintenant pouvoir visualiser et interagir avec l'application.