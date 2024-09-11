import React from 'react';
import { Box, Button, Input } from '@mui/material';
import { Link } from 'react-router-dom';
import { OnRun } from 'src/api/OnRun';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import PropTypes from 'prop-types';
import GlobalTextField from 'src/components/fild/textfiled';

const HistoryInput = ({
  handleTextFieldChange,
  item,
  index,
  handleRemoveFile,
  handleFileChange,
}) => (
  <>
    <Box>
      <GlobalTextField
        label="نام و نام خانوادگی"
        value={item.name}
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
      <GlobalTextField
        label="کد ملی"
        value={item.national_code}
        onChange={handleTextFieldChange(index, 'national_code')}
        inputProps={{ maxLength: 10 }}
        required
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

HistoryInput.propTypes = {
  handleTextFieldChange: PropTypes.func,
  index: PropTypes.number,
  item: PropTypes.object,
  handleRemoveFile: PropTypes.func,
  handleFileChange: PropTypes.func,
};

export default HistoryInput;
