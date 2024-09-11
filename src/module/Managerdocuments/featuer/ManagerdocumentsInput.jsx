import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import GlobalTextField from 'src/components/fild/textfiled';
import ManagerdocumentFile from './Managerdocumentfile';

const ManagerdocumentsInput = ({ index, item, handleTextFieldChange, setFormData, formData }) => (
  <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'flex-start',
      }}
    >
      <GlobalTextField
        id={`name-${index}`}
        label="نام و نام خانوادگی"
        value={item.name}
        onChange={handleTextFieldChange(index, 'name')}
      />
    </Box>

    {!item.is_legal && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'flex-start',
        }}
      >
        <GlobalTextField
          id={`national_code-${index}`}
          label="کد ملی"
          type="text"
          inputProps={{ maxLength: 10 }}
          required
          value={item.national_code}
          onChange={handleTextFieldChange(index, 'national_code')}
        />
      </Box>
    )}
    {item.is_legal && (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'flex-start',
          }}
        >
          <GlobalTextField
            id={`national_id-${index}`}
            label="کد شناسه"
            type="text"
            inputProps={{ maxLength: 10 }}
            required
            value={item.national_id}
            onChange={handleTextFieldChange(index, 'national_id')}
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
            id={`representative-${index}`}
            label="نماینده"
            required
            value={item.representative}
            onChange={handleTextFieldChange(index, 'representative')}
          />
        </Box>
      </>
    )}

    <ManagerdocumentFile index={index} item={item} formData={formData} setFormData={setFormData} />
  </>
);

ManagerdocumentsInput.propTypes = {
  handleTextFieldChange: PropTypes.func,
  item: PropTypes.object,
  index: PropTypes.number,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};

export default ManagerdocumentsInput;
