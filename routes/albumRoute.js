import { Router } from "express";
import { getAlbums,addAlbum,deleteAlbum,changeImage } from "../controllers/albumController.js";
import upload from "../middleware/multerConfig.js";
import { verifyCaptcha } from "../middleware/verifyCaptcha.js";

const router = Router();

router.get("/albums", getAlbums);
router.post("/add", upload.single("jacket"), verifyCaptcha, addAlbum);
router.delete("/delete/:id", deleteAlbum);
router.patch("/update/:id", upload.single("jacket"), changeImage);

export default router;