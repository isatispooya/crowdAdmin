import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import DatePicker from 'react-multi-date-picker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import SelectField from 'src/components/fild/selectedfiled';
import { SubmitButton } from 'src/components/button';
import PropTypes from 'prop-types';
import GlobalTextField from 'src/components/fild/textfiled';
import { UpdatePlan } from '../service/planDetailService';
import planUpdateInfo, { durationOptions, statusOptions } from './planUpdateInfo';

const PlanUpdate = ({ planData, idRow }) => {
  const [data, setData] = useState(planData?.data || {});
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => UpdatePlan(idRow, data),
    onSuccess: () => queryClient.invalidateQueries(['plan', idRow]),
    onError: (error) => console.error('Update failed:', error),
  });

  const handleChange = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleNumberChange = (key, value) => {
    const numberValue = value.replace(/,/g, '');
    handleChange(key, numberValue);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          backgroundColor: '#e0e0e0',
          color: '#333',
          borderRadius: '16px 16px 0 0',
          padding: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          اطلاعات طرح
        </Typography>
      </Box>
      <Grid container spacing={2} mt={5}>
        {planUpdateInfo.map(({ id, label, type }) => (
          <Grid item xs={12} lg={6} key={id}>
            <GlobalTextField
              id={id}
              label={label}
              type={type}
              value={type === 'number' ? formatNumber(data[id]) : data[id] || ''}
              onChange={(e) => {
                if (type === 'number') {
                  handleNumberChange(id, e.target.value);
                } else {
                  handleChange(id, e.target.value);
                }
              }}
            />
          </Grid>
        ))}
        <Grid item xs={12} lg={6}>
          <SelectField
            id="payment_period"
            label="دوره پرداخت"
            value={data.payment_period || ''}
            options={durationOptions}
            onChange={(value) => handleChange('payment_period', value)}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <SelectField
            id="status"
            label="وضعیت اجرای طرح"
            value={data.plan_status || ''}
            options={statusOptions}
            onChange={(value) => {
              handleChange('plan_status', value);
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <DatePicker
            range
            dateSeparator=" تا "
            calendar={persian}
            locale={persian_fa}
            value={data.remaining_days || ''}
            calendarPosition="bottom-right"
            style={{ width: '100%', height: '56px' }}
            inputStyle={{ height: '100%', width: '100%' }}
            placeholder="روز های باقی مانده"
            onChange={(value) => handleChange('remaining_days', value)}
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <SubmitButton onClick={mutation.mutate} />
      </Box>
    </Box>
  );
};

PlanUpdate.propTypes = {
  planData: PropTypes.object.isRequired,
  idRow: PropTypes.number.isRequired,
};

export default PlanUpdate;
