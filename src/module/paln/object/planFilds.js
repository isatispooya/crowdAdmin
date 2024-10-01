import moment from 'moment-jalaali';

export const plan_fields_input = () => [
    { label: 'تاریخ ایجاد', value: 'creation_date', isDate: true },
    { label: 'نام فارسی', value: 'persian_name' },
    { label: 'نام فارسی پیشنهادی', value: 'persian_suggested_symbol' },
    { label: 'نماد تایید شده', value: 'persian_approved_symbol' },
    { label: 'نام انگلیسی', value: 'english_name' },
    { label: 'نام انگلیسی پیشنهادی', value: 'english_suggested_symbol' },
    { label: 'نماد انگلیسی تایید شده', value: 'english_approved_symbol' },
    { label: 'کد گروه صنعت', value: 'industry_group_id' },
    { label: 'عنوان گروه صنعت', value: 'industry_group_description' },
    { label: 'عنوان زیر گروه صنعت', value: 'sub_industry_group_description' },
    { label: 'قیمت اسمی هر گواهی شراکت (ریال)', value: 'unit_price' },
    { label: 'تعداد کل گواهی های شراکت قابل عرضه', value: 'total_units' },
    { label: 'تعداد گواهی شراکت متقاضی', value: 'company_unit_counts' },
    { label: 'مبلغ مورد نیاز (ریال)', value: 'total_price' },
    { label: 'کد نوع تامین مالی', value: 'crowd_funding_type_id' },
    { label: 'عنوان نوع تامین مالی', value: 'crowd_funding_type_description' },
    { label: 'دلیل شناور بودن', value: 'float_crowd_funding_type_description' },
    { label: 'حداقل مبلغ مورد نیاز جهت موفقیت تامین مالی (ریال)', value: 'minimum_required_price' },
    { label: 'حداقل مبلغ سرمایه گذاری برای تامین کننده حقیقی (ریال)', value: 'real_person_minimum_available_price' },
    { label: 'حداکثر مبلغ سرمایه گذاری برای تامین کننده حقیقی (ریال)', value: 'real_person_maximum_available_price' },
    { label: 'حداقل مبلغ سرمایه گذاری برای تامین کننده حقوقی (ریال)', value: 'legal_person_minimum_available_price' },
    { label: 'حداکثر مبلغ سرمایه گذاری برای تامین کننده حقوقی (ریال)', value: 'legal_person_maximum_available_price' },
    { label: 'تاریخ شروع جمع آوری وجوه', value: 'underwriting_start_date', isDate: true },
    { label: 'تاریخ پایان جمع آوری وجوه', value: 'underwriting_end_date', isDate: true },
    { label: 'تاریخ شروع اجرای طرح', value: 'project_start_date', isDate: true },
    { label: 'تاریخ پایان اجرای طرح', value: 'project_end_date', isDate: true },
    { label: 'زمانبندی ارائه گزارش', value: 'project_reporting_type_description' },
    { label: 'نحوه تسویه', value: 'settlement_description' },
    { label: 'وضعیت پروژه', value: 'project_status_description' },
    { label: 'کد وضعیت پروژه', value: 'project_status_id' },
    { label: 'تعداد مشارکت کنندگان در تامین مالی پروژه', value: 'number_of_finance_provider' },
    { label: 'مبلغ جمع آوری شده در تامین مالی پروژه', value: 'sum_of_funding_provider' },
    { label: 'اطلاعات ثبتی شرکت متقاضی', value: 'project_owner_company' },
    { label: 'اطلاعات سهامداران بالای 10 درصد', value: 'list_of_project_big_share_holders' },
    { label: 'اطلاعات مدیرعامل و اعضای هیئت مدیره', value: 'list_of_project_board_members' },
];

export const plan_fields_textarea = () => [
    { label: 'شرح انگلیسی', value: 'english_subject' },
    { label: 'شرح فارسی', value: 'persian_subject' },
];


