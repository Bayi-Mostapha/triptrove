import express from "express";
import {
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
} from "../controllers/property.controller.js";
import { verifyToken } from "../controllers/verifytoken.js";
import { verifyTokenAdmin } from "../controllers/verifytokenadmin.js";

const router = express.Router();

// GET  all properties for the admin 
router.get("/get", verifyTokenAdmin, getAllProperties);

// GET a property by ID
router.get("/:id", getProperty);

// POST a new property (requires authentication)
router.post("/", verifyToken, createProperty);

// PUT update an existing property (requires authentication)
router.put("/:id", verifyToken, updateProperty);

// DELETE a property by ID (requires authentication)
router.delete("/:id", verifyToken, deleteProperty);

export default router;
