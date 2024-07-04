import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const FormContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const ResponsiveForm = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const SuccessMessage = styled.p`
  color: green;
`;

const DropzoneContainer = styled.div`
  border: 2px dashed #ccc;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
`;

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    brand: "",
    unit: "",
    sku: "",
    min_quantity: "",
    quantity: "",
    description: "",
    tax: "",
    discount_type: "percentage",
    price: "",
    status: "active",
    image_url: "",
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [units, setUnits] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("token");

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchOptions("categories", setCategories);
    fetchOptions("subcategories", setSubcategories);
    fetchOptions("brands", setBrands);
    fetchOptions("units", setUnits);
  }, []);

  const fetchOptions = async (endpoint, setState) => {
    try {
      const response = await fetch(
        `https://shopsavvy-backend-srh8.onrender.com/product/${endpoint}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
      }
      const data = await response.json();

      setState(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImageFile(file);
      setFormData({
        ...formData,
        image_url: URL.createObjectURL(file),
      });
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!imageFile) {
      setError("Please upload an image.");
      return;
    }

    try {
      const imageData = new FormData();
      imageData.append("image", imageFile);

      const imgbbResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const imgbbData = await imgbbResponse.json();

      if (!imgbbResponse.ok) {
        throw new Error("Failed to upload image to imgbb");
      }

      const payload = {
        ...formData,
        image_url: imgbbData.data.url,
        category: formData.category,
        subcategory: formData.subcategory,
        brand: formData.brand,
        unit: formData.unit,
        user: localStorage.getItem("user_id"),
      };
      console.log(payload);

      const response = await fetch(
        "https://shopsavvy-backend-srh8.onrender.com/product/products/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Response Data:", data);
        throw new Error(data.detail || "Failed to create product");
      }

      setSuccess("Product created successfully!");
      setFormData({
        name: "",
        category: "",
        subcategory: "",
        brand: "",
        unit: "",
        sku: "",
        min_quantity: "",
        quantity: "",
        description: "",
        tax: "",
        discount_type: "percentage",
        price: "",
        status: "active",
        image_url: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <FormContainer>
      <h2>Create Product</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      <form onSubmit={handleSubmit}>
        <ResponsiveForm>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Category</Label>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Subcategory</Label>
            <Select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Brand</Label>
            <Select name="brand" value={formData.brand} onChange={handleChange}>
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </Select>
          </FormGroup>
        </ResponsiveForm>
        <ResponsiveForm>
          <FormGroup>
            <Label>Unit</Label>
            <Select name="unit" value={formData.unit} onChange={handleChange}>
              <option value="">Select Unit</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>SKU</Label>
            <Input
              type="text"
              name="sku"
              placeholder="SKU"
              value={formData.sku}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Minimum Quantity</Label>
            <Input
              type="number"
              name="min_quantity"
              placeholder="Minimum Quantity"
              value={formData.min_quantity}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Quantity</Label>
            <Input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </FormGroup>
        </ResponsiveForm>
        <FormGroup>
          <Label>Description</Label>
          <Textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormGroup>
        <ResponsiveForm>
          <FormGroup>
            <Label>Tax</Label>
            <Input
              type="number"
              name="tax"
              placeholder="Tax"
              value={formData.tax}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Discount Type</Label>
            <Select
              name="discount_type"
              value={formData.discount_type}
              onChange={handleChange}
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Status</Label>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </FormGroup>
        </ResponsiveForm>

        <FormGroup>
          <Label>Image URL</Label>
          <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} />
            {formData.image_url ? (
              <img
                src={formData.image_url}
                alt="Preview"
                style={{ width: "100%" }}
              />
            ) : (
              <p>Drag 'n' drop an image here, or click to select one</p>
            )}
          </DropzoneContainer>
        </FormGroup>
        <Button type="submit">Create Product</Button>
      </form>
    </FormContainer>
  );
};

export default CreateProduct;
