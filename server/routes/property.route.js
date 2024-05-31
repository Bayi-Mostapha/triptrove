import express from "express";
import {
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getProperties,
  getPropertyLocation,
  deleteAdminProperties,
  uploadImages,
} from "../controllers/property.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";
import { verifyTokenAdmin } from "../controllers/verifytokenadmin.js";
import multer from 'multer';
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post("/images/:id",verifyToken , upload.array('image', 10), uploadImages);

router.get("/", getProperties);

// DELETE a property by admin
router.delete("/admin", verifyTokenAdmin, deleteAdminProperties);

// GET  all properties for the admin 
router.get("/get", verifyTokenAdmin, getAllProperties);

// GET a property by ID
router.get("/:id", getProperty);

router.get("/location/:city", getPropertyLocation);

// POST a new property (requires authentication)
router.post("/", verifyToken, createProperty);

// PUT update an existing property (requires authentication)
router.put("/:id", verifyToken, updateProperty);

// DELETE a property by ID (requires authentication)
router.delete("/:id", verifyToken, deleteProperty);



export default router;
