import { Request, Response } from "express";
import { HTTP_STATUS } from "../utils/statusCodes";
import {
  addNewProduct,
  updateProductById,
  deleteProductById,
  fetchAllProducts,
  fetchProductById,
} from "../services/product";

// #region admin routes

/**
 * @desc Add a new product
 * @route POST /product/admin/add
 * @access private (Admin only)
 */
export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, imageUrl, stock } = req.body;

    //Input validation
    if (!name || !description || !price || stock === undefined) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, message: "All product fields are required" });
      return;
    }

    if (price <= 0) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Price must be greater than 0", success: false });
      return;
    }
    if (stock < 0) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Stock can not be negative", success: false });
      return;
    }
    const product = await addNewProduct({
      name,
      description,
      price,
      imageUrl,
      stock,
    });

    res
      .status(HTTP_STATUS.CREATED)
      .json({ success: true, message: "Product added", data: { product } });
  } catch (err) {
    console.error("Error while adding product ", err);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to add product" });
    return;
  }
};

/**
 * @desc Update existing product
 * @route PUT products/admin/:id
 * @access private (Admin only)
 */
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, imageUrl, stock, isAvailable } = req.body;
    const productId = req.params.id;
    //input validation
    if (!productId) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Product id is required",
        success: false,
      });
      return;
    }
    const updated = await updateProductById(req.params.id, {
      name,
      description,
      price,
      imageUrl,
      stock,
      isAvailable,
    });

    if (!updated) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ success: false, message: "Product not found" });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Product updated",
      product: updated,
    });
    return;
  } catch (err) {
    console.error("Error while updating product :", err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update product",
    });
    return;
  }
};

/**
 * @route DELETE product/admin/:id
 * @desc Delete product
 * @access private (Admin only)
 */
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.id;
    if (!productId) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, message: "Product Id is required" });
    }

    const deleted = await deleteProductById(productId);
    if (!deleted) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ success: false, message: "Product not found" });
      return;
    }
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("Error while deleting product :");
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to delete product" });
  }
};

//#endregion

//#region customer routes

/**
 * @route GET /product/
 * @desc Get all Products
 * @access public
 */
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await fetchAllProducts();

    if (!products || products.length === 0) {
      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: "No products found, please add new" });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: "Products fetched successfully",
      data: products,
      success: true,
    });
  } catch (err) {
    console.error("Error fetching Products: ", err);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to fetch products" });
  }
};
/**
 * @route GET product/:id
 * @desc Get product by id
 * @access public
 */
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = req.params.id;
    if (!productId) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ success: false, message: "Product Id is required" });
    }
    const product = await fetchProductById(req.params.id);

    if (!product) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ success: false, message: "Product not found" });
      return;
    }
  } catch (err) {
    console.error("Error while fetching product by Id : ", err);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to fetch product" });
  }
};
//#endregion
