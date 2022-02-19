import db from "../db";

const createProduct = async (data) => {
  const product = { type: "product", ...data };
  const { id } = await db.save(product);
  const productData = { id, ...product };
  return productData;
};

const getProducts = async () => {
  const products = await db.find({ type: "product" });
  return products;
};

export default { createProduct, getProducts };
