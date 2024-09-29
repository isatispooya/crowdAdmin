import React from 'react';
import { Box, Button, Input, Link } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import PropTypes from 'prop-types';
import GlobalTextField from 'src/components/fild/textfiled';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { OnRun } from 'src/api/OnRun';

const HistoryInput = ({
  handleTextFieldChange,
  item,
  index,
  handleRemoveFile,
  handleFileChange,
  setFormData}) => {
  
  const handleDateChange = (date) => {
    const jsDate = date && typeof date.toDate === 'function' ? date.toDate() : null;
    const updatedItem = { ...item, date: jsDate ? jsDate.toISOString() : null };
    
    setFormData((prevData) => {
      const newData = [...prevData];
      newData[index] = updatedItem;
      return newData;
    });
  };


  return (
    <>
      <Box>
        <GlobalTextField
          label="نام و نام خانوادگی"
          value={item.name}
          onChange={handleTextFieldChange(index, 'name')}
        />
      </Box>
      <GlobalTextField
        label="کد ملی"
        value={item.national_code}
        onChange={handleTextFieldChange(index, 'national_code')}
        inputProps={{ maxLength: 10 }}
        required
      />
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'flex-start',
        }}
      >
        <DatePicker
          style={{
            width: '100%',
            padding: 16,
            backgroundColor: '#ffffff',
            marginTop: '12px',
          }}
          value={item.date ? new Date(item.date) : null}
          onChange={handleDateChange}
          calendar={persian}
          locale={persian_fa}
          className="shadow appearance-none border bg-white border-gray-300 rounded-lg w-full text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
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
            sx={{ marginTop: '10px' }}
            type="file"
            onChange={(e) => handleFileChange(e.target.files[0], index)}
          />
        )}
      </Box>
    </>
  );
};

HistoryInput.propTypes = {
  handleTextFieldChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  handleRemoveFile: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired, 
  
};

export default HistoryInput;
