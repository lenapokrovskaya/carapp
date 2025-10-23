import { useEffect, useState } from "react";
import { getVehicles } from "../../api/vehicles";
import type { Car } from "../../types";
import { CarForm } from "../../components/CarForm/CarForm";
import { CarList } from "../../components/CarList/CarList";
import { CarMap } from "../../components/CarMap";
import "./Home.css";

export const Home = () => {
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>(""); // хранит выбранную опцию

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

  const handleAdd = (newCar: Car) => setVehicles(prev => [...prev, newCar]);

  const handleDelete = (id: number) => setVehicles(prev => prev.filter(car => car.id !== id));

  const handleEdit = (updatedCar: Car) =>
    setVehicles(prev => prev.map(car => (car.id === updatedCar.id ? updatedCar : car)));

  // сортировка по выбранной опции
  const sortedVehicles = [...vehicles].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  if (loading) return <p>Загрузка машин...</p>;

  return (
    <main className="home-main">
	<h1>Управление машинами</h1>

	<div className="sort-container">
		<label htmlFor="sort-select">Сортировка: </label>
		<select
		id="sort-select"
		value={sortOption}
		onChange={e => setSortOption(e.target.value)}
		>
		<option value="">Без сортировки</option>
		<option value="name-asc">Name ↑</option>
		<option value="name-desc">Name ↓</option>
		<option value="price-asc">Price ↑</option>
		<option value="price-desc">Price ↓</option>
		</select>
	</div>

	<CarForm onAdd={handleAdd} />
	<CarList cars={sortedVehicles} onDelete={handleDelete} onEdit={handleEdit} />
	<CarMap />
  </main>
  );
};
