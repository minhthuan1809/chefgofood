import Modal from "./Modal";

const AddressModal = ({
  isOpen,
  onClose,
  addresses,
  selectedAddress,
  onSelect,
}) => {
  const handleSelectAddress = (address) => {
    onSelect(address);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chọn địa chỉ giao hàng">
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {addresses?.map((address) => (
          <button
            key={address.id}
            onClick={() => handleSelectAddress(address)}
            className={`w-full text-left p-4 rounded-lg border transition-colors ${
              selectedAddress?.id === address.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{address.note}</p>
                <p className="text-gray-600">{address.phone}</p>
                <p className="text-gray-600">{address.address}</p>
              </div>
              {selectedAddress?.id === address.id && (
                <span className="text-blue-600">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default AddressModal;
