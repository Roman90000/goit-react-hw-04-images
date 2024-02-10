import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const CustomModal = ({
  modalIsOpen,
  image,
  tags,
  onRequestClose,
  closeModal,
}) => {
  return (
    <Modal
      style={customStyles}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <img src={image} alt={tags} />
    </Modal>
  );
};
