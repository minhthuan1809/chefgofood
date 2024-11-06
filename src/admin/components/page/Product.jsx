import { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const ProductManagement = () => {
  const [products, setProducts] = useState([
    {
      id: "bò_1",
      name: "Burger Beef",
      description: "Burger bò tươi ngon với phô mai và rau",
      sold: 150,
      price: 50000,
      quantity: 10000,
      type: "food",
      status: "Còn hàng",
      discount: 0,
      image_url: "https://reneenicolesk...",
      created_at: "2024-11-01 00:00:00",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-xl font-bold text-gray-500">Quản lý sản phẩm</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <FaPlus className="mr-2" />
            Thêm
          </button>
        </div>

        <div className="p-4">
          {/* Search Bar */}
          <div className="mb-4 flex gap-2">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-2 border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setSearchTerm("")}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              <BiRefresh className="text-xl text-gray-500" />
            </button>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left text-gray-500">Hình ảnh</th>
                  <th className="p-2 text-left text-gray-500">Tên</th>
                  <th className="p-2 text-left text-gray-500">Mô tả</th>
                  <th className="p-2 text-right text-gray-500">Giá</th>
                  <th className="p-2 text-right text-gray-500">Số lượng</th>
                  <th className="p-2 text-center text-gray-500">Loại</th>
                  <th className="p-2 text-center text-gray-500">Trạng thái</th>
                  <th className="p-2 text-center text-gray-500">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-t hover:bg-gray-50">
                    <td className="p-2">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.description}</td>
                    <td className="p-2 text-right">
                      {parseInt(product.price).toLocaleString()}đ
                    </td>
                    <td className="p-2 text-right">{product.quantity}</td>
                    <td className="p-2 text-center">{product.type}</td>
                    <td className="p-2 text-center">
                      <span
                        className={`px-2 py-1 rounded ${
                          product.status === "Còn hàng"
                            ? "bg-green-100 text-green-800"
                            : product.status === "Hết hàng"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="p-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          className="p-2 text-blue-500 hover:bg-blue-100 rounded"
                          onClick={() => {
                            /* Edit logic */
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="p-2 text-red-500 hover:bg-red-100 rounded"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
