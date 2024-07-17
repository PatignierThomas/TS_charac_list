import pool from "../config/database.js";
import { RowDataPacket } from 'mysql2';

class Query {
    static render = async (query: string): Promise<RowDataPacket[]> => {
        const [datas] = await pool.execute(query);
        return datas as RowDataPacket[];
    }

    static renderWithValues = async (query: string, values: Record<string, any>): Promise<RowDataPacket[]> => {
        const [data] = await pool.execute(query, values);
        return data as RowDataPacket[];
    }

    static insert = async (query: string, values: Record<string, any>) => {
        await pool.execute(query, values);
    }
}

export default Query;