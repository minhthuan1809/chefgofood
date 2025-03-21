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
      <div className="space-y-4 max-h-[28rem]  overflow-y-auto px-2">
        {addresses?.map((address) => (
          <button
            key={address.id}
            onClick={() => handleSelectAddress(address)}
            className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 hover:shadow-md
              ${
                selectedAddress?.id === address.id
                  ? "border-[#b17741] bg-[#fff8f3]"
                  : "border-gray-200 hover:border-[#b17741]/30 hover:bg-[#fff8f3]/50"
              }
            `}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2">
                <p
                  className={`font-semibold text-lg ${
                    selectedAddress?.id === address.id
                      ? "text-[#b17741]"
                      : "text-gray-800"
                  }`}
                >
                  {address.note}
                </p>
                <div className="space-y-1">
                  <p className="text-gray-600 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {address.phone}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {address.address}
                  </p>
                </div>
              </div>
              {selectedAddress?.id === address.id && (
                <span className="text-[#b17741] bg-[#b17741]/10 p-2 rounded-full">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default AddressModal;
