/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { fetchManager, sendManager } from 'src/hook/manager';
import { useMutation, useQuery } from '@tanstack/react-query';

const Fildemnager = ({ handleNext, cardSelected }) => {
  const [formSections, setFormSections] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);

  const { data, status } = useQuery({
    queryKey: ['userMessage', cardSelected],
    queryFn: () => fetchManager(cardSelected),
  });

  const mutation = useMutation({
    mutationKey: ['set management'],
    mutationFn: (sections) => sendManager(cardSelected, sections),
  });
  
  // console.log(data , "12233465")

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const singleFile = {
    name: '',
    position: '',
    national_code: '',
    national_id: '',
    phone: '',
    representative: '',
    is_legal: false,
    is_obliged: false,
  };

  useEffect(() => {
    if (status === 'success' && data) {
      setFetchedData(data.data || [singleFile]);
    }
  }, [data, singleFile, status]);

  useEffect(() => {
    if (fetchedData.length) {
      setFormSections(fetchedData);
    }
  }, [fetchedData]);

  const types = [
    { type: false, title: 'حقیقی' },
    { type: true, title: 'حقوقی' },
  ];

  const movazaf = [
    { type: false, title: 'خیر' },
    { type: true, title: 'بله' },
  ];
   
  
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
    // Send the updated formSections instead of the initial fetchedData
    mutation.mutateAsync(formSections);
    // Uncomment handleNext if you want to move to the next step after submission
    // handleNext();
    console.log(formSections); // Log the current form values
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
        {formSections.length > 0 ? (
          formSections.map((section, sectionIndex) => (
            <form key={sectionIndex} className="w-full">
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
                  gap: 2,
                  marginBottom: 4,
                }}
              >
                <TextField
                  id={`name-${sectionIndex}`}
                  label="نام و نام خانوادگی"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={section.name}
                  onChange={(e) => handleChange(sectionIndex, 'name', e.target.value)}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id={`company-type-label-${sectionIndex}`}>نوع شرکت</InputLabel>
                  <Select
                    labelId={`company-type-label-${sectionIndex}`}
                    id={`company-type-${sectionIndex}`}
                    label="نوع شرکت"
                    value={section.is_legal}
                    onChange={(e) => handleChange(sectionIndex, 'is_legal', e.target.value)}
                  >
                    {types.map((typeObj, index) => (
                      <MenuItem key={index} value={typeObj.type}>
                        {typeObj.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  id={`position-${sectionIndex}`}
                  label="سمت"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={section.position}
                  onChange={(e) => handleChange(sectionIndex, 'position', e.target.value)}
                />
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
                  sx={{ mb: 2 }}
                  value={section.national_code}
                  onChange={(e) => handleChange(sectionIndex, 'national_code', e.target.value)}
                />
                <TextField
                  type="text"
                  required
                  inputProps={{ maxLength: 10 }}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                  name="national_id"
                  id={`national-id-${sectionIndex}`}
                  label="کد شناسه"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={section.national_id}
                  onChange={(e) => handleChange(sectionIndex, 'national_id', e.target.value)}
                />
                <TextField
                  type="text"
                  required
                  inputProps={{ maxLength: 11 }}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                  name="phone"
                  id={`phone-${sectionIndex}`}
                  label="شماره تلفن"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={section.phone}
                  onChange={(e) => handleChange(sectionIndex, 'phone', e.target.value)}
                />
                <TextField
                  type="text"
                  required
                  name="representative"
                  id={`representative-${sectionIndex}`}
                  label="نماینده"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={section.representative}
                  onChange={(e) => handleChange(sectionIndex, 'representative', e.target.value)}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id={`employee-label-${sectionIndex}`}>موظف</InputLabel>
                  <Select
                    labelId={`employee-label-${sectionIndex}`}
                    id={`employee-${sectionIndex}`}
                    label="موظف"
                    value={section.is_obliged}
                    onChange={(e) => handleChange(sectionIndex, 'is_obliged', e.target.value)}
                  >
                    {movazaf.map((typeObj, index) => (
                      <MenuItem key={index} value={typeObj.type}>
                        {typeObj.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={
                    <Switch
                      checked={section.is_obliged}
                      onChange={(e) => handleChange(sectionIndex, 'is_obliged', e.target.checked)}
                    />
                  }
                  label="وضعیت"
                  sx={{ alignSelf: 'center' }}
                />
              </Box>

              {sectionIndex < formSections.length - 1 && <Divider sx={{ marginY: 4 }} />}
            </form>
          ))
        ) : (
          <p>No data available</p>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            marginTop: 3,
            width: '100%',
          }}
        >
          <div className="flex justify-center gap-3">
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddSection}
              sx={{
                width: '40%',
                textTransform: 'none',
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
                }}
              >
                حذف
              </Button>
            )}
          </div>

          <Button
            type="button"
            variant="contained"
            color="primary"
            sx={{
              width: '100%',
              py: 1,
              px: 2,
            }}
            onClick={handleSubmit}
          >
            تایید
          </Button>
        </Box>
      </Box>
    </div>
  );
};

Fildemnager.propTypes = {
  handleNext: PropTypes.func.isRequired,
  cardSelected: PropTypes.string.isRequired,
};

export default Fildemnager;
