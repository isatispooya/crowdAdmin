import useNavigateStep from 'src/hooks/use-navigate-step';
import UseCartId from 'src/hooks/card_id';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createCart, getStep1 } from 'src/hook/step1';
import CompanyInfoInput from '../featuer/companyinput';

const { Box } = require('@mui/material');

const CompanyInfoPage = () => {

  const { incrementPage } = useNavigateStep();
  const { cartId } = UseCartId();

  const [clicked, setClicked] = useState(false);

  const mutation = useMutation({ mutationFn: () => createCart(localData, cartId) });

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['cartDetail', cartId],
    queryFn: () => getStep1(cartId),
  });

  const [localData, setLocalData] = useState(() => data || {});

  useEffect(() => {
    if (isSuccess && data) {
      setLocalData(data.data.cart);
    }
  }, [isSuccess, data]);


  const handleRangeChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setLocalData({
      ...localData,
      amount_of_request: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClicked(true);
    mutation.mutateAsync(localData, cartId);
    incrementPage();
  };

  if (isLoading) {
    return <p>loading ....</p>;
  }
  if (isError) {
    return <p>error ....</p>;
  }
  if (!data) {
    return <p>data ....</p>;
  }

  const handleFileRemove = (type) => {
    setLocalData((prev) => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  };


  return (
    <form>
      <div dir="rtl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
          }}
        >
          <Box
            p={3}
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            sx={{
              backgroundColor: 'white',
              width: '100%',
              maxWidth: '1200px',
              borderRadius: '8px',
              boxShadow: 3,
            }}
          >
            <CompanyInfoInput
              localData={localData}
              setLocalData={setLocalData}
              handleRangeChange={handleRangeChange}
            />
          </Box>
        </Box>
      </div>
    </form>
  );
};

export default CompanyInfoPage;
