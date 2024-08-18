import { pool } from "./database.js";

class LibroController {
  async getAll(req, res) {
    const [result] = await pool.query("SELECT * FROM libros");
    res.json(result);
  }

  async getOne(req, res) {
    try {
      const libro = req.body;
      if (!libro.isbn) {
        return res.status(400).json({ error: "El campo 'isbn' es requerido" });
      }
      const [result] = await pool.query(
        `SELECT * FROM Libros WHERE isbn =(?)`,
        [libro.isbn]
      );
      if (result.length === 0) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener el libro");
    }
  }

  async add(req, res) {
    try {
      const libro = req.body;
      if (
        !libro.nombre ||
        !libro.autor ||
        !libro.categoria ||
        !libro.fecha ||
        !libro.isbn
      ) {
        return res
          .status(400)
          .json({ message: "Todos los campos son requeridos." });
      }
      const [result] = await pool.query(
        `INSERT INTO Libros(nombre, autor, categoria, fecha, isbn) VALUES (?, ?, ?, ?, ?)`,
        [libro.nombre, libro.autor, libro.categoria, libro.fecha, libro.isbn]
      );
      res.json({ "Id insertado": result.insertId });
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json({ message: "Ya existe un libro con ese ISBN." });
      }
      console.error(error);
      res.status(500).send("Error al insertar el libro");
    }
  }

  async delete(req, res) {
    try {
      const libro = req.body;
      if (!libro.id) {
        return res.status(400).json({ error: "El campo 'id' es requerido" });
      }
      const [result] = await pool.query(`DELETE FROM Libros WHERE id=(?)`, [
        libro.id,
      ]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }
      res.json({ "Registros eliminados": result.affectedRows });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al eliminar el libro");
    }
  }

  async deleteISBN(req, res) {
    try {
      const libro = req.body;
      if (!libro.isbn) {
        return res.status(400).json({ error: "El campo 'isbn' es requerido" });
      }
      const [result] = await pool.query(`DELETE FROM Libros WHERE isbn=(?)`, [
        libro.isbn,
      ]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }
      res.json({ "Registros eliminados": result.affectedRows });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al eliminar el libro");
    }
  }

  async update(req, res) {
    try {
      const libro = req.body;
      const [result] = await pool.query(
        `UPDATE Libros SET nombre =(?), autor =(?), categoria =(?), fecha =(?), isbn =(?) WHERE id =(?)`,
        [
          libro.nombre,
          libro.autor,
          libro.categoria,
          libro.fecha,
          libro.isbn,
          libro.id,
        ]
      );
      if (result.changedRows === 0) {
        return res.status(404).json({ message: "Libro no encontrado" });
      }
      res.json({ "Registros actualizados": result.changedRows });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al actualizar el libro");
    }
  }
}

export const libro = new LibroController();
