import { Box } from '@mui/material';
import UseCartId from 'src/hooks/card_id';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Styles from '../style.jsx/manageStyle';
import OtherCasesFeatuer from '../featuer/othercasesfeatuer';
import { fetchOtherCases } from '../service/othercases';

const OtherCasesPage = () => {
  const { cartId } = UseCartId();
  const { data, isSuccess } = useQuery({
    queryKey: ['cartDetail', cartId],
    queryFn: () => fetchOtherCases(cartId),
  });

  const [localData, setLocalData] = useState({
    announcement_of_changes_capital: null,
    announcement_of_changes_managers: null,
    announcing_account_number: null,
    assets_and_liabilities: null, 
    auditor_representative: null,
    bank_account_turnover: null,
    claims_status: null,
    latest_insurance_staf: null,
    licenses: null,
    lock_announcement_of_changes_capital: false,
    lock_announcement_of_changes_managers: false,
    lock_announcing_account_number: false,
    lock_assets_and_liabilities: false,
    lock_auditor_representative: false,
    lock_bank_account_turnover: false,
    lock_claims_status: false,
    lock_insurance_staf: false,
    lock_licenses: false,
    lock_product_catalog: false,
    lock_statutes: false,
    lock_latest_insurance_staf: false,
    product_catalog: null,
    statutes: null
  });

  useEffect(() => {
    if (isSuccess && data) {
      setLocalData(data);
    }
  }, [isSuccess, data]);

  return (
    <div style={Styles.container}>
      <Box sx={Styles.box}>
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">سایر موارد</h1>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <OtherCasesFeatuer
            localData={localData}
            setLocalData={setLocalData}
          />
        </div>
      </Box>
    </div>
  );
};

export default OtherCasesPage;
