import React from 'react';
import PropTypes from 'prop-types';
import GlobalTextField from 'src/components/fild/textfiled';
import SelectField from 'src/components/fild/selectedfiled';

const types = [
  { value: false, label: 'حقیقی' },
  { value: true, label: 'حقوقی' },
];

const movazaf = [
  { value: false, label: 'خیر' },
  { value: true, label: 'بله' },
];

const ManagerInput = ({ section, sectionIndex, handleChange }) => (
  <>
    <GlobalTextField
      label="نام و نام خانوادگی"
      value={section.name}
      onChange={(e) => handleChange(sectionIndex, 'name', e.target.value)}
    />
    <SelectField
      id={`company-type-${sectionIndex}`}
      label="نوع شرکت"
      value={section.is_legal}
      onChange={(e) => handleChange(sectionIndex, 'is_legal', e.target.value)}
      options={types}
    />
    <GlobalTextField
      label="سمت"
      value={section.position}
      onChange={(e) => handleChange(sectionIndex, 'position', e.target.value)}
    />
    <GlobalTextField
      label={section.is_legal ? 'کد شناسه' : 'کد ملی'}
      value={section.is_legal ? section.national_id : section.national_code}
      onChange={(e) =>
        handleChange(
          sectionIndex,
          section.is_legal ? 'national_id' : 'national_code',
          e.target.value.replace(/[^0-9]/g, '')
        )
      }
      inputProps={{ maxLength: 10, pattern: '[0-9]*' }}
      required
    />
    {section.is_legal && (
      <GlobalTextField
        label="نماینده"
        value={section.representative}
        onChange={(e) => handleChange(sectionIndex, 'representative', e.target.value)}
        required
      />
    )}
    <GlobalTextField
      label="شماره تلفن"
      value={section.phone}
      onChange={(e) => handleChange(sectionIndex, 'phone', e.target.value.replace(/[^0-9]/g, ''))}
      inputProps={{ maxLength: 11, pattern: '[0-9]*' }}
      required
    />
    <SelectField
      id={`is-obliged-${sectionIndex}`}
      label="موظف"
      value={section.is_obliged}
      onChange={(e) => handleChange(sectionIndex, 'is_obliged', e.target.value)}
      options={movazaf}
    />
  </>
);

ManagerInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  section: PropTypes.object.isRequired,
  sectionIndex: PropTypes.number.isRequired,
};

export default ManagerInput;
