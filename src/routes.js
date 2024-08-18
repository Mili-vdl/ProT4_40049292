import { Router } from "express";
import { libro } from "./controller.js";

export const router = Router();

router.get("/libros", libro.getAll);
router.get("/libroisbn", libro.getOne);
router.post("/libro", libro.add);
router.delete("/libro", libro.delete);
router.delete("/libroisbn", libro.deleteISBN);
router.put("/libro", libro.update);
