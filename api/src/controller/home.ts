import Query from "../model/Query.js";
import { Request, Response } from 'express';


export default async (req: Request, res: Response) => {
    try {
        const query = "SELECT id, src, alt, title, cat FROM `characters`";
        let datas = await Query.render(query)
        // on mélange les données avec un algorithme de Fisher-Yates
        for (let i = datas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [datas[i], datas[j]] = [datas[j], datas[i]];
        }
        datas = datas.slice(0, 3);
        res.render("layout/base", {
            template: "../pages/home",
            datas,
        });
    }
    catch (err) {
        console.error(err);
    }
};