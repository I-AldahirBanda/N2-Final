import pool from "../bd/Pool.js";

const validateRole = async (user_id) => {
    const userSql = "SELECT rol_id FROM usuarios WHERE id = ?";
    const [rs] = await pool.execute(userSql, [user_id]);
    if (rs[0].rol_id !== 2) { 
        throw { message: "Usuario no autorizado", status: 401 };
    }
};

const index = async (req, res) => {
    // #swagger.tags = ['Roles']
    try {
        await validateRole(req.headers.user_id);

        const sql = "SELECT * FROM roles";
        const [response] = await pool.execute(sql);
        res.status(200).json(response);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const show = async (req, res) => {
    // #swagger.tags = ['Roles']
    try {
        await validateRole(req.headers.user_id);

        const sql = "SELECT * FROM roles WHERE id = ?";
        const [[response]] = await pool.execute(sql, [req.params.id]);
        if (!response) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const store = async (req, res) => {
    // #swagger.tags = ['Roles']
    try {
        await validateRole(req.headers.user_id);
        
        const { body } = req;
        const sql = "INSERT INTO roles (nombre) VALUES (?)";
        await pool.execute(sql, [body.nombre]);
        res.status(201).json({ message: "Rol creado exitosamente" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    // #swagger.tags = ['Roles']
    try {
        await validateRole(req.headers.user_id);

        const { body, params } = req;
        const sql = "UPDATE roles SET nombre = ? WHERE id = ?";
        const result = await pool.execute(sql, [body.nombre, params.id]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }
        res.status(200).json({ message: "Rol actualizado exitosamente" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const destroy = async (req, res) => {
    // #swagger.tags = ['Roles']
    try {
        await validateRole(req.headers.user_id);

        const sql = "DELETE FROM roles WHERE id = ?";
        const result = await pool.execute(sql, [req.params.id]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }
        res.status(200).json({ message: "Rol eliminado exitosamente" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

export { index, show, store, update, destroy };
