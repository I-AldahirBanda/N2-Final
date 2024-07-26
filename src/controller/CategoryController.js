import pool from "../bd/Pool.js";

const index = async (req, res) => {
    // #swagger.tags = ['Categorías']
    try {
        const sql = "SELECT * FROM categorias";
        const [response] = await pool.execute(sql);
        res.status(200).json(response);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const show = async (req, res) => {
    // #swagger.tags = ['Categorías']
    try {
        const sql = "SELECT * FROM categorias WHERE id = ?";
        const [[response]] = await pool.execute(sql, [req.params.id]);
        if (!response) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const store = async (req, res) => {
    // #swagger.tags = ['Categorías']
    try {
        const { body } = req;
        const sql = "INSERT INTO categorias (nombre) VALUES (?)";
        await pool.execute(sql, [body.nombre]);
        res.status(201).json({ message: "Categoría creada exitosamente" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    // #swagger.tags = ['Categorías']
    try {
        const { body, params } = req;
        const sql = "UPDATE categorias SET nombre = ? WHERE id = ?";
        const result = await pool.execute(sql, [body.nombre, params.id]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.status(200).json({ message: "Categoría actualizada exitosamente" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const destroy = async (req, res) => {
    // #swagger.tags = ['Categorías']
    try {
        const sql = "DELETE FROM categorias WHERE id = ?";
        const result = await pool.execute(sql, [req.params.id]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        res.status(200).json({ message: "Categoría eliminada exitosamente" });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

export { index, show, store, update, destroy };
