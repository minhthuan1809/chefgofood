import React from "react";
import PropTypes from "prop-types";

export default function ShippingAddress({ address, onChangeClick }) {
  return (
    <div>
      {" "}
      <div className="mb-6 p-4 border rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium">Địa chỉ giao hàng</h4>
          <button
            onClick={onChangeClick}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Thay đổi
          </button>
        </div>
        {address ? (
          <div>
            <p className="font-medium">{address.note}</p>
            <p className="text-gray-600">{address.phone}</p>
            <p className="text-gray-600">{address.address}</p>
          </div>
        ) : (
          <p className="text-gray-500">Chưa có địa chỉ giao hàng</p>
        )}
      </div>
    </div>
  );
}

ShippingAddress.propTypes = {
  address: PropTypes.shape({
    note: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
  }),
  onChangeClick: PropTypes.func.isRequired,
};
