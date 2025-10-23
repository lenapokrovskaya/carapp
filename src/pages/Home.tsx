import { useEffect, useState } from "react";
import { getVehicles } from "../api/vehicles";
import type { Car } from "../types";
import { CarForm } from "../components/CarForm/CarForm";
import { CarList } from "../components/CarList/CarList";
import { CarMap } from "../components/CarMap";

export const Home = () => {
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (error) {
        console.error("Ошибка при получении машин:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleAdd = (newCar: Car) => {
    setVehicles(prev => [...prev, newCar]);
  };

  const handleDelete = (id: number) => {
    setVehicles(prev => prev.filter(car => car.id !== id));
  };

  const handleEdit = (updatedCar: Car) => {
  setVehicles(prev =>
    prev.map(car => (car.id === updatedCar.id ? updatedCar : car))
  );
};


  if (loading) return <p>Загрузка машин...</p>;

  return (
    <main>
      <h1>Управление машинами</h1>
      <CarForm onAdd={handleAdd} />
      <CarList cars={vehicles} onDelete={handleDelete} onEdit={handleEdit} />
      <CarMap/>
    </main>
  );
};
