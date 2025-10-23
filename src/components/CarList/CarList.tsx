import React, { useState } from "react";
import type { Car } from "../../types";
import "./CarList.css";

interface CarListProps {
  cars: Car[];
  onDelete: (id: number) => void;
  onEdit: (updatedCar: Car) => void;
}

export const CarList: React.FC<CarListProps> = ({ cars, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState({ name: "", price: "" });

  const startEdit = (car: Car) => {
    setEditingId(car.id);
    setEditData({ name: car.name, price: car.price.toString() });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = (car: Car) => {
    onEdit({
      ...car,
      name: editData.name,
      price: Number(editData.price),
    });
    setEditingId(null);
  };

  return (
    <section className="car-list-section">
      <h2>Список машин</h2>
      <div className="car-list">
        {cars.map(car => (
          <div key={car.id} className="car-card">
            {editingId === car.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleChange}
                />
                <button onClick={() => saveEdit(car)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
			    <div className="car-info-wrapper">
					<h3 className="car-name">{car.name}</h3>
					<p className="car-model">{car.model}</p>
					<p className="car-year">{car.year}</p>
					<p className="car-price">${car.price}</p>
					<p className="car-color">{car.color}</p>
				</div>
				<div className="car-button-wrapper">
					<button onClick={() => startEdit(car)}>Edit</button>
					<button className="delete-btn" onClick={() => onDelete(car.id)}>Delete</button>
				</div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
