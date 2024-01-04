export const adminView = (req, res) => {
    res.render("layout/base", {
        template: "../admin/adminPanel",
    });
}