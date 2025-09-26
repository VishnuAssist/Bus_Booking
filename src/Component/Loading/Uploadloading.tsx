
import { Modal, Typography, styled } from '@mui/material';

const BlinkingText = styled(Typography)({
  animation: 'blink 1s infinite',
  '@keyframes blink': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
});

interface UploadModalProps {
  isOpen: boolean;
  percentage?: number;
}

function UploadModal({ isOpen }: UploadModalProps) {
  return (
    <Modal open={isOpen}>
      <div
        style={{
          minWidth: '250px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'blue',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          outline: 'none',
        }}
      >
        <BlinkingText variant="h5"  gutterBottom>
          Uploading...
        </BlinkingText>
      </div>
    </Modal>
  );
}

export default UploadModal;
