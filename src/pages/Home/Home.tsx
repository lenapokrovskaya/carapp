import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles } from "../../api/vehicles";
import type { Car } from "../../types";
import { CarForm } from "../../components/CarForm/CarForm";
import { CarList } from "../../components/CarList/CarList";
import { CarMap } from "../../components/CarMap/CarMap";
import type { RootState } from "../../store";
import type { AppDispatch } from "../../store";
import { setCars, addCar, deleteCar, editCar, setLoading } from "../../store/carsSlice";
import "./Home.css";

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cars = useSelector((state: RootState) => state.cars.cars);
  const loading = useSelector((state: RootState) => state.cars.loading);
  const [sortOption, setSortOption] = useState<string>("");

  useEffect(() => {
    const fetchVehicles = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getVehicles();
        dispatch(setCars(data));
      } catch (error) {
        console.error("Ошибка при получении машин:", error);
        dispatch(setLoading(false));
      }
    };
    fetchVehicles();
  }, [dispatch]);

  const handleAdd = (newCar: Car) => dispatch(addCar(newCar));
  const handleDelete = (id: number) => dispatch(deleteCar(id));
  const handleEdit = (updatedCar: Car) => dispatch(editCar(updatedCar));

  const sortedVehicles = [...cars].sort((a, b) => {
    switch (sortOption) {
      case "name-asc": return a.name.localeCompare(b.name);
      case "name-desc": return b.name.localeCompare(a.name);
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      default: return 0;
    }
  });

  if (loading) return <p>Loading Cars...</p>;

  return (
    <main className="home-main">
      <h1 className="home-title">Car Management</h1>
      <CarForm onAdd={handleAdd} />
      <div className="container">
        <div className="sort-container">
          <label htmlFor="sort-select">Sorting: </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
          >
            <option value="">No Sorting</option>
            <option value="name-asc">Name ↑</option>
            <option value="name-desc">Name ↓</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>
        <CarList cars={sortedVehicles} onDelete={handleDelete} onEdit={handleEdit} />
        <CarMap cars={cars} />
      </div>
    </main>
  );
};
