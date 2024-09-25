import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { AddFormButton, SubmitButton } from 'src/components/button';
import UseCartId from 'src/hooks/card_id';
import useNavigateStep from 'src/hooks/use-navigate-step';
import { sendShareholder } from '../service/shereholderservice';

const ShareHolderButton = ({ handleAddSection, formSections }) => {
  const { cartId } = UseCartId();
  const { incrementPage } = useNavigateStep();
  const mutation = useMutation({
    mutationKey: ['shereholder'],
    mutationFn: (sections) => sendShareholder(cartId, sections),
  });
  const handleSubmit = () => {
    mutation.mutateAsync(formSections).then(() => incrementPage());
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 3,
        width: '100%',
      }}
    >
      <div className="flex justify-center gap-3">
        <AddFormButton onClick={handleAddSection} />
      </div>
      <SubmitButton onClick={handleSubmit} />
    </Box>
  );
};

ShareHolderButton.propTypes = {
  handleAddSection: PropTypes.func,
  formSections: PropTypes.object,
};

export default ShareHolderButton;
