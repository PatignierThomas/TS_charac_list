import Query from "../model/Query.js";
import { hashPassword } from "../util/bcrypt.js";

export const accountView = async (req, res) => {
    const query = "SELECT username, e_mail FROM `users` WHERE username = ?";
    const values = [req.session.name];
    const [userData] = await Query.renderWithValues(query, values);
    res.render("layout/base", {
        template: "../account/dashboard",
        name: userData.username,
        email: userData.e_mail,
    });
}

export const accountPost = async (req, res) => {
    try {
        const update = "UPDATE `users` SET username = ?, e_mail = ? WHERE username = ?";
        // if (req.session.name) {
            // update = "UPDATE `users` SET username = ?, e_mail = ?, password = ? WHERE username = ?";
        //     const hash = await hashPassword(req, res);
        //     await Query.insert(update, [req.body.username, hash, req.body.email, req.session.name]);
        // }
        await Query.insert(update, [req.body.username, req.body.email, req.session.name]);
        req.session.name = req.body.username;
        req.session.email = req.body.email;
        res.render("layout/base", {
            template: "../account/dashboard",
            name: req.body.username,
            email: req.body.email,
        });
    }
    catch (err) {
        console.error(err);
    }
}