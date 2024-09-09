import React, { useState, useEffect } from 'react';
import { Box, FormControlLabel, Switch, TextField, Input, Button } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import PropTypes from 'prop-types';

import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { OnRun } from 'src/api/OnRun';
import { fetchHistory, uploadHistoryFile } from 'src/hook/history';
import { Link } from 'react-router-dom';

const History = ({ cardSelected, handleNext }) => {
  const { data, status } = useQuery({
    queryKey: ['history', cardSelected],
    queryFn: () => fetchHistory(cardSelected),
  });

  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (status === 'success' && data && data.manager) {
      console.log('Loaded data:', data.manager);
      setFormData(
        data.manager.map((item) => ({
          ...item,
          lock: item.lock || false,
        }))
      );
    } else if (status === 'error') {
      console.error('Failed to fetch history data');
    }
  }, [data, status]);

  const mutation = useMutation({
    mutationKey: ['uploadHistoryFile'],
    mutationFn: () => uploadHistoryFile(cardSelected, formData),
  });

  const handleFileChange = (file, index) => {
    const newFormData = [...formData];
    newFormData[index].file = file;
    setFormData(newFormData);
  };

  const handleRemoveFile = (index) => () => {
    const newFormData = [...formData];
    newFormData[index].file = null;
    setFormData(newFormData);
  };

  const handleSwitchChange = (index) => (event) => {
    console.log('Switch changed:', index, event.target.checked);
    setFormData((prevFormData) => {
      const newFormData = [...prevFormData];
      newFormData[index].lock = event.target.checked;
      return newFormData;
    });
  };

  const handleTextFieldChange = (index, field) => (event) => {
    const newFormData = [...formData];
    newFormData[index][field] = event.target.value;
    setFormData(newFormData);
  };

  const handleButtonClick = () => {
    console.log('Sending data to server:', formData);
    if (formData.length > 0) {
      mutation.mutate(formData);
    }
    handleNext();
  };

  console.log('2344444444444444444444444444444444444', formData);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
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
          gap: 3,
        }}
      >
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">سوءپیشینه</h1>
        </div>

        {formData.length > 0 ? (
          formData.map((item, index) => (
            <form key={index} className="w-full">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={item.lock}
                      onChange={handleSwitchChange(index)}
                      name="customSwitch"
                      color="primary"
                    />
                  }
                />
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                  gap: 2,
                  marginBottom: 4,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    alignItems: 'flex-start',
                  }}
                >
                  <TextField
                    value={item.name}
                    label="نام و نام خانوادگی"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={handleTextFieldChange(index, 'name')}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    alignItems: 'flex-start',
                  }}
                >
                  <TextField
                    type="text"
                    name="national_code"
                    inputProps={{ maxLength: 10 }}
                    required
                    label="کد ملی"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={item.national_code}
                    onChange={handleTextFieldChange(index, 'national_code')}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    alignItems: 'flex-start',
                  }}
                >
                  {typeof item.file === 'string' && item.file ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#f7f7f7',
                        padding: '10px',
                        borderRadius: '8px',
                        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <Link
                        href={`${OnRun}/${item.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          fontSize: '14px',
                          fontWeight: 'medium',
                        }}
                      >
                        دریافت فایل سوء پیشینه
                        <FileCopyOutlinedIcon style={{ fontSize: '16px' }} />
                      </Link>
                      <Button
                        size="small"
                        onClick={handleRemoveFile(index)}
                        sx={{ height: 'auto', ml: '10px' }}
                      >
                        حذف
                      </Button>
                    </Box>
                  ) : (
                    <Input
                      name="claims_status"
                      type="file"
                      onChange={(e) => handleFileChange(e.target.files[0], index)}
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
                    />
                  )}
                </Box>
              </Box>
            </form>
          ))
        ) : (
          <div>درحال بارگزاری</div>
        )}

        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          تایید
        </Button>
      </Box>
    </div>
  );
};

History.propTypes = {
  handleNext: PropTypes.func.isRequired,
  cardSelected: PropTypes.string.isRequired,
};

export default History;
