import { Request, Response } from "express";

export const forbiddenView = (req: Request, res: Response) => {
    res.render("layout/base", {
        template: "../error/forbidden",
    });
}

export const notFoundView = (req: Request, res: Response) => {
    res.render("layout/base", {
        template: "../error/notFound",
    });
}

