import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Table, TableBody, TableCell, TableHead, 
  TableRow, Button, Box, Paper, Tabs, Tab, Chip, Modal, TextField, MenuItem 
} from '@mui/material';
import { Delete, LocalShipping, Add, PhotoCamera } from '@mui/icons-material';
import axios from 'axios';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState(0); // 0: products, 1: orders
  
  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    mood: 'peaceful',
    price: '',
    description: '',
    imageUrl: '' 
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // Fetch all products from the database
  const fetchProducts = () => {
    axios.get('http://localhost:8080/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  // Fetch all orders from the database
  const fetchOrders = () => {
    axios.get('http://localhost:8080/api/orders/all')
      .then(res => setOrders(res.data))
      .catch(err => console.error("Orders fetch error:", err));
  };

  // Synchronize text input changes with state
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle local file selection and upload to the backend
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Upload file to backend server
      const res = await axios.post('http://localhost:8080/api/products/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Update state with the returned image path
      setNewProduct({ ...newProduct, imageUrl: res.data });
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Image upload failed. Please check the backend controller or folder permissions.");
    }
  };

  // Save the new product entry to the database
  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:8080/api/products/add', newProduct);
      alert("Product added successfully!");
      setIsModalOpen(false);
      fetchProducts(); // Refresh the product table
      setNewProduct({ title: '', mood: 'peaceful', price: '', description: '', imageUrl: '' });
    } catch (err) {
      console.error(err);
      alert("Failed to add product.");
    }
  };

  // Admin: Progress an order to the next status
  const handleNextStep = async (orderId) => {
    try {
      await axios.patch(`http://localhost:8080/api/orders/${orderId}/next-step`);
      fetchOrders(); 
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  // Admin: Remove an order from the database
  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:8080/api/orders/${orderId}`);
        setOrders(orders.filter(o => o.id !== orderId));
        alert("Order deleted.");
      } catch (err) {
        console.error(err);
        alert("Deletion failed.");
      }
    }
  };

  // Admin: Remove a product from the inventory
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8080/api/products/${productId}`);
        setProducts(products.filter(p => p.id !== productId));
        alert("Product deleted.");
      } catch (err) {
        console.error(err);
        alert("Deletion failed.");
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8, color: 'white' }}>
      <Typography variant="h3" fontWeight="900" color="#4fc3f7" gutterBottom sx={{ letterSpacing: 2 }}>
        ADMIN PANEL
      </Typography>

      <Tabs 
        value={activeTab} 
        onChange={(e, val) => setActiveTab(val)} 
        sx={{ mb: 4, '& .MuiTab-root': { color: 'rgba(255,255,255,0.5)', fontWeight: 'bold' }, '& .Mui-selected': { color: '#4fc3f7 !important' } }}
      >
        <Tab label="Manage Products" />
        <Tab label="Manage Orders" />
      </Tabs>

      {/* --- Products Tab --- */}
      {activeTab === 0 && (
        <Paper sx={{ bgcolor: '#1e1e1e', borderRadius: 4, p: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
             <Typography variant="h6" fontWeight="bold">Inventory</Typography>
             <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={() => setIsModalOpen(true)}
                sx={{ bgcolor: '#4fc3f7', color: 'black', fontWeight: 'bold' }}
             >
               NEW PRODUCT
             </Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold', border: 0 }}>Product</TableCell>
                <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold', border: 0 }}>Mood</TableCell>
                <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold', border: 0 }}>Price</TableCell>
                <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold', border: 0 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id} sx={{ '& td': { borderBottom: '1px solid rgba(255,255,255,0.05)' } }}>
                  <TableCell sx={{ color: 'white' }}>{p.title}</TableCell>
                  <TableCell><Chip label={p.mood} size="small" sx={{ bgcolor: 'rgba(79,195,247,0.1)', color: '#4fc3f7' }} /></TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>${p.price}</TableCell>
                  <TableCell align="right">
                    <Button color="error" startIcon={<Delete />} onClick={() => handleDeleteProduct(p.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* --- Orders Tab --- */}
      {activeTab === 1 && (
        <Paper sx={{ bgcolor: '#1e1e1e', borderRadius: 4, p: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold', border: 0 }}>Order ID</TableCell>
                <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold', border: 0 }}>Status</TableCell>
                <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold', border: 0 }}>Tracking No</TableCell>
                <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold', border: 0 }}>Total</TableCell>
                <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold', border: 0 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} sx={{ '& td': { borderBottom: '1px solid rgba(255,255,255,0.05)' } }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>#{order.id}</TableCell>
                  <TableCell>
                    <Chip label={order.status} color={order.status === "ARRIVED" ? "success" : "primary"} variant="outlined" size="small" />
                  </TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.6)' }}>{order.trackingNumber || "N/A"}</TableCell>
                  <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold' }}>${order.totalAmount}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Button 
                        variant="contained" size="small" startIcon={<LocalShipping />}
                        disabled={order.status === "ARRIVED"}
                        onClick={() => handleNextStep(order.id)}
                        sx={{ bgcolor: '#4fc3f7', color: 'black' }}
                      >
                        {order.status === "ARRIVED" ? "Delivered" : "Next Step"}
                      </Button>
                      <Button variant="outlined" size="small" color="error" startIcon={<Delete />} onClick={() => handleDeleteOrder(order.id)}>
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* --- Add Product Modal --- */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ 
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 450, bgcolor: '#1e1e1e', border: '1px solid #4fc3f7', borderRadius: 4, p: 4, color: 'white',
          boxShadow: '0 0 20px rgba(79,195,247,0.2)'
        }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: '#4fc3f7' }}>Add New Survival Kit</Typography>
          
          <TextField fullWidth label="Product Title" name="title" value={newProduct.title} onChange={handleInputChange} 
            sx={{ mb: 2, '& label': { color: '#666' }, '& input': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' } } }} />
          
          <TextField fullWidth select label="Mood Category" name="mood" value={newProduct.mood} onChange={handleInputChange}
            sx={{ mb: 2, '& label': { color: '#666' }, '& .MuiSelect-select': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' } } }}>
            {["peaceful", "energetic", "excited", "heartbroken", "hopeful", "lonely", "motivated", "pensive"].map(m => (
              <MenuItem key={m} value={m}>{m}</MenuItem>
            ))}
          </TextField>

          <TextField fullWidth label="Price ($)" name="price" type="number" value={newProduct.price} onChange={handleInputChange}
            sx={{ mb: 2, '& label': { color: '#666' }, '& input': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' } } }} />

          {/* File Upload Button */}
          <Button
            variant="outlined"
            component="label"
            fullWidth
            startIcon={<PhotoCamera />}
            sx={{ mb: 2, color: '#4fc3f7', borderColor: '#4fc3f7', py: 1.5 }}
          >
            Choose Image from PC
            <input type="file" hidden onChange={handleFileChange} />
          </Button>

          {/* Image Preview Area */}
          {newProduct.imageUrl && (
            <Box sx={{ mb: 2, textAlign: 'center' }}>
                <img 
                    src={newProduct.imageUrl} 
                    alt="Preview" 
                    style={{ maxWidth: '100px', borderRadius: '8px', border: '1px solid #4fc3f7', display: 'block', margin: '0 auto 8px' }} 
                />
                <Typography variant="caption" color="#4fc3f7">Image Ready!</Typography>
            </Box>
          )}

          <TextField fullWidth multiline rows={3} label="Description" name="description" value={newProduct.description} onChange={handleInputChange}
            sx={{ mb: 3, '& label': { color: '#666' }, '& textarea': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#333' } } }} />

          <Button fullWidth variant="contained" onClick={handleAddProduct}
            sx={{ bgcolor: '#4fc3f7', color: 'black', fontWeight: 'bold', py: 1.5 }}>
            SAVE TO INVENTORY
          </Button>
        </Box>
      </Modal>

    </Container>
  );
};

export default AdminPage;