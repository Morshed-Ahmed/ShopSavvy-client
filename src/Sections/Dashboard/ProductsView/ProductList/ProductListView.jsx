import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FaPrint, FaRegFileExcel, FaEdit, FaTrashAlt } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [units, setUnits] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingUnits, setLoadingUnits] = useState(true);
  const [loadingSubcategories, setLoadingSubcategories] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProductData, setEditedProductData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchBrands();
    fetchUnits();
    fetchSubcategories();
  }, [searchTerm]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://shopsavvy-backend-srh8.onrender.com/product/categories/",
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
      setLoadingCategories(false);
    } catch (error) {
      setError(error.message);
      setLoadingCategories(false);
    }
  };

  const fetchProducts = async () => {
    try {
      let url = "https://shopsavvy-backend-srh8.onrender.com/product/products/";
      if (searchTerm) url += `?search=${encodeURIComponent(searchTerm)}`;
      const response = await fetch(url, {
        headers: { Authorization: `Token ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
      setLoadingProducts(false);
    } catch (error) {
      setError(error.message);
      setLoadingProducts(false);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch(
        "https://shopsavvy-backend-srh8.onrender.com/product/brands/",
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch brands");
      const data = await response.json();
      setBrands(data);
      setLoadingBrands(false);
    } catch (error) {
      setError(error.message);
      setLoadingBrands(false);
    }
  };

  const fetchUnits = async () => {
    try {
      const response = await fetch(
        "https://shopsavvy-backend-srh8.onrender.com/product/units/",
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch units");
      const data = await response.json();
      setUnits(data);
      setLoadingUnits(false);
    } catch (error) {
      setError(error.message);
      setLoadingUnits(false);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch(
        "https://shopsavvy-backend-srh8.onrender.com/product/subcategories/",
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch subcategories");
      const data = await response.json();
      setSubcategories(data);
      setLoadingSubcategories(false);
    } catch (error) {
      setError(error.message);
      setLoadingSubcategories(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportToExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(productsWithDetails);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Products");
    XLSX.writeFile(workBook, "products.xlsx");
  };

  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    setEditingProductId(id);
    setEditedProductData(product);
    setOpenEditDialog(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://shopsavvy-backend-srh8.onrender.com/product/products/${id}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Token ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to delete product");
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateProduct = async () => {
    // console.log("Attempting to update product:", editingProductId);
    // console.log("Data being sent:", JSON.stringify(editedProductData));

    try {
      const response = await fetch(
        `https://shopsavvy-backend-srh8.onrender.com/product/products/${editingProductId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(editedProductData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update Product Error:", errorData);
        throw new Error(
          `Failed to update product: ${errorData.detail || response.statusText}`
        );
      }

      // console.log("Product updated successfully");
      alert("Product updated successfully");
      setOpenEditDialog(false);
      fetchProducts(); // Refresh product list after update
    } catch (error) {
      console.error("Update Product Error:", error);
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProductData({ ...editedProductData, [name]: value });
  };

  if (
    loadingCategories ||
    loadingProducts ||
    loadingBrands ||
    loadingUnits ||
    loadingSubcategories
  )
    return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={params.row.image_url}
            alt={params.row.name}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              marginRight: 10,
            }}
          />
          <span>{params.row.name}</span>
        </div>
      ),
    },
    { field: "category", headerName: "Category", width: 130 },
    { field: "subcategory", headerName: "Subcategory", width: 120 },
    { field: "brand", headerName: "Brand", width: 130 },
    { field: "unit", headerName: "Unit", width: 130 },
    { field: "sku", headerName: "SKU", width: 130 },
    { field: "min_quantity", headerName: "Min Quantity", width: 130 },
    { field: "quantity", headerName: "Quantity", width: 130 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "tax", headerName: "Tax", width: 100 },
    { field: "discount_type", headerName: "Discount Type", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() => handleEdit(params.row.id)}
            startIcon={<FaEdit />}
            size="small"
            variant="outlined"
            style={{ marginRight: 8, padding: "2px" }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(params.row.id)}
            startIcon={<FaTrashAlt />}
            size="small"
            variant="outlined"
            color="secondary"
            style={{ padding: "5px" }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const productsWithDetails = products.map((product) => ({
    ...product,
    category:
      categories.find((category) => category.id === product.category)?.name ||
      "Unknown Category",
    brand:
      brands.find((brand) => brand.id === product.brand)?.name ||
      "Unknown Brand",
    unit:
      units.find((unit) => unit.id === product.unit)?.name || "Unknown Unit",
    subcategory:
      subcategories.find(
        (subcategory) => subcategory.id === product.subcategory
      )?.name || "Unknown Subcategory",
  }));

  return (
    <div style={{ height: 700, width: "100%" }}>
      <h1>Product List</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          <IconButton onClick={handlePrint}>
            <FaPrint />
          </IconButton>
          <IconButton onClick={handleExportToExcel}>
            <FaRegFileExcel />
          </IconButton>
        </div>
      </div>
      <DataGrid
        rows={productsWithDetails}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="dense"
            value={editedProductData.name || ""}
            onChange={handleInputChange}
          />
          <TextField
            name="category"
            label="Category"
            fullWidth
            margin="dense"
            select
            SelectProps={{ native: true }}
            value={editedProductData.category || ""}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </TextField>
          <TextField
            name="subcategory"
            label="Subcategory"
            fullWidth
            margin="dense"
            select
            SelectProps={{ native: true }}
            value={editedProductData.subcategory || ""}
            onChange={handleInputChange}
          >
            <option value="">Select a subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </TextField>
          <TextField
            name="brand"
            label="Brand"
            fullWidth
            margin="dense"
            select
            SelectProps={{ native: true }}
            value={editedProductData.brand || ""}
            onChange={handleInputChange}
          >
            <option value="">Select a brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </TextField>
          <TextField
            name="unit"
            label="Unit"
            fullWidth
            margin="dense"
            select
            SelectProps={{ native: true }}
            value={editedProductData.unit || ""}
            onChange={handleInputChange}
          >
            <option value="">Select a unit</option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </TextField>
          <TextField
            name="sku"
            label="SKU"
            fullWidth
            margin="dense"
            value={editedProductData.sku || ""}
            onChange={handleInputChange}
          />
          <TextField
            name="min_quantity"
            label="Min Quantity"
            fullWidth
            margin="dense"
            value={editedProductData.min_quantity || ""}
            onChange={handleInputChange}
          />
          <TextField
            name="quantity"
            label="Quantity"
            fullWidth
            margin="dense"
            value={editedProductData.quantity || ""}
            onChange={handleInputChange}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            margin="dense"
            value={editedProductData.description || ""}
            onChange={handleInputChange}
          />
          <TextField
            name="tax"
            label="Tax"
            fullWidth
            margin="dense"
            value={editedProductData.tax || ""}
            onChange={handleInputChange}
          />
          <TextField
            name="discount_type"
            label="Discount Type"
            fullWidth
            margin="dense"
            select
            SelectProps={{ native: true }}
            value={editedProductData.discount_type || ""}
            onChange={handleInputChange}
          >
            <option value="">Select a discount type</option>
            <option value="percentage">Percentage</option>
            <option value="amount">Amount</option>
          </TextField>
          <TextField
            name="price"
            label="Price"
            fullWidth
            margin="dense"
            value={editedProductData.price || ""}
            onChange={handleInputChange}
          />
          <TextField
            name="status"
            label="Status"
            fullWidth
            margin="dense"
            select
            SelectProps={{ native: true }}
            value={editedProductData.status || ""}
            onChange={handleInputChange}
          >
            <option value="">Select a status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateProduct} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductList;
