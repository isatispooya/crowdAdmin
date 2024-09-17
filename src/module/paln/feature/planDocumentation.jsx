import React, { useState } from 'react';
import {
  Box,
  Typography,
  Input,
  Button,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { AddFormButton, SubmitButton } from 'src/components/button';

const PlanDocumentation = () => {
  const [forms, setForms] = useState([{ id: Date.now(), files: [], lock: false }]);

  const handleButtonClick = () => {
    console.log('Submit button clicked');
  };

  const handleFileChange = (event, formId) => {
    const selectedFiles = Array.from(event.target.files);
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId ? { ...form, files: [...form.files, ...selectedFiles] } : form
      )
    );
  };

  const handleFileRemove = (formId, fileToRemove) => {
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId
          ? { ...form, files: form.files.filter((file) => file !== fileToRemove) }
          : form
      )
    );
  };

  const handleRemoveSection = (formId) => {
    if (forms.length > 1) {
      setForms((prevForms) => prevForms.filter((form) => form.id !== formId));
    }
  };

  const handleAddFormClick = () => {
    setForms((prevForms) => [...prevForms, { id: Date.now(), files: [], lock: false }]);
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

      {forms.map((form) => (
        <Box key={form.id} sx={{ marginBottom: '20px' }}>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              padding: 6,
              position: 'relative',
            }}
          >
            {form.files.length > 0 ? (
              <Box
                sx={{
                  marginTop: '20px',
                  marginBottom: '20px',
                }}
              >
                {form.files.map((file, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: '#f7f7f7',
                      padding: '16px',
                      borderRadius: '8px',
                      boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                      position: 'relative',
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
                    <Button onClick={() => handleFileRemove(form.id, file)} variant="outlined">
                      حذف فایل
                    </Button>
                  </Box>
                ))}
              </Box>
            ) : (
              <Input
                type="file"
                multiple
                sx={{
                  marginTop: '20px',
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
                onChange={(event) => handleFileChange(event, form.id)}
              />
            )}

            {forms.length > 1 && (
              <IconButton
                color="error"
                sx={{ position: 'absolute', top: 0, right: 0 }}
                onClick={() => handleRemoveSection(form.id)}
              >
                <HighlightOffIcon />
              </IconButton>
            )}

          </Box>

          {forms.length > 1 && <Divider sx={{ marginY: 4 }} />}
        </Box>
      ))}

      <Box mt={2} display="flex" flexDirection="column" alignItems="center" marginBottom={2}>
        <AddFormButton onClick={handleAddFormClick} />
      </Box>
      <SubmitButton onClick={handleButtonClick} />
    </Box>
  );
};

export default PlanDocumentation;
