import React, { useEffect, useState } from 'react';
import { Box, Button, Input, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchValidation, sendValidation } from 'src/hook/Validation';
import { OnRun } from 'src/api/OnRun';
import { toast } from 'react-toastify';

const Validation = ({ cardSelected, handleNext }) => {
  const [fileValidation, setFileValidation] = useState(null);
  const [fileManager, setFileManager] = useState(null);
  const [fetchedData, setFetchedData] = useState({});

  const { data: fetchData, isSuccess } = useQuery({
    queryKey: ['shareholder', cardSelected],
    queryFn: () => fetchValidation(cardSelected),
  });

  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  useEffect(() => {
    if (isSuccess === 'success' && fetchData && fetchData.manager) {
      setFetchedData(fetchData.manager.map((item) => ({ ...item, lock: item.lock || false })));
    } else if (isSuccess === 'error') {
      console.error('Failed to fetch resume data');
    }
  }, [fetchData, isSuccess]);

  const mutation = useMutation({
    mutationKey: ['set management'],
    mutationFn: (data) => sendValidation(cardSelected, data),
  });

  const handleFileRemove = (type) => {
    setFetchedData((prev) => ({
      ...prev,
      [type]: null,
    }));
  };

  const handleSubmit = () => {
    if (!fileValidation || !fileManager) {
      toast.error('لطفاً هر دو فایل را انتخاب کنید.');
      return;
    }
    const data = { file_validation: fileValidation, file_manager: fileManager };
    mutation.mutate(data);
    handleNext();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        padding: '0 16px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '900px',
          padding: 3,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          marginTop: 3,
        }}
      >
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-700">اعتبار سنجی</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <form className="w-full">
            <Box
              sx={{
                padding: '20px',
                border: '1px solid #ccc',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                marginBottom: '16px',
              }}
            >
              <Box sx={{ marginBottom: '16px' }}>
                {fetchedData.file_validation === null ? (
                  <Box sx={{ marginBottom: '16px' }}>
                    <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                      فایل اعتبار سنجی:
                    </Typography>
                    <Input
                      type="file"
                      sx={{
                        borderRadius: '8px',
                        width: '100%',
                        color: '#424242',
                        '&:focus': {
                          outline: 'none',
                          borderColor: '#3f51b5',
                          boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                        },
                      }}
                      onChange={(e) => handleFileChange(e, setFileValidation)}
                    />
                  </Box>
                ) : (
                  <Box sx={{ marginBottom: '16px' }}>
                    <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                      فایل اعتبار سنجی:
                    </Typography>
                    <a
                      style={{ textDecoration: 'none', color: '#3f51b5' }}
                      href={`${OnRun}/${fetchedData.file_validation}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      دریافت فایل بارگزاری شده
                    </a>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ marginLeft: 2 }}
                      onClick={() => handleFileRemove('file_validation')}
                    >
                      حذف
                    </Button>
                  </Box>
                )}
                {fetchedData.file_manager === null ? (
                  <Box>
                    <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                      فایل مدیران:
                    </Typography>
                    <Input
                      type="file"
                      sx={{
                        borderRadius: '8px',
                        width: '100%',
                        color: '#424242',
                        '&:focus': {
                          outline: 'none',
                          borderColor: '#3f51b5',
                          boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                        },
                      }}
                      onChange={(e) => handleFileChange(e, setFileManager)}
                    />
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                      فایل بارگزاری شده:
                    </Typography>
                    <a
                      href={`${OnRun}/${fetchedData.file_manager}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: 'none', color: '#3f51b5' }}
                    >
                      دریافت فایل بارگزاری شده
                    </a>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ marginLeft: 2 }}
                      onClick={() => handleFileRemove('file_manager')}
                    >
                      حذف
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={handleSubmit}
              disabled={mutation.isLoading}
            >
              ارسال
            </Button>
          </form>
        </div>
      </Box>
    </div>
  );
};

Validation.propTypes = {
  handleNext: PropTypes.func.isRequired,
  cardSelected: PropTypes.string.isRequired,
};

export default Validation;
