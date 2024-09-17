export const durationOptions = [
  { value: '1', label: 'ماهانه' },
  { value: '3', label: 'سه ماهه' },
  { value: '6', label: 'شش ماهه' },
  { value: '12', label: 'دوازده ماهه' },
];

export const statusOptions = [
  { value: '1', label: 'لغو شده' },
  { value: '2', label: 'در حال اجرا' },
  { value: '3', label: 'تکمیل شده' },
  { value: '4', label: 'در انتظار' },
  { value: '5', label: 'کنسل شده' },
];

const planUpdateInfo = [
  { id: 'plan_name', label: 'نام طرح' },
  { id: 'company_name', label: 'نام شرکت' },
  { id: 'symbol', label: 'نماد' },
  { id: 'funded_amount', label: 'مبلغ تایین شده', type: 'text', format: true },
  { id: 'profit', label: 'میزان سود', type: 'text', adornment: '%' },
  { id: 'total_time', label: 'مدت کلی' },
  { id: 'buoyancy', label: 'شناوری' },
  { id: 'activity_field', label: 'حوزه فعالیت' },
  { id: 'marketer', label: 'بازگردان' },
  { id: 'farabours_link', label: 'لینک فرابورس' },
  {
    id: 'applicant_funding_percentage',
    label: 'درصد تامین متقاضی',
    type: 'text',
    adornment: '%',
  },
  {
    id: 'nominal_price_certificate',
    label: 'قیمت اسمی هرگواهی',
    type: 'text',
    format: true,
  },
  { id: 'description', label: 'توضیحات' },
];

export default planUpdateInfo;
