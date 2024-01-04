export const forbiddenView = (req, res) => {
    res.render("layout/base", {
        template: "../error/forbidden",
    });
}

