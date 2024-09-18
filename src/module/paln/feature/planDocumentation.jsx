import React, { useEffect, useState } from 'react';
import { Box, Typography, Input, Button, Link } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { SubmitButton } from 'src/components/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { fetchDocument } from '../service/documentService';

const PlanDocumentation = ({ idRow }) => {
  const [file, setFile] = useState();

  const { data } = useQuery({
    queryKey: ['planDocument', idRow],
    queryFn: () => fetchDocument(idRow),
  });

  useEffect(() => {
    setFile(data);
  }, [data]);

  const mutation = useMutation({
    mutationKey: ['ducument', idRow],
    mutationFn: () => fetchDocument(idRow, file),
  });

  const handleButtonClick = () => {
    mutation.mutate(file);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  return (
    <Box sx={{ padding: 3 }}>
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
          افزودن مستندات
        </Typography>
      </Box>
      {file ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          <Link
            href={file instanceof File ? URL.createObjectURL(file) : '#'}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontSize: '14px',
              fontWeight: 'medium',
              color: '#ef5350',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                color: '#d32f2f',
              },
            }}
          >
            مشاهده فایل بارگذاری شده
            <FileCopyOutlinedIcon sx={{ fontSize: '16px', marginLeft: '4px' }} />
          </Link>
          <Button onClick={handleFileRemove} variant="outlined">
            حذف فایل
          </Button>
        </Box>
      ) : (
        <Input
          type="file"
          sx={{
            marginTop: '20px',
            marginBottom: '20px',
            borderRadius: '8px',
            width: '100%',
            color: '#424242',
            '& input': {
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #ddd',
            },
            '&:focus-within': {
              outline: 'none',
              borderColor: '#3f51b5',
              boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
            },
          }}
          onChange={handleFileChange}
        />
      )}

      <Box mt={2}>
        <SubmitButton onClick={handleButtonClick} />
      </Box>
    </Box>
  );
};

PlanDocumentation.propTypes = {
  idRow: PropTypes.number,
};

export default PlanDocumentation;
