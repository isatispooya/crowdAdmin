import React, { useEffect, useState } from 'react';
import { Box, Typography, Input, Button, Link, IconButton } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { SubmitButton, AddFormButton } from 'src/components/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { fetchDocument } from '../service/documentService';

const PlanDocumentation = ({ idRow }) => {
  const [files, setFiles] = useState([null]);

  const { data } = useQuery({
    queryKey: ['planDocument', idRow],
    queryFn: () => fetchDocument(idRow),
  });

  useEffect(() => {
    setFiles(data.length > 0 ? data : [null]);
  }, [data]);

  const mutation = useMutation({
    mutationKey: ['document', idRow],
    mutationFn: () => fetchDocument(idRow, files),
  });

  const handleButtonClick = () => {
    mutation.mutate(files);
  };

  const handleFileChange = (index, event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const newFiles = [...files];
      newFiles[index] = selectedFile;
      setFiles(newFiles);
    }
  };

  const handleFileRemove = (index) => {
    const newFiles = [...files];
    newFiles[index] = null;
    setFiles(newFiles);
  };

  const handleRemoveSection = (index) => {
    if (files.length > 1) {
      setFiles(files.filter((_, i) => i !== index));
    }
  };

  const handleAddFileInput = () => {
    setFiles([...files, null]);
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

      {files.map((file, index) => (
        <Box key={index} sx={{ marginTop: '20px', position: 'relative' }}>
          {file ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Link
                href={URL.createObjectURL(file)}
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
              <IconButton
                color="error"
                onClick={() => handleFileRemove(index)}
              >
                <HighlightOffIcon />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Input
                type="file"
                sx={{
                  borderRadius: '8px',
                  width: '100%',
                  marginBottom: '10px',
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
                onChange={(event) => handleFileChange(index, event)}
              />
              <IconButton
                color="error"
                onClick={() => handleRemoveSection(index)}
                sx={{ marginLeft: '10px', visibility: files.length > 1 ? 'visible' : 'hidden' }}
              >
                <HighlightOffIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <AddFormButton onClick={handleAddFileInput} />
      </Box>

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
