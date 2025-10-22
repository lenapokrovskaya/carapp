import React from "react";
import type { Car } from "../../types";
import "./CarList.css";

interface CarListProps {
  cars: Car[];
  onDelete: (id: number) => void; // передаём функцию удаления
}

export const CarList: React.FC<CarListProps> = ({ cars, onDelete }) => {
  return (
    <section className="car-list-section">
      <h2>Список машин</h2>
      <div className="car-list">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <h3 className="car-name">{car.name}</h3>
            <p className="car-model">Model: {car.model}</p>
            <p className="car-year">Year: {car.year}</p>
            <p className="car-price">Price: ${car.price}</p>
            <p className="car-color">Color: {car.color}</p>
            <button className="delete-btn" onClick={() => onDelete(car.id)}>
              Удалить
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
