import path from "path";
import multer from "multer";
import fs from "fs";

// multer.diskStorage permet de définir le dossier de destination et le nom du fichier
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // le nom du dossier est le titre de l'article suffixé par id_ pour éviter les doublons
        // de fait chaque article aura son propre dossier d'images
        const newDirectory = path.join(
            process.cwd(),
            "public/img/id_" + req.body.title
        );
        fs.mkdirSync(newDirectory, { recursive: true });
        cb(null, newDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // ajoute un timestamp au nom du fichier pour éviter les doublons + conserve l'extension du fichier
    },
});

// la fonction multer permet de définir la taille maximale des fichiers, les extensions acceptées et le nombre de fichiers acceptés
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // limiter la taille du fichier à 5MB
    },
    fileFilter: function (req, file, cb) {
        const filetypes = /png|jpg|jpeg/; // extension de fichiers acceptées
        // test permet de vérifier si l'extension du fichier correspond à l'expression régulière
        const isExtnameValid = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        // test permet de vérifier si le type MIME du fichier correspond à l'expression régulière
        const isMimetypeValid = filetypes.test(file.mimetype);

        if (isMimetypeValid && isExtnameValid) {
            // si l'extension et le mimetype sont valides
            // on accepte le fichier
            // null correspond à l'erreur, true correspond à l'acceptation du fichier
            return cb(null, true);
        } else {
            cb("Images en png, jpg ou jpeg uniquement");
        }
    },
}).array("img", 10); // image est le nom de l'input type file -> attribut name, 10 est le nombre de fichiers acceptés maximum

export const formView = (req, res) => {
    res.render("layout/base", {
        template: "../pages/form",
    });
}

export const formPost = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.send("Taille du fichier trop élevée -> Max 5MB");
            }
            res.send(err);
        } else {
            if (!req.files.length) {
                res.send("Pas de fichiers sélectionnés");
            } else {
                res.redirect("/");
            }
        }
    });
}