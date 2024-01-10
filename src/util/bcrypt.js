import bcrypt from "bcrypt";

export const hashPassword = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        req.session.password = hash;
        return hash;
    } catch (err) {
        console.error(err);
        throw err;
    }
}