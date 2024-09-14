import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
} from '@mui/material';

const UserFeature = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const userData = [
    { id: 1, name: 'علی', email: 'ali@example.com', info: 'توضیحات 1' },
    { id: 2, name: 'رضا', email: 'reza@example.com', info: 'توضیحات 2' },
    { id: 3, name: 'مینا', email: 'mina@example.com', info: 'توضیحات 3' },
  ];

  return (
    <div style={{ padding: 20 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>نام</TableCell>
              <TableCell>ایمیل</TableCell>
              <TableCell>توضیحات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id} hover onClick={() => handleRowClick(user)}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.info}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <Dialog
          open={modalOpen}
          onClose={handleCloseModal}
          PaperProps={{
            style: {
              maxWidth: 600,
              borderRadius: 16,
              padding: 20,
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
              background: 'linear-gradient(135deg, #f0f4f8 0%, #ffffff 100%)',
              transition: 'all 0.3s ease-in-out',
            },
          }}
        >
          <DialogTitle style={{ position: 'relative', paddingBottom: 24 }}>
            جزئیات کاربر
          </DialogTitle>
          <DialogContent>
            <Typography variant="h5" style={{ marginBottom: 16, fontWeight: 600 }}>
              نام: {selectedUser.name}
            </Typography>
            <Typography variant="body1" style={{ marginBottom: 12, fontSize: '16px' }}>
              ایمیل: {selectedUser.email}
            </Typography>
            <Typography variant="body1" style={{ fontSize: '16px' }}>
              اطلاعات اضافی: {selectedUser.info}
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UserFeature;
