import React from "react";
import Nav from "../header/Nav";

const products = [
  {
    id: 1,
    name: "Gà Rán",
    price: "50,000 VNĐ",
    image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
  },
  {
    id: 1,
    name: "Gà Rán",
    price: "50,000 VNĐ",
    image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
  },
  {
    id: 1,
    name: "Gà Rán",
    price: "50,000 VNĐ",
    image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
  },
  {
    id: 1,
    name: "Gà Rán",
    price: "50,000 VNĐ",
    image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
  },
  {
    id: 1,
    name: "Gà Rán",
    price: "50,000 VNĐ",
    image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
  },
  {
    id: 1,
    name: "Gà Rán",
    price: "50,000 VNĐ",
    image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
  },
  {
    id: 1,
    name: "Gà Rán",
    price: "50,000 VNĐ",
    image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
  },
  {
    id: 1,
    name: "Gà Rán",
    price: "50,000 VNĐ",
    image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
  },
  {
    id: 1,
    name: "Gà Rán",
    price: "50,000 VNĐ",
    image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
  },
  {
    id: 1,
    name: "Gà Rán",
    price: "50,000 VNĐ",
    image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
  },
  // Add more products as needed
];

export default function Products() {
  return (
    <div>
      <header>
        <Nav />
      </header>
      <main className="pt-[6rem] w-4/5 m-auto">
        <h1 className="text-4xl text-center italic font-bold drop-shadow-lg">
          Đồ Ăn
        </h1>
        <ul className="flex gap-11 justify-center mt-3 items-center">
          <li className="bg-blue-600 text-white px-5 py-1 rounded-full">All</li>
          <li>Đồ Ăn</li>
          <li>Đồ Uống</li>
          <li>Bánh</li>
        </ul>
        <div className="mt-5">
          <ul className="grid grid-cols-4  items-center">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex flex-col items-center border p-4 rounded-lg shadow-md mb-4"
              >
                <div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-48 h-32 object-cover rounded-lg"
                  />
                </div>
                <p className="font-semibold mt-2">{product.name}</p>
                <p className="text-gray-600">{product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
