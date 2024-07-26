import pool from "../bd/Pool.js";

const index = async (req, res) => {
    // #swagger.tags = ['Comentarios']
    try {
        const sql = "SELECT * FROM comentarios";
        const [response] = await pool.execute(sql);
        res.status(200).json(response);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const show = async (req, res) => {
    // #swagger.tags = ['Comentarios']
    try {
        const sql = "SELECT * FROM comentarios WHERE id = ?";
        const [[response]] = await pool.execute(sql, [req.params.id]);
        if (!response) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const store = async (req, res) => {
    // #swagger.tags = ['Comentarios']
    const required = ["contenido", "usuario_id", "publicacion_id"];
    try {
        const { body } = req;
        const validate = required.filter(field => !(field in body));
        if (validate.length !== 0) {
            throw { message: `Los campos ${validate.join(', ')} son requeridos`, status: 400 };
        }

        const sql = "INSERT INTO comentarios (contenido, usuario_id, publicacion_id) VALUES (?, ?, ?)";
        await pool.execute(sql, [body.contenido, body.usuario_id, body.publicacion_id]);
        res.status(201).json({ message: "Comentario creado exitosamente" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    // #swagger.tags = ['Comentarios']
    try {
        const { body, params } = req;
        const sql = "UPDATE comentarios SET contenido = ? WHERE id = ?";
        const result = await pool.execute(sql, [body.contenido, params.id]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        res.status(200).json({ message: "Comentario actualizado exitosamente" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const destroy = async (req, res) => {
    // #swagger.tags = ['Comentarios']
    try {
        const sql = "DELETE FROM comentarios WHERE id = ?";
        const result = await pool.execute(sql, [req.params.id]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        res.status(200).json({ message: "Comentario eliminado exitosamente" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

export { index, show, store, update, destroy };
