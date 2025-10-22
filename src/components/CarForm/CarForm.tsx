import React, { useState } from "react";
import type { Car } from "../../types";
import "./CarForm.css";

interface CarFormProps {
  onAdd: (newCar: Car) => void;
}

export const CarForm: React.FC<CarFormProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    year: "",
    color: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // создаём объект Car
    const newCar: Car = {
      id: Date.now(), // временный ID (можно заменить, если сервер возвращает ID)
      name: formData.name,
      model: formData.model,
      year: Number(formData.year),
      color: formData.color,
      price: Number(formData.price),
      latitude: 0,
      longitude: 0,
    };

    onAdd(newCar); // передаём новую машину наверх
    setFormData({ name: "", model: "", year: "", color: "", price: "" }); // очищаем форму
  };

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={formData.model}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="color"
        placeholder="Color"
        value={formData.color}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Car</button>
    </form>
  );
};
