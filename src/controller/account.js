export const accountView = (req, res) => {
    res.render("layout/base", {
        template: "../account/dashboard",
    });
}