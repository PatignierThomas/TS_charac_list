import Query from "../model/Query.js";

export const adminView = async (req, res) => {
    const query = "SELECT username FROM `users`";
    const users = await Query.render(query);
    res.render("layout/base", {
        template: "../admin/adminPanel",
        users,
    });
}

export const adminCharacterView = async (req, res) => {
    const query = "SELECT id, src, alt, title, cat FROM `characters`";
    let datas = await Query.render(query)
    const categories = [...new Set(datas.map((item) => item.cat))];
    res.render("layout/base", {
        template: "../characters/list-admin",
        datas,
        categories,
    });
}

export const adminCharacterPost = async (req, res) => {
    const query = "INSERT INTO `characters` (src, alt, title, cat, description) VALUES (?, ?, ?, ?, ?)";
    console.log(req.files);
    const values = [req.files[0].path, req.body.alt, req.body.title, req.body.cat, req.body.description];
    await Query.insert(query, values);
    res.redirect("/admin/liste");
}