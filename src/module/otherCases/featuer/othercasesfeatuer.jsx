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
    mutationKey: ['set management'],
    mutationFn: () => sendOtherCases(cartId, localData),
  });
  const handleButtonClick = () => {
    mutation.mutate();
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
  localData: PropTypes.object,
  setLocalData: PropTypes.func,
};

export default OtherCasesFeatuer;
