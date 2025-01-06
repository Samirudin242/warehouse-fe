type Product = {
  key: React.Key;
  name: string;
  sku: string;
  stock: number;
  price: number;
  warehouse: string;
  brand: string;
  color: string;
  size: string;
  category: string;
  photo: string;
};

export const products: Product[] = [
  {
    key: "1",
    name: "Product 1",
    sku: "P001",
    stock: 30,
    price: 15.99,
    warehouse: "W001",
    brand: "B001",
    color: "Red",
    size: "M",
    category: "Electronics",
    photo: "https://via.placeholder.com/50",
  },
  {
    key: "2",
    name: "Product 2",
    sku: "P002",
    stock: 50,
    price: 25.99,
    warehouse: "W001",
    brand: "B001",
    color: "Red",
    size: "M",
    category: "Clothing",
    photo: "https://via.placeholder.com/50",
  },
  {
    key: "3",
    name: "Product 3",
    sku: "P003",
    stock: 10,
    price: 9.99,
    warehouse: "W001",
    brand: "B001",
    color: "Red",
    size: "M",
    category: "Groceries",
    photo: "https://via.placeholder.com/50",
  },
  {
    key: "4",
    name: "Product 4",
    sku: "P004",
    stock: 20,
    price: 5.99,
    warehouse: "W001",
    brand: "B001",
    color: "Red",
    size: "M",
    category: "Toys",
    photo: "https://via.placeholder.com/50",
  },
  {
    key: "5",
    name: "Product 5",
    sku: "P005",
    stock: 5,
    price: 19.99,
    warehouse: "W001",
    brand: "B001",
    color: "Red",
    size: "M",
    category: "Electronics",
    photo: "https://via.placeholder.com/50",
  },
  {
    key: "6",
    name: "Product 6",
    sku: "P006",
    stock: 100,
    price: 12.99,
    warehouse: "W001",
    brand: "B001",
    color: "Red",
    size: "M",
    category: "Clothing",
    photo: "https://via.placeholder.com/50",
  },
];
