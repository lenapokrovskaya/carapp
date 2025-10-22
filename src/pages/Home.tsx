import { useEffect, useState } from "react";
import { getVehicles } from "../api/vehicles";
import type { Car } from "../types";
import { CarForm } from "../components/CarForm";
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

  const handleDelete = (id: number) => {
    setVehicles(prev => prev.filter(car => car.id !== id));
  };

  if (loading) return <p>Загрузка машин...</p>;

  return (
    <main>
      <h1>Управление машинами</h1>
      <CarForm />
      <CarList cars={vehicles} onDelete={handleDelete} />
      <CarMap/>
    </main>
  );
};
