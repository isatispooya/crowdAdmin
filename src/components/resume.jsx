import { Box, FormControlLabel, Switch, TextField, Input, Button } from '@mui/material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchResume, sendResume } from 'src/hook/resume';
import PropTypes from 'prop-types';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

const Resume = ({ cardSelected, handleNext }) => {
  const { data, status } = useQuery({
    queryKey: ['shareholder', cardSelected],
    queryFn: () => fetchResume(cardSelected),
  });

  const [, setFetchedData] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (status === 'success' && data) {
      setFetchedData(data.manager);
      setFormData(data.manager.map(item => ({ ...item }))); // Initialize form data with fetched data
    }
  }, [data, status]);

  const mutation = useMutation({
    mutationKey: ['set management'],
    mutationFn: (sections) => sendResume(cardSelected, sections),
  });

  const handleFileChange = (index) => (event) => {
    const selectedFile = event.target.files[0];
    const fileValue = selectedFile ? URL.createObjectURL(selectedFile) : '';
    const newFormData = [...formData];
    newFormData[index].resumeFile = fileValue;
    setFormData(newFormData);
  };

  const handleSwitchChange = (index) => (event) => {
    const newFormData = [...formData];
    newFormData[index].lock = event.target.checked;
    setFormData(newFormData);
  };

  const handleTextFieldChange = (index, field) => (event) => {
    const newFormData = [...formData];
    newFormData[index][field] = event.target.value;
    setFormData(newFormData);
  };

  const handleButtonClick = () => {
    mutation.mutate(formData); // Send the current form data to the mutation function
    console.log('Form data sent:', formData);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        padding: '0 16px',
        backgroundColor: '#f5f5f5',
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
                      checked={item.lock || false}
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
                    <a
                      href={item.resumeFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#ef5350',
                        marginTop: '10px',
                        fontSize: '13px',
                        display: 'block',
                      }}
                    >
                      مشاهده فایل بارگذاری شده
                      <FileCopyOutlinedIcon style={{ fontSize: '16px' }} />
                    </a>
                  ) : (
                    <Input
                      name="resume_file"
                      type="file"
                      id="file-upload-resume"
                      sx={{ marginTop: '8px' }}
                      onChange={handleFileChange(index)}
                    />
                  )}
                </Box>
              </Box>
            </form>
          ))
        ) : (
          <div>Loading data or no data available.</div>
        )}

        <Button variant="contained" color="primary" onClick={handleButtonClick}>
          دکمه
        </Button>
      </Box>
    </div>
  );
};

Resume.propTypes = {
  handleNext: PropTypes.func.isRequired,
  cardSelected: PropTypes.string.isRequired,
};

export default Resume;
