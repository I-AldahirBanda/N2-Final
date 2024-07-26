import pool from "../bd/Pool.js";

const validateRole = async (user_id) => {
    const userSql = "SELECT rol_id FROM usuarios WHERE id = ?";
    const [rs] = await pool.execute(userSql, [user_id]);
    if (rs[0].rol_id !== 2) { 
        throw { message: "Usuario no autorizado", status: 401 };
    }
};

const index = async (req, res) => {
    // #swagger.tags = ['Usuarios']
    try {
        await validateRole(req.headers.user_id);

        const sql = "SELECT * FROM usuarios";
        const [response] = await pool.execute(sql);
        res.status(200).json(response);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const show = async (req, res) => {
    // #swagger.tags = ['Usuarios']
    try {
        await validateRole(req.headers.user_id);

        const sql = "SELECT * FROM usuarios WHERE id = ?";
        const [[response]] = await pool.execute(sql, [req.params.id]);
        if (!response) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const store = async (req, res) => {
    // #swagger.tags = ['Usuarios']
    const required = ["nombre", "email", "password", "rol_id"];
    try {
        const { body } = req;
        const validate = required.filter(field => !(field in body));
        if (validate.length !== 0) {
            throw { message: `Los campos ${validate.join(', ')} son requeridos`, status: 400 };
        }

        const sql = "INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)";
        await pool.execute(sql, [body.nombre, body.email, body.password, body.rol_id]);
        res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    // #swagger.tags = ['Usuarios']
    try {
        const { body, params } = req;
        const sql = "UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol_id = ? WHERE id = ?";
        const result = await pool.execute(sql, [body.nombre, body.email, body.password, body.rol_id, params.id]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const destroy = async (req, res) => {
    // #swagger.tags = ['Usuarios']
    try {
        await validateRole(req.headers.user_id);

        const sql = "DELETE FROM usuarios WHERE id = ?";
        const result = await pool.execute(sql, [req.params.id]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

export { index, show, store, update, destroy };
