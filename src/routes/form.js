import jsonfile from "jsonfile";
import bcrypt from "bcrypt";
import path from "path";

const articles = path.join(process.cwd(), "public/data/articles.json");

export const formControler = (req, res) => {
    res.render("layout/base", {
        template: "../pages/form",
    });
}

export const formPostControler = (req, res) => {
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
}