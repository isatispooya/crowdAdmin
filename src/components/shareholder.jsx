/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import { Box, Button, Divider, FormControlLabel, Switch, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchShareholder, sendShareholder } from 'src/hook/shareholder';

const singleFile = {
  name: '',
  national_code: '',
  national_id: '',
  percent: '',
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
    if (status === 'success' && data) {
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
                  name="national_id"
                  inputProps={{ maxLength: 10 }}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                  required
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
                  inputProps={{ maxLength: 10 }}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                  name="percent"
                  id={`percent-${sectionIndex}`}
                  label="درصد"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={section.percent}
                  onChange={(e) => handleChange(sectionIndex, 'percent', e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={section.lock}
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

Shareholder.propTypes = {
  handleNext: PropTypes.func.isRequired,
  cardSelected: PropTypes.string.isRequired,
};

export default Shareholder;
