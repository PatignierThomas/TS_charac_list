import bcrypt from "bcrypt";
import jsonfile from "jsonfile";
import path from "path";

const users = path.join(process.cwd(), "public/data/users.json");

export const loginView = (req, res) => {
    res.render("layout/base", {
        template: "../auth/login",
        query: req.query,
    });
}

export const loginPost = (req, res) => {
    jsonfile.readFile(users, (err, data) => {
        if (err) console.error(err);
        const user = data.find(user => user.username === req.body.username);
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) console.error(err);
            if (!result || !user) {
                return res.redirect("/se-connecter?error=auth");
            } else {
                req.session.name = req.body.username;
                req.session.isLogged = true;
                return res.redirect("/");
            }
        });
    });
};

export const registerView = (req, res) => {
    res.render("layout/base", {
        template: "../auth/register",
        query: req.query,
    });
}

export const registerPost = (req, res) => {
    jsonfile.readFile(users, (err, data) => {
        if (err) console.error(err);
        // check if username already exists
        const user = data.find(user => user.username === req.body.username);
        if (user) return res.redirect("/se-connecter/auth?error=exists");
        // create new user
        req.session.name = req.body.username;
        // hash password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) console.error(err);
            req.session.password = hash;
            const creds = { username: req.body.username, password: hash };
            data.push(creds);
            jsonfile.writeFile(users, data, (err) => {
                if (err) console.error(err);
            });
            res.redirect("/se-connecter");
        });
    });
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.error(err);
    });
    res.clearCookie('connect.sid');
    res.redirect("/");
}