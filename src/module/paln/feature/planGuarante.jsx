/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, TextField, Link, Button } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { OnRun } from 'src/api/OnRun';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { fetchGuarante, sendGuarante, DeleteGuarante } from '../service/gaurantee/guaranteService';

const PlanGuarante = () => {
  const { trace_code } = useParams();
  const { data } = fetchGuarante(trace_code);
  const [files, setFiles] = useState([]);
  const [postData, setPostData] = useState({});
  const [deleteId, setDeleteId] = useState([]);

  const { mutate, isPending, isError, isSuccess } = sendGuarante(trace_code);
  const { mutate: mutateDelete } = DeleteGuarante(trace_code);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (data) {
      setFiles(data);
      setDeleteId(data.map((doc) => doc.id));
    }
  }, [data]);

  const handleButtonClick = () => {
    mutate(postData);
    setPostData({ title: '', file: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('تضمین با موفقیت ارسال شد');
  };

  return (
    <Box sx={{ padding: 3 }}>
      <ToastContainer />
      <Box
        sx={{
          backgroundColor: '#e0e0e0',
          color: '#333',
          borderRadius: '16px 16px 0 0',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          افزودن تضامین
        </Typography>
      </Box>

      <Box
        sx={{
          marginTop: '20px',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}
      >
        <Box sx={{ marginBottom: '15px' }}>
          <TextField
            value={postData.title || ''}
            placeholder="عنوان"
            onChange={(e) => setPostData((prev) => ({ ...prev, title: e.target.value }))}
            fullWidth
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            type="file"
            inputRef={fileInputRef}
            onChange={(e) => setPostData((prev) => ({ ...prev, file: e.target.files[0] }))}
            fullWidth
            inputProps={{ accept: 'application/pdf,image/*' }}
            sx={{ marginBottom: '10px' }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleButtonClick}
            sx={{
              color: '#fff',
              '&:hover': { backgroundColor: '#303f9f' },
              padding: '6px 12px',
              borderRadius: '8px',
            }}
          >
            ارسال
          </Button>
        </Box>
      </Box>

      {files &&
        files.map((doc, index) => (
          <Box key={index} sx={{ marginTop: '15px', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography>عنوان: {doc.title}</Typography>
              <Link
                href={`${OnRun}/${doc.file}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: '16px',
                  color: '#1976d2',
                  fontWeight: '500',
                  transition: 'color 0.3s',
                  '&:hover': { textDecoration: 'underline', color: '#115293' },
                }}
              >
                فایل بارگزاری شده
              </Link>
              <FileCopyOutlinedIcon
                sx={{ fontSize: '16px', marginLeft: '8px', color: '#1976d2' }}
              />
            </Box>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => {
                mutateDelete(doc.id);
                setDeleteId((prev) => prev.filter((id) => id !== doc.id));
                toast.error('تضمین حذف شد');
              }}
              sx={{
                marginLeft: '10px',
                borderRadius: '8px',
              }}
            >
              حذف
            </Button>
          </Box>
        ))}
    </Box>
  );
};

export default PlanGuarante;
