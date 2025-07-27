import jwt from 'jsonwebtoken'

export const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({ success: false, message: 'Not authorized. Login again.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.userId = tokenDecode.id; // <-- FIXED
            next();
        } else {
            return res.json({ success: false, message: "Not authorized" });
        }

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}