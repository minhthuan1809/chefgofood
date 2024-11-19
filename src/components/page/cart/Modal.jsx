const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // Kiểm tra xem click có đúng vào overlay không
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-auto"
      onClick={handleOverlayClick}
    >
      <span
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={handleOverlayClick}
      ></span>
      <div
        className="bg-white rounded-lg h-[50rem] overflow-auto overflow-x-hidden scroll shadow-xl max-w-md p-6 relative z-60"
        // Ngăn chặn sự kiện click truyền xuống overlay
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
