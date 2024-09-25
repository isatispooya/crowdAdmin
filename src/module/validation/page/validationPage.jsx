import { Box } from '@mui/material';
import UseCartId from 'src/hooks/card_id';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import useNavigateStep from 'src/hooks/use-navigate-step';
import { SubmitButton } from 'src/components/button';
import Validationfeatuer from '../featuer/validationfeatuer';
import { fetchValidation, sendValidation } from '../service/validationService';
import Styles from '../style.jsx/manageStyle';

const ValidationPage = () => {
  const { cartId } = UseCartId();
  const { incrementPage } = useNavigateStep();
  const [formData, setFormData] = useState([]);

  const handleSubmit = () => {
    mutation.mutate();
    incrementPage();
  };

  const { data, status } = useQuery({
    queryKey: ['shareholder', cartId],
    queryFn: () => fetchValidation(cartId),
  });

  useEffect(() => {
    if (status === 'success' && data?.data.managers) {
      setFormData(data.data.managers.map((item) => ({ ...item })));
    } else if (status === 'error') {
      console.error('Failed to fetch validation data');
    }
  }, [data, status]);

  const handleFileChange = (file, index) => {
    const newFormData = [...formData];
    newFormData[index].file = file;
    setFormData(newFormData);
  };

  const mutation = useMutation({
    mutationKey: ['set management'],
    mutationFn: () => sendValidation(cartId, formData),
  });

  const handleRemoveFile = (index) => () => {
    const newFormData = [...formData];
    newFormData[index].file_manager = null;
    setFormData(newFormData);
  };

  const handleSwitchChange = (index) => (event) => {
    setFormData((prevFormData) => {
      const newFormData = [...prevFormData];
      newFormData[index].lock = event.target.checked;
      return newFormData;
    });
  };

  const handleTextFieldChange = (index, field) => (event) => {
    const newFormData = [...formData];
    newFormData[index][field] = event.target.value;
    setFormData(newFormData);
  };

  console.log(data);
  

  return (
    <div style={Styles.container}>
      <Box sx={Styles.box}>
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">اعتبار سنجی</h1>
        </div>
        {formData &&
          formData.map((item, index) => (
            <Validationfeatuer
              key={index}
              handleFileChange={handleFileChange}
              handleTextFieldChange={handleTextFieldChange}
              handleSwitchChange={handleSwitchChange}
              handleRemoveFile={handleRemoveFile}
              item={item}
              index={index}
              setFormData={setFormData}
            />
          ))}
        <SubmitButton onClick={handleSubmit} />
      </Box>
    </div>
  );
};

export default ValidationPage;
