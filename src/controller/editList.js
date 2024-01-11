import Query from "../model/Query.js";

export const editorView = async (req, res) => {
    const query = "SELECT id, src, alt, title, cat, description FROM `characters` WHERE id = ?";
    const values = [req.params.id];
    const [data] = await Query.renderWithValues(query, values);
    const query2 = "SELECT DISTINCT cat FROM `characters`";
    let categories = await Query.render(query2);
    res.render("layout/base", {
        template: "../admin/editList",
        data,
        categories,
    });
}

export const editorPost = async (req, res) => {
    const query = "UPDATE `characters` SET src = ?, alt = ?, title = ?, cat = ?, description = ? WHERE id = ?";
    const values = [req.files[0].path, req.body.alt, req.body.title, req.body.cat, req.body.description, req.params.id];
    await Query.insert(query, values);
    res.redirect("/admin/liste");
}