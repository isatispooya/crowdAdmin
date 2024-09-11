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

  const [localData, setLocalData] = useState(() => data || {});

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
