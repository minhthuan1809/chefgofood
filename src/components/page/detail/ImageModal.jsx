/* eslint-disable react/prop-types */
const ImageModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full">
        <button
          className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          ×
        </button>
        <img src={imageUrl} alt="Review" className="w-full h-auto rounded-lg" />
      </div>
    </div>
  );
};

export default ImageModal;
