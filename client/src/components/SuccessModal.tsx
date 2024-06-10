import React from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<ModalProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Hurray Your Messege has sent</h2>
        <p className="mb-6">Please hold back. The admin will reply after his coffee</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Close
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
