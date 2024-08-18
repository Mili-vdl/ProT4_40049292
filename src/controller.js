import { pool } from "./database.js";

class LibroController {
  async getAll(req, res) {
    const [result] = await pool.query("SELECT * FROM libros");
    res.json(result);
  }

  async getOne(req, res) {
    const libro = req.body;
    const [result] = await pool.query(`SELECT * FROM Libros WHERE isbn =(?)`, [
      libro.isbn,
    ]);
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

  async delete(req, res) {
    const libro = req.body;
    const [result] = await pool.query(`DELETE FROM Libros WHERE id=(?)`, [
      libro.id,
    ]);
    res.json({ "Registros eliminados": result.affectedRows });
  }

  async deleteISBN(req, res) {
    const libro = req.body;
    const [result] = await pool.query(`DELETE FROM Libros WHERE isbn=(?)`, [
      libro.isbn,
    ]);
    res.json({ "Registros eliminados": result.affectedRows });
  }

  async update(req, res) {
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
    res.json({ "Registros actualizados": result.changedRows });
  }
}

export const libro = new LibroController();
