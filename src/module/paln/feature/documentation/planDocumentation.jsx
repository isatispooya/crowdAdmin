import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Link, IconButton, Button } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { OnRun } from 'src/api/OnRun';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import useGetDocumentation from '../../service/documentation/useGetDocumentation';
import usePostDocumentation from '../../service/documentation/usePostDocumentaion';

const PlanDocumentation = () => {
  const { trace_code } = useParams();
  console.log(trace_code);

  const { data } = useGetDocumentation(trace_code);
  const [files, setFiles] = useState([{ title: '', file: null }]);
  const { mutate, isPending, isError, isSuccess } = usePostDocumentation(trace_code);

  useEffect(() => {
    if (data && data.data) {
      setFiles(data);
    }
  }, [data]);

  const handleButtonClick = () => {
    console.log('postData', files);
    mutate(files);
  };

  const handleFileChange = (index, event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const newFiles = [...files];
      newFiles[index].file = selectedFile;
      setFiles(newFiles);
    }
  };

  const handleTitleChange = (index, event) => {
    const newFiles = [...files];
    newFiles[index].title = event.target.value;
    setFiles(newFiles);
  };

  const handleFileRemove = (index) => {
    const newFiles = [...files];
    newFiles[index].file = null;
    setFiles(newFiles);
  };

  const handleRemoveSection = (index) => {
    setFiles(files.filter((_, i) => i !== index));
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
          افزودن مستندات
        </Typography>
      </Box>

      {files.map((file, index) => (
        <Box
          key={index}
          sx={{
            marginTop: '20px',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            {files.length > 1 && (
              <IconButton
                color="error"
                onClick={() => handleRemoveSection(index)}
                sx={{ marginLeft: '10px' }}
                disabled={files.length === 1}
              >
                <HighlightOffIcon />
              </IconButton>
            )}
          </Box>

          <TextField
            placeholder="عنوان"
            value={file.title}
            onChange={(event) => handleTitleChange(index, event)}
            fullWidth
            sx={{ marginBottom: '10px' }}
          />

          {typeof file.file === 'string' ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9f9f9',
                width: '100%',
                marginTop: '10px',
              }}
            >
              <Link
                href={`${OnRun}/${file.file}`}
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
                sx={{ marginLeft: '10px' }}
                onClick={() => handleFileRemove(index)}
              >
                <HighlightOffIcon />
              </IconButton>
            </Box>
          ) : (
            <TextField
              type="file"
              onChange={(event) => handleFileChange(index, event)}
              fullWidth
              inputProps={{ accept: 'application/pdf,image/*' }}
              sx={{ marginBottom: '10px' }}
            />
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleButtonClick(index)}
              sx={{
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
                padding: '6px 12px',
                borderRadius: '8px',
              }}
            >
              ارسال
            </Button>
          </Box>
          {isPending && <Typography>در حال ارسال...</Typography>}
          {isError && <Typography color="error">خطایی در ارسال داده‌ها رخ داد.</Typography>}
          {isSuccess && <Typography color="success">داده‌ها با موفقیت ارسال شدند!</Typography>}
        </Box>
      ))}
    </Box>
  );
};

export default PlanDocumentation;
