/* eslint-disable no-nested-ternary */
import { Box } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import UseCartId from 'src/hooks/card_id';
import useNavigateStep from 'src/hooks/use-navigate-step';
import { SubmitButton } from 'src/components/button';
import { fetchHistory, uploadHistoryFile } from '../service/usehistory';
import Styles from '../style.jsx/historyStyle';
import HistoryFeature from '../feature/historyfeature';

const HistoryPage = () => {
  const { incrementPage } = useNavigateStep();
  const { cartId } = UseCartId();
  const { data, status, error } = useQuery({
    queryKey: ['history', cartId],
    queryFn: () => fetchHistory(cartId),
  });

  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (status === 'success') {
      if (data && data.manager) {
        setFormData(
          data.manager.map((item) => ({
            ...item,
            lock: item.lock || false,
          }))
        );
      }
    }
  }, [data, status, error]);

  const mutation = useMutation({
    mutationKey: ['uploadHistoryFile'],
    mutationFn: () => uploadHistoryFile(cartId, formData),
  });

  const handleFileChange = (file, index) => {
    const newFormData = [...formData];
    newFormData[index].file = file;
    setFormData(newFormData);
  };

  const handleRemoveFile = (index) => () => {
    const newFormData = [...formData];
    newFormData[index].file = null;
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

  const handleButtonClick = () => {
    if (formData.length > 0) {
      mutation.mutate(formData);
    }
    incrementPage();
  };

  return (
    <div style={Styles.container}>
      <Box sx={Styles.box}>
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">سوءپیشینه</h1>
        </div>
        {formData.length > 0 &&
          formData.map((item, index) => (
            <HistoryFeature
              key={index}
              index={index}
              item={item}
              handleTextFieldChange={handleTextFieldChange}
              handleSwitchChange={handleSwitchChange}
              handleRemoveFile={handleRemoveFile}
              handleFileChange={handleFileChange}
            />
          ))}
        <SubmitButton onClick={handleButtonClick} />
      </Box>
    </div>
  );
};

export default HistoryPage;
