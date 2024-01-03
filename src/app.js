// import ES6
import express from "express";
import path from "path";
import favicon from "serve-favicon";
import jsonfile from "jsonfile";


// Création de l'application express
const app  = express();
const PORT = 9000;
const file = path.join(process.cwd(), "public/data/datas.json");


// favicon -> icône du site dans l'onglet du navigateur 
// explication de la méthode use() plus bas (ligne 60)
app.use(favicon(path.join(process.cwd(), 'public/assets/favicon', 'favicon.ico')));

// lancer le serveur sans avoir configurer de route "/" retourne une erreur "Cannot GET /"
// ça veut dire que l'URL demandée n'existe pas, ça sera le même résultat pour toutes les routes non configurées
// pour configurer une route, on utilise la méthode HTTP correspondante (GET, POST, PUT, DELETE, etc.)

// création d'une route GET
// décortiquons tout ça :
// - app est l'objet qui représente l'instance de l'application express
// - le premier paramètre est l'URL de la route ("ici, la racine du site '/'")
// - le deuxième paramètre est une fonction de rappel (callback) qui prend deux paramètres : req et res
// - req est l'objet qui représente la requête HTTP, contient des information envoyées par le client (paramètres, corps de la requête, en-têtes, etc.)
// - res est l'objet qui représente la réponse HTTP que l'on va envoyer au client
// - send() est une méthode de l'objet res fournit par express qui permet :
// - d'envoyer une réponse au client qui sera dynamiquement paramétrée (Content-Type, Content-Length) en fonction du type de paramètre passé (chaîne de caractères, objet, tableau, etc.)
// - de terminer le traitement de la requête HTTP (cycle req/res)
app.get("/", (req, res) => {
    res.send("<h1>Hello Express !</h1>"); 
 
});

// création d'une route GET avec envoi d'un fichier HTML
// on utilise l'objet path pour définir le chemin absolu du fichier HTML
// on utilise l'objet process pour définir le chemin du dossier courant (cwd = current working directory)
// on utilise la méthode join() de l'objet path pour concaténer le chemin du dossier courant avec le nom du fichier HTML
// on utilise la méthode sendFile() de l'objet res pour envoyer le fichier HTML au client
// en type module __dirname n'est pas disponible et il faut utiliser (path.resolve() + '/src/index.html') à la place ou (process.cwd(), 'src/index.html')
// si on veut envoyer un fichier statique sans donnée dynamique on va utiliser cette méthode sendFile()
app.get("/index", (req, res) => {
    // res.sendFile(path.join(process.cwd(), 'src/index.html'));
    res.sendFile(path.join(path.resolve() + "/src/index.html"));
});

// création d'une route GET avec paramètre dynamique (slug) avec les fameux deux points
// le paramètre est récupéré dans l'objet req.params
// on peut définir plusieurs paramètres dans l'URL
// les paramètres sont récupérés dans l'ordre de leur définition dans l'URL
//si :name alors la clé sera name dans req.params si :id alors la clé sera id
app.get("/hello/:name", (req, res) => {
    res.send(`Hello ${req.params.name} !`);
});

// AJOUT de EJS (moteur de template) 
// on utilise la méthode set() de l'objet app pour définir le moteur de template à utiliser
// le premier paramètre est le nom de la propriété à définir
// le deuxième paramètre est la valeur de la propriété
// le moteur de template EJS est configuré
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "/src/views"));

// use est une méthode de l'objet app fournit par express qui permet d'ajouter un middleware
// un middleware est une fonction qui va être exécutée à chaque requête HTTP
// un middleware est une fonction qui prend trois paramètres : req, res et next, ce dernier est optionnel et implicite dans le cas de la méthode use()
// express fournit des middlewares natifs (express.static(), express.json(), express.urlencoded(), etc.)
// ici on utilise la méthode static() de l'objet express pour définir un dossier contenant des fichiers statiques (images, CSS, JS, etc.)
// le premier paramètre est le chemin de la route
// le deuxième paramètre est le chemin du dossier contenant les fichiers statiques

app.use("/img" , express.static(path.join(process.cwd(), "/public/assets/img/")));
// app.use('/stylesheets', express.static(path.join(process.cwd(), '/public/assets/stylesheets/')));

app.get("/liste", (req, res) => {
    jsonfile.readFile(file, (err, datas) => {
        if (err) console.error(err);
        // on vérifie nos données
        res.render("layout/main", {
            template: "../pages/list",
            datas,
        });
    });
})

app.get("/ejs", (req, res) => {
    const datas = [
        {
            title: "EXPRESS",
            src: "Chrom.webp",
        },
        {
            title: "EJS",
            src: "Shamir.webp",
        },
    ];
    // on utilise la méthode render() de l'objet res pour envoyer une vue au client
    // render est une méthode de l'objet res fournit par express qui permet d'envoyer une vue au client utilisé avec un moteur de template (EJS, Pug, Handlebars, etc.), on peut transmettre des données à la vue sous forme d'objet JS :
    // le premier paramètre est le nom de la vue à envoyer
    // le deuxième paramètre est un objet contenant les données à injecter dans la vue
    res.render("layout/main", {
        template: "../pages/list",
        title: "EJS",
        message: "Hello EJS !",
        datas
    });
});

// ejs embarque un système de layout (mise en page)
// avoir un modèle de page qui va contenir le header et le footer par exemple
// et injecter le contenu de la page dans ce layout
app.get("/layout", (req, res) => {
    res.render("layout/main", {
        title: "EJS",
        message: "Hello EJS !",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});