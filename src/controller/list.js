import jsonfile from "jsonfile";
import path from "path";

const file = path.join(process.cwd(), "public/data/datas.json");

export default (req, res) => {
    jsonfile.readFile(file, (err, datas) => {
        if (err) console.error(err);
        res.render("layout/base", {
            template: "../characters/list",
            datas,
        });
    });
};

export const listPost = (req, res) => {
    jsonfile.readFile(file, (err, datas) => {
        if (err) console.error(err);
        if (req.body.search) {
            const search = req.body.search;
            const filteredData = datas.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
            res.render("layout/base", {
                template: "../characters/list",
                datas: filteredData,
            });
        }
        if (req.body.cat) {
            const data = req.body.cat !== "all" ? datas = datas.filter(image => image.cat === req.body.cat) : datas;
            res.render("layout/base", {
                template: "../characters/list",
                datas: data,
            });
        }
    });
};

export const detailView = (req, res) => {
    jsonfile.readFile(file, (err, datas) => {
        if (err) console.error(err);
        const id = parseInt(req.params.id);
        const data = datas.find((item) => item.id === id);
        res.render("layout/base", {
            template: "../characters/detail",
            data,
        });
    });
};
