// import ES6
import express from "express";
import path from "path";
import favicon from "serve-favicon";
import jsonfile from "jsonfile";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import multer from "multer";


// Création de l'application express
const app  = express();
const PORT = 9000;
const file = path.join(process.cwd(), "public/data/datas.json");
const articles = path.join(process.cwd(), "public/data/articles.json");


// favicon -> icône du site dans l'onglet du navigateur
// explication de la méthode use() plus bas (ligne 60)

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "/src/views"));

app.use(favicon(path.join(process.cwd(), 'public/assets/favicon', 'favicon.ico')));
app.use("/img" , express.static(path.join(process.cwd(), "/public/assets/img/")));
app.use('/stylesheets', express.static(path.join(process.cwd(), '/public/assets/stylesheets/')));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    jsonfile.readFile(file, (err, datas) => {
        // on vérifie nos données
        if (err) console.error(err);
        // on mélange les données avec un algorithme de Fisher-Yates
        for (let i = datas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [datas[i], datas[j]] = [datas[j], datas[i]];
        }
        // on ne garde que les 3 premières données
        datas = datas.slice(0, 3);
        res.render("layout/base", {
            template: "../pages/home",
            datas,
        });
    });
});

app.get("/liste", (req, res) => {
    jsonfile.readFile(file, (err, datas) => {
        if (err) console.error(err);
        res.render("layout/base", {
            template: "../characters/list",
            datas,
        });
    });
})

app.post("/liste", (req, res) => {
    jsonfile.readFile(file, (err, datas) => {
        if (err) console.error(err);
        if (req.body.search) {
            const search = req.body.search;
            const filteredData = datas.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
            res.render("layout/base", {
                template: "../characters/list",
                datas: filteredData,
            });
        }
        if (req.body.cat) {
            const data = req.body.cat !== "all" ? datas = datas.filter(image => image.cat === req.body.cat) : datas;
            res.render("layout/base", {
                template: "../characters/list",
                datas: data,
            });
        }
    });
});

app.get("/liste/:id", (req, res) => {
    jsonfile.readFile(file, (err, datas) => {
        if (err) console.error(err);
        const id = parseInt(req.params.id);
        const data = datas.find((item) => item.id === id);
        res.render("layout/base", {
            template: "../characters/detail",
            data,
        });
    });
});

app.get("/se-connecter", (req, res) => {
    res.render("layout/base", {
        template: "../auth/login",
    });
});

app.post('/se-connecter', (req, res) => {
    // Insert Login Code Here
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`);
  });

app.get("/se-connecter/auth", (req, res) => {
    res.render("layout/base", {
        template: "../auth/register",
    });
});

app.get("/form", (req, res) => {
    res.render("layout/base", {
        template: "../pages/form",
    });
});

app.post("/form", multer().single("img"), (req, res) => {
    let hashedArticle = {}
    bcrypt.hash(req.body.article, 10, (err, hash) => {
        if (err) console.error(err);
        hashedArticle = {hash, ...req.file, ...req.body};
        jsonfile.writeFile(articles, hashedArticle, (err) => {
            if (err) console.error(err);
        });
    });
    res.render("layout/base", {
        template: "../pages/form",
        data: req.body,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
