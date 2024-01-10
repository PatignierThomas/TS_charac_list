import Query from "../model/Query.js";
import bcrypt from "bcrypt";
import { hashPassword } from "../util/bcrypt.js";

export const loginView = (req, res) => {
    res.render("layout/base", {
        template: "../auth/login",
        query: req.query,
    });
}

export const loginPost = async (req, res) => {
    try {
        const query = "SELECT username, password, isAdmin FROM `users` WHERE username = ?";
        const [user] = await Query.renderWithValues(query, [req.body.username]);
        if (!user) return res.redirect("/se-connecter?error=auth");
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) console.error(err);
                if (!result) {
                    return res.redirect("/se-connecter?error=auth");
                }
                if (user.isAdmin) {
                    req.session.isAdmin = user.isAdmin;
                }
                req.session.isLogged = true;
                req.session.name = req.body.username;
                return res.redirect("/");
                
        });
    } 
    catch (err) {
        console.error(err);
    }
};

export const registerView = (req, res) => {
    res.render("layout/base", {
        template: "../auth/register",
        query: req.query,
    });
}

export const registerPost = async (req, res) => {
    try {
        const query = "SELECT username FROM `users` WHERE username = ?";
        const [user] = await Query.renderWithValues(query, [req.body.username]);
        if (user) return res.redirect("/se-connecter/auth?error=exists");
        req.session.name = req.body.username;
        const hash = await hashPassword(req, res);
        const register = "INSERT INTO `users` (username, password, isAdmin) VALUES (?, ?, ?)";
        await Query.insert(register, [req.body.username, hash, false]);
        res.redirect("/se-connecter");
    }
    catch (err) {
        console.error(err);
    }
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.error(err);
    });
    res.clearCookie('connect.sid');
    res.redirect("/");
}