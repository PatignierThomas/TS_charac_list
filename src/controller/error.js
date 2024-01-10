export const forbiddenView = (req, res) => {
    res.render("layout/base", {
        template: "../error/forbidden",
    });
}

export const notFoundView = (req, res) => {
    res.render("layout/base", {
        template: "../error/notFound",
    });
}

