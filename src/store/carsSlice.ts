import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Car } from "../types";

interface CarsState {
  cars: Car[];
  loading: boolean;
}

const initialState: CarsState = {
  cars: [],
  loading: true,
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
      state.loading = false;
    },
    addCar: (state, action: PayloadAction<Car>) => {
      state.cars.push(action.payload);
    },
    deleteCar: (state, action: PayloadAction<number>) => {
      state.cars = state.cars.filter(car => car.id !== action.payload);
    },
    editCar: (state, action: PayloadAction<Car>) => {
      state.cars = state.cars.map(car =>
        car.id === action.payload.id ? action.payload : car
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCars, addCar, deleteCar, editCar, setLoading } = carsSlice.actions;
export default carsSlice.reducer;
