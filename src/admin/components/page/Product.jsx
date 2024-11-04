/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
  });

  const columns = [
    { id: "image", label: "Hình ảnh", width: 100 },
    { id: "name", label: "Tên sản phẩm" },
    { id: "price", label: "Giá" },
    { id: "category", label: "Danh mục" },
    { id: "actions", label: "Thao tác" },
  ];

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      price: "",
      category: "",
      image: null,
    });
    setOpen(true);
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setFormData(record);
    setOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      // Add delete logic here
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Add update logic here
    } else {
      // Add create logic here
    }
    setOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Thêm sản phẩm
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ width: column.width }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.image && (
                    <img src={product.image} alt={product.name} width={50} />
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(product)}
                  >
                    Sửa
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(product.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editingId ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Tên sản phẩm"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Giá"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Danh mục</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <MenuItem value="food">Đồ ăn</MenuItem>
                <MenuItem value="drink">Đồ uống</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadIcon />}
              sx={{ mt: 2 }}
            >
              Chọn ảnh
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingId ? "Cập nhật" : "Thêm mới"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Product;
