import { useMutation } from '@tanstack/react-query';
import UseCartId from 'src/hooks/card_id';
import PropTypes from 'prop-types';
import { SubmitButton } from 'src/components/button';
import useNavigateStep from 'src/hooks/use-navigate-step';
import MainForm from './othercasessection';
import { sendOtherCases } from '../service/othercases';

const OtherCasesFeatuer = ({ localData, setLocalData }) => {
  const { cartId } = UseCartId();
  const { incrementPage } = useNavigateStep();

  const mutation = useMutation({
    mutationKey: ['set othercases'],
    mutationFn: () => sendOtherCases(cartId, localData),
    onSuccess: (data) => {
      setLocalData(data);
    },
  });

  const handleButtonClick = (e) => {
    e.preventDefault();
    mutation.mutate(localData);
    incrementPage();
  };

  return (
    <form className="w-full">
      <MainForm localData={localData} setLocalData={setLocalData} />
      <SubmitButton onClick={handleButtonClick} />
    </form>
  );
};

OtherCasesFeatuer.propTypes = {
  localData: PropTypes.object.isRequired,
  setLocalData: PropTypes.func.isRequired,
};

export default OtherCasesFeatuer;
