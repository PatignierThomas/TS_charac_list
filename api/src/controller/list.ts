import Query from "../model/Query.js";
import { Request, Response } from 'express';    

export default async (req: Request, res: Response) => {
    try {
        const query = "SELECT id, src, alt, title, cat FROM `characters`";
        let datas = await Query.render(query)
        const categories = [...new Set(datas.map((item) => item.cat))];
        res.render("layout/base", {
            template: "../characters/list",
            datas,
            categories,
        });
    }
    catch (err) {
        console.error(err);
    }
};

export const listPost = async (req: Request, res: Response) => {
    try {
        if (req.body.delete) {
            const query = "DELETE FROM `characters` WHERE id = ?";
            const id = parseInt(req.body.delete);
            await Query.renderWithValues(query, [id]);
        }
        const query = "SELECT id, src, alt, title, cat FROM `characters`";
        let datas = await Query.render(query)
        const categories = [...new Set(datas.map((item) => item.cat))];
        if (req.body.search) {
            const search = req.body.search;
            datas = datas.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
        }
        if (req.body.cat) {
            datas = req.body.cat !== "all" ? datas = datas.filter(image => image.cat === req.body.cat) : datas;
        }
        res.render("layout/base", {
            template: "../characters/list",
            datas,
            categories,
        });
    }
    catch (err) {
        console.error(err);
    }
};

export const detailView = async (req: Request, res: Response) => {
    try {
        const query = "SELECT src, alt, title, cat, description FROM `characters` WHERE id = ?";
        const id = parseInt(req.params.id);
        const [data] = await Query.renderWithValues(query, [id])
        res.render("layout/base", {
            template: "../characters/detail",
            data,
        });
    }
    catch (err) {
        console.error(err);
    }
};
