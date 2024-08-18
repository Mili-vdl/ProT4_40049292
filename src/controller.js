import { pool } from "./database.js";

class LibroController {
  async getAll(req, res) {
    const [result] = await pool.query("SELECT * FROM libros");
    res.json(result);
  }

  async add(req, res) {
    const libro = req.body;
    const [result] = await pool.query(
      `INSERT INTO Libros(nombre, autor, categoria, fecha, isbn) VALUES (?, ?, ?, ?, ?)`,
      [libro.nombre, libro.autor, libro.categoria, libro.fecha, libro.isbn]
    );

    res.json({ "Id insertado": result.insertId });
  }
}

export const libro = new LibroController();
