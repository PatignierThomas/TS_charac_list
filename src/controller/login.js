export const loginControler = (req, res) => {
    res.render("layout/base", {
        template: "../auth/login",
    });
}

export const loginPostControler = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`);
}

export const registerControler = (req, res) => {
    res.render("layout/base", {
        template: "../auth/register",
    });
}

// export const registerPostControler = (req, res) => {
//     let username = req.body.username;
//     let password = req.body.password;
//     res.send(`Username: ${username} Password: ${password}`);
// }