import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Table, TableBody, TableCell, TableHead, 
  TableRow, Button, Box, Paper, Tabs, Tab, Chip, Avatar 
} from '@mui/material';
import { LocalShipping, inventory, ShoppingBag, Delete } from '@mui/icons-material';
import axios from 'axios';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState(0); // 0: Products, 1: Orders

  const orderSteps = ["PENDING", "PREPARING", "SHIPPED", "IN_TRANSIT", "DELIVERED"];

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:8080/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  const fetchOrders = () => {
    axios.get('http://localhost:8080/api/orders/all')
      .then(res => setOrders(res.data))
      .catch(err => console.error("Orders fetch error:", err));
  };

  const handleNextStep = async (orderId, currentStatus) => {
    const currentIndex = orderSteps.indexOf(currentStatus);
    if (currentIndex < orderSteps.length - 1) {
      const nextStatus = orderSteps[currentIndex + 1];
      try {
        // Backend'e Patch isteği atıyoruz
        await axios.patch(`http://localhost:8080/api/orders/${orderId}/status`, nextStatus, {
          headers: { 'Content-Type': 'text/plain' }
        });
        fetchOrders(); // Listeyi güncelle
      } catch (err) {
        alert("Status update failed. Check backend PatchMapping.");
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8, color: 'white' }}>
      <Typography variant="h3" fontWeight="900" color="#4fc3f7" gutterBottom sx={{ letterSpacing: 2 }}>
        ADMIN PANEL
      </Typography>

      {/* Tab Sistemi: Ürünler ve Siparişler Arası Geçiş */}
      <Tabs 
        value={activeTab} 
        onChange={(e, val) => setActiveTab(val)} 
        sx={{ mb: 4, '& .MuiTab-root': { color: 'rgba(255,255,255,0.5)', fontWeight: 'bold' }, '& .Mui-selected': { color: '#4fc3f7 !important' } }}
      >
        <Tab label="Manage Products" />
        <Tab label="Manage Orders" />
      </Tabs>

      {/* --- ÜRÜN YÖNETİMİ SEKMESİ --- */}
      {activeTab === 0 && (
        <Paper sx={{ bgcolor: '#1e1e1e', borderRadius: 4, p: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">Inventory Management</Typography>
            <Button variant="contained" sx={{ bgcolor: '#4fc3f7', color: 'black', fontWeight: 'bold', borderRadius: 2 }}>
              + NEW PRODUCT
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
                    <Button color="error" startIcon={<Delete />}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* --- SİPARİŞ YÖNETİMİ SEKMESİ --- */}
      {activeTab === 1 && (
        <Paper sx={{ bgcolor: '#1e1e1e', borderRadius: 4, p: 3, border: '1px solid rgba(255,255,255,0.05)' }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>Active Orders & Tracking</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold', border: 0 }}>Order ID</TableCell>
                <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold', border: 0 }}>Date</TableCell>
                <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold', border: 0 }}>Status</TableCell>
                <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold', border: 0 }}>Total</TableCell>
                <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold', border: 0 }} align="right">Process</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} sx={{ '& td': { borderBottom: '1px solid rgba(255,255,255,0.05)' } }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>#{order.id}</TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.6)' }}>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={order.status} 
                      color={order.status === "DELIVERED" ? "success" : "primary"}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#4fc3f7', fontWeight: 'bold' }}>${order.totalAmount}</TableCell>
                  <TableCell align="right">
                    <Button 
                      variant="contained" 
                      size="small"
                      disabled={order.status === "DELIVERED"}
                      onClick={() => handleNextStep(order.id, order.status)}
                      sx={{ 
                        bgcolor: order.status === "DELIVERED" ? '#333' : '#4fc3f7', 
                        color: 'black', 
                        fontWeight: 'bold',
                        '&:hover': { bgcolor: '#26c6da' }
                      }}
                    >
                      {order.status === "DELIVERED" ? "Completed" : `Next: ${orderSteps[orderSteps.indexOf(order.status) + 1]}`}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

export default AdminPage;