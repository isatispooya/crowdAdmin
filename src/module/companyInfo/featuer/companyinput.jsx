import { Label } from '@mui/icons-material';
import { DatePicker } from '@mui/lab';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import moment from 'moment-jalaali';
import PropTypes from 'prop-types';
import GlobalTextField from 'src/components/fild/textfiled';

const CompanyInfoInput = ({ localData, setLocalData, handleRangeChange }) => {
  const formatNumber = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handleDateChange = (date) => {
    const formattedDate = date ? moment(date).format('jYYYY/jMM/jDD') : '';
    setLocalData({ ...localData, date_newspaper: formattedDate });
  };

  return (
    <Grid container spacing={2}>
      <div className="bg-gray-200 text-white rounded-t-3xl p-6 text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-700">اطلاعات شرکت</h1>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div dir="ltr">
            <Switch
              name="Lock_company_name"
              inputProps={{ 'aria-label': 'controlled' }}
              className="mr-4"
              checked={localData.Lock_company_name}
              onChange={(e) => setLocalData({ ...localData, Lock_company_name: e.target.checked })}
            />
          </div>
          <GlobalTextField
            id="company_name"
            label="نام شرکت"
            value={localData.company_name}
            onChange={(e) => setLocalData({ ...localData, company_name: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div dir="ltr">
            <Switch
              name="Lock_company_kind"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_company_kind}
              onChange={(e) => setLocalData({ ...localData, Lock_company_kind: e.target.checked })}
            />
          </div>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="company_kind-label">نوع شرکت</InputLabel>
            <Select
              inputProps={{ 'aria-label': 'controlled' }}
              labelId="company_kind-label"
              name="company_kind"
              value={localData.company_kind}
              onChange={(e) => setLocalData({ ...localData, company_kind: e.target.value })}
              label="نوع شرکت"
            >
              <MenuItem value="1">شرکت سهامی سجام</MenuItem>
              <MenuItem value="2">شرکت با مسولیت محدود</MenuItem>
              <MenuItem value="3">شرکت تضامنی</MenuItem>
              <MenuItem value="4">شرکت مختلط(سهامی و غیر سهامی)</MenuItem>
              <MenuItem value="5">شرکت نسبی</MenuItem>
              <MenuItem value="6">شرکت تعاونی</MenuItem>
              <MenuItem value="7">شرکت دانش بنیان</MenuItem>
              <MenuItem value="8">سهامی خاص</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div dir="ltr">
            <Switch
              name="Lock_nationalid"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_nationalid}
              onChange={(e) => setLocalData({ ...localData, Lock_nationalid: e.target.checked })}
            />
          </div>
          <GlobalTextField
            id="nationalid"
            label="شماره شناسه"
            value={localData.nationalid}
            onChange={(e) => setLocalData({ ...localData, nationalid: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div dir="ltr">
            <Switch
              name="Lock_registration_number"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_registration_number}
              onChange={(e) =>
                setLocalData({ ...localData, Lock_registration_number: e.target.checked })
              }
            />
          </div>
          <GlobalTextField
            id="registration_number"
            label="شماره ثبت"
            value={localData.registration_number}
            onChange={(e) => setLocalData({ ...localData, registration_number: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div dir="ltr">
            <Switch
              name="Lock_registered_capital"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_registered_capital}
              onChange={(e) =>
                setLocalData({ ...localData, Lock_registered_capital: e.target.checked })
              }
            />
          </div>
          <GlobalTextField
            id="registered_capital"
            label="سرمایه ثبتی (ریال)"
            value={formatNumber(localData.registered_capital)}
            onChange={(e) => setLocalData({ ...localData, registered_capital: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div dir="ltr">
            <Switch
              name="Lock_personnel"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_personnel}
              onChange={(e) => setLocalData({ ...localData, Lock_personnel: e.target.checked })}
            />
          </div>
          <GlobalTextField
            id="personnel"
            label="تعداد کارکنان"
            value={localData.personnel}
            onChange={(e) => setLocalData({ ...localData, personnel: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div dir="ltr">
            <Switch
              name="Lock_email"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_email}
              onChange={(e) => setLocalData({ ...localData, Lock_email: e.target.checked })}
            />
          </div>
          <GlobalTextField
            id="email"
            label="ایمیل شرکت"
            value={localData.email}
            onChange={(e) => setLocalData({ ...localData, email: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div dir="ltr">
            <Switch
              name="Lock_activity_industry"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_activity_industry}
              onChange={(e) =>
                setLocalData({ ...localData, Lock_activity_industry: e.target.checked })
              }
            />
          </div>
          <GlobalTextField
            id="activity_industry"
            label="موضوع فعالیت شرکت"
            value={localData.activity_industry}
            onChange={(e) => setLocalData({ ...localData, activity_industry: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div dir="ltr">
            <Switch
              name="Lock_newspaper"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_newspaper}
              onChange={(e) => setLocalData({ ...localData, Lock_newspaper: e.target.checked })}
            />
          </div>
          <GlobalTextField
            id="newspaper"
            label="شماره روزنامه رسمی"
            value={localData.newspaper}
            onChange={(e) => setLocalData({ ...localData, newspaper: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div dir="ltr">
            <Switch
              name="Lock_date_newspaper"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_date_newspaper}
              onChange={(e) =>
                setLocalData({ ...localData, Lock_date_newspaper: e.target.checked })
              }
            />
          </div>
          <DatePicker
            selected={localData.date_newspaper ? new Date(localData.date_newspaper) : null}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
            locale="fa"
            customInput={
              <GlobalTextField
                id="date_newspaper"
                label="تاریخ روزنامه رسمی"
                value={localData.date_newspaper}
                onChange={(e) => setLocalData({ ...localData, date_newspaper: e.target.value })}
              />
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div dir="ltr">
            <Switch
              name="Lock_postal_code"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_postal_code}
              onChange={(e) => setLocalData({ ...localData, Lock_postal_code: e.target.checked })}
            />
          </div>
          <GlobalTextField
            id="postal_code"
            label="کد پستی"
            value={localData.postal_code}
            onChange={(e) => setLocalData({ ...localData, postal_code: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <div dir="ltr">
            <Switch
              name="Lock_city"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_city}
              onChange={(e) => setLocalData({ ...localData, Lock_city: e.target.checked })}
            />
          </div>
          <GlobalTextField
            id="city"
            label="شهر"
            value={localData.city}
            onChange={(e) => setLocalData({ ...localData, city: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <div dir="ltr">
            <Switch
              name="Lock_address"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_address}
              onChange={(e) => setLocalData({ ...localData, Lock_address: e.target.checked })}
            />
          </div>
          <GlobalTextField
            id="address"
            label="آدرس شرکت"
            value={localData.address}
            onChange={(e) => setLocalData({ ...localData, address: e.target.value })}
          />
        </Grid>
      </Grid>

      <Box
        mt={8}
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" mb={2}>
          <Label className="block text-gray-700 text-sm font-medium">
            میزان منابع درخواستی (ریال):
          </Label>
          <div dir="ltr">
            <Switch
              name="Lock_amount_of_request"
              inputProps={{ 'aria-label': 'controlled' }}
              className="ml-4"
              checked={localData.Lock_amount_of_request}
              onChange={(e) =>
                setLocalData({ ...localData, Lock_amount_of_request: e.target.checked })
              }
            />
          </div>
        </Box>
        <input
          type="range"
          name="amount_of_request"
          min={10000000000}
          max={250000000000}
          step={10000000000}
          value={localData.amount_of_request}
          onChange={handleRangeChange}
          className="w-full"
        />
        <span className="block text-gray-700 text-sm mt-4 text-center">
          {formatNumber(localData.amount_of_request)} ریال
        </span>
      </Box>
    </Grid>
  );
};

CompanyInfoInput.propTypes = {
  localData: PropTypes.object.isRequired,
  setLocalData: PropTypes.func.isRequired,
  handleRangeChange: PropTypes.func.isRequired,
};

export default CompanyInfoInput;
