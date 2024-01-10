import pool from "../config/database.js";

class Query {
    static render = async (query) => {
        const [datas] = await pool.execute(query);
        return datas;
    }

    static renderWithValues = async (query, values) => {
        const [data] = await pool.execute(query, values);
        return data;
    }

    static insert = async (query, values) => {
        await pool.execute(query, values);
    }
}

export default Query;