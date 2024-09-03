/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchShareholder, sendShareholder } from 'src/hook/shareholder';

const singleFile = {
  name: '',
  national_code: '',
  percent: '',
  lockName: false,
  lockNationalCode: false,
  lockPercent: false,
  lock: false,
};

const Shareholder = ({ handleNext, cardSelected }) => {
  const [formSections, setFormSections] = useState([singleFile]);
  const [fetchedData, setFetchedData] = useState([]);

  const { data, status } = useQuery({
    queryKey: ['shareholder', cardSelected],
    queryFn: () => fetchShareholder(cardSelected),
  });
  const mutation = useMutation({
    mutationKey: ['set management'],
    mutationFn: (sections) => sendShareholder(cardSelected, sections),
  });

  useEffect(() => {
    if (status === 'success' && data && data.data) {
      setFetchedData(data.data || [singleFile]);
    }
  }, [data, status]);

  useEffect(() => {
    if (fetchedData.length) {
      setFormSections(fetchedData);
    }
  }, [fetchedData]);

  const handleAddSection = () => {
    setFormSections([...formSections, { ...singleFile }]);
  };

  const handleRemoveSection = (index) => {
    if (formSections.length <= 1) {
      return;
    }
    setFormSections(formSections.filter((_, i) => i !== index));
  };

  const handleChange = (index, input, value) => {
    const updatedSections = formSections.map((section, i) =>
      i === index ? { ...section, [input]: value } : section
    );
    setFormSections(updatedSections);
  };

  const handleSubmit = () => {
    mutation.mutateAsync(formSections);
    console.log(formSections);
    handleNext();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '900px',
          padding: 4,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3, color: '#333', fontWeight: 600 }}>
          مدیریت سهامداران
        </Typography>

        {formSections && formSections.length > 0 ? (
          formSections.map((section, sectionIndex) => (
            <Box key={sectionIndex} sx={{ width: '100%', marginBottom: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 3,
                  marginBottom: 2,
                  alignItems: 'flex-start',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <TextField
                    id={`name-${sectionIndex}`}
                    label="نام و نام خانوادگی"
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiInputBase-root': { borderRadius: '8px' },
                      '& .MuiInputLabel-root': { fontWeight: 500, color: '#888' },
                    }}
                    value={section.name}
                    onChange={(e) => handleChange(sectionIndex, 'name', e.target.value)}
                    disabled={section.lockName}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    type="text"
                    name="national_code"
                    inputProps={{ maxLength: 10 }}
                    onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                    required
                    id={`national-code-${sectionIndex}`}
                    label="کد ملی"
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiInputBase-root': { borderRadius: '8px' },
                      '& .MuiInputLabel-root': { fontWeight: 500, color: '#888' },
                    }}
                    value={section.national_code}
                    onChange={(e) => handleChange(sectionIndex, 'national_code', e.target.value)}
                    disabled={section.lockNationalCode}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    type="text"
                    required
                    inputProps={{ maxLength: 10 }}
                    onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                    name="percent"
                    id={`percent-${sectionIndex}`}
                    label="درصد"
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiInputBase-root': { borderRadius: '8px' },
                      '& .MuiInputLabel-root': { fontWeight: 500, color: '#888' },
                    }}
                    value={section.percent}
                    onChange={(e) => handleChange(sectionIndex, 'percent', e.target.value)}
                    disabled={section.lockPercent}
                  />
                </Box>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={section.lock}
                    onChange={(e) => handleChange(sectionIndex, 'lock', e.target.checked)}
                  />
                }
                label="وضعیت"
                sx={{ alignSelf: 'center', color: '#555' }}
              />
              {sectionIndex < formSections.length - 1 && <Divider sx={{ marginY: 4 }} />}
            </Box>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No data available
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            marginTop: 3,
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddSection}
              sx={{
                width: '40%',
                textTransform: 'none',
                borderRadius: '8px',
                color: '#1976d2',
                borderColor: '#1976d2',
                '&:hover': {
                  borderColor: '#1976d2',
                  backgroundColor: 'rgba(25, 118, 210, 0.1)',
                },
              }}
            >
              افزودن
            </Button>
            {formSections.length > 1 && (
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => handleRemoveSection(formSections.length - 1)}
                sx={{
                  width: '40%',
                  textTransform: 'none',
                  borderRadius: '8px',
                  color: '#d32f2f',
                  borderColor: '#d32f2f',
                  '&:hover': {
                    borderColor: '#d32f2f',
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                  },
                }}
              >
                حذف
              </Button>
            )}
          </Box>

          <Button
            type="button"
            variant="contained"
            color="primary"
            sx={{
              width: '100%',
              py: 1.5,
              px: 3,
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            }}
            onClick={handleSubmit}
          >
            تایید
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

Shareholder.propTypes = {
  handleNext: PropTypes.func.isRequired,
  cardSelected: PropTypes.string.isRequired,
};

export default Shareholder;
