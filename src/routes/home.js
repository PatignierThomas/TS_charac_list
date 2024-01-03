import jsonfile from "jsonfile";
import path from "path";

const file = path.join(process.cwd(), "public/data/datas.json");

export default (req, res) => {
    jsonfile.readFile(file, (err, datas) => {
        // on vérifie nos données
        if (err) console.error(err);
        // on mélange les données avec un algorithme de Fisher-Yates
        for (let i = datas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [datas[i], datas[j]] = [datas[j], datas[i]];
        }
        // on ne garde que les 3 premières données
        datas = datas.slice(0, 3);
        res.render("layout/base", {
            template: "../pages/home",
            datas,
        });
    });
};