import pool from "../bd/Pool.js";

const index = async (req, res) => {
    // #swagger.tags = ['Publicaciones']
    try {
        const sql = "SELECT * FROM publicaciones";
        const [response] = await pool.execute(sql);
        res.status(200).json(response);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const show = async (req, res) => {
    // #swagger.tags = ['Publicaciones']
    try {
        const sql = "SELECT * FROM publicaciones WHERE id = ?";
        const [[response]] = await pool.execute(sql, [req.params.id]);
        if (!response) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const store = async (req, res) => {
    // #swagger.tags = ['Publicaciones']
    const required = ["titulo", "contenido", "usuario_id"];
    try {
        const { body } = req;
        const validate = required.filter(field => !(field in body));
        if (validate.length !== 0) {
            throw { message: `Los campos ${validate.join(', ')} son requeridos`, status: 400 };
        }

        const sql = "INSERT INTO publicaciones (titulo, contenido, usuario_id) VALUES (?, ?, ?)";
        await pool.execute(sql, [body.titulo, body.contenido, body.usuario_id]);
        res.status(201).json({ message: "Publicación creada exitosamente" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    // #swagger.tags = ['Publicaciones']
    try {
        const { body, params } = req;
        const sql = "UPDATE publicaciones SET titulo = ?, contenido = ? WHERE id = ?";
        const result = await pool.execute(sql, [body.titulo, body.contenido, params.id]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }
        res.status(200).json({ message: "Publicación actualizada exitosamente" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const destroy = async (req, res) => {
    // #swagger.tags = ['Publicaciones']
    try {
        const sql = "DELETE FROM publicaciones WHERE id = ?";
        const result = await pool.execute(sql, [req.params.id]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }
        res.status(200).json({ message: "Publicación eliminada exitosamente" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const filterByCategory = async (req, res) => {
    // #swagger.tags = ['Publicaciones']
    const { categoryId } = req.params;
    try {
        const sql = `
            SELECT p.* FROM publicaciones p
            JOIN categorias_publicaciones cp ON p.id = cp.publicacion_id
            WHERE cp.categoria_id = ?;
        `;
        const [response] = await pool.execute(sql, [categoryId]);
        res.status(200).json(response);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

// Add search functionality
const search = async (req, res) => {
    // #swagger.tags = ['Publicaciones']
    const { title } = req.query;
    try {
        const sql = "SELECT * FROM publicaciones WHERE titulo LIKE ?";
        const [response] = await pool.execute(sql, [`%${title}%`]);
        res.status(200).json(response);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

export { index, show, store, update, destroy, filterByCategory, search };
