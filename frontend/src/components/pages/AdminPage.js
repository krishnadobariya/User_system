import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Container, Table, TableBody, TableCell, TableHead, TableRow, 
  Button, Modal, Box, TextField, Typography, IconButton, Dialog, 
  DialogActions, DialogContent, DialogContentText, DialogTitle 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [selectedRole, setSelectedRole] = useState('admin'); // Default role to show

  const apiBaseUrl = 'http://localhost:5000';
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleOpenDeleteDialog = (userId) => {
    setUserIdToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${apiBaseUrl}/api/users/${userIdToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSaveUser = async () => {
    try {
      if (editMode) {
        await axios.put(
          `${apiBaseUrl}/api/users/${selectedUser._id}`,
          selectedUser,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(`${apiBaseUrl}/api/auth/register`, selectedUser, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchUsers();
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => user.role === selectedRole);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      {/* Role Selection Buttons */}
      <Box sx={{ marginBottom: 2 }}>
        <Button
          variant={selectedRole === 'admin' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => setSelectedRole('admin')}
          sx={{ marginRight: 2 }}
        >
          Admins
        </Button>
        <Button
          variant={selectedRole === 'user' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => setSelectedRole('user')}
        >
          Users
        </Button>
      </Box>

      {/* Users Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEditUser(user)}>
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleOpenDeleteDialog(user._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for Editing/Add User */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', top: '20%', left: '50%', transform: 'translate(-50%, -20%)', position: 'absolute', minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            {editMode ? 'Edit User' : 'Add User'}
          </Typography>
          <TextField
            label="Name"
            value={selectedUser?.name || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={selectedUser?.email || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          {!editMode && (
            <TextField
              label="Password"
              type="password"
              value={selectedUser?.password || ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
              fullWidth
              margin="normal"
            />
          )}
          <Button variant="contained" color="primary" onClick={handleSaveUser} style={{ marginTop: 20 }}>
            Save
          </Button>
        </Box>
      </Modal>

      {/* Dialog for Delete Confirmation */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminPage;
