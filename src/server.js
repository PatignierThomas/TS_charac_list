// import ES6
import express from "express";
import path from "path";
import favicon from "serve-favicon";
import multer from "multer";

import homeControler from "./controller/home.js";
import listControler, { detailControler, listPostControler } from "./controller/list.js";
import { loginControler, loginPostControler, registerControler } from "./controller/login.js";
import { formControler, formPostControler } from "./controller/form.js";

import router from "./router/index.route.js";

// Création de l'application express
const app  = express();
const PORT = 9000;


// favicon -> icône du site dans l'onglet du navigateur
// explication de la méthode use() plus bas (ligne 60)

const authRouter = express.Router();
const characterRouter = express.Router();
const formRouter = express.Router();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "/src/views"));

app.use(favicon(path.join(process.cwd(), 'public/assets/favicon', 'favicon.ico')));
app.use("/img" , express.static(path.join(process.cwd(), "/public/assets/img/")));
app.use('/stylesheets', express.static(path.join(process.cwd(), '/public/assets/stylesheets/')));
app.use(express.urlencoded({ extended: false }));

app.use("/liste", characterRouter);
app.use("/se-connecter", authRouter);
app.use("/form", formRouter);

app.use(router)

// app.get("/", homeControler);

// characterRouter.get("/", listControler)

// characterRouter.post("/", listPostControler);

// characterRouter.get("/:id", detailControler);

// authRouter.get("/", loginControler);

// authRouter.post('/', loginPostControler);

// authRouter.get("/auth", registerControler);

// formRouter.get("/", formControler);

// formRouter.post("/", formPostControler);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
