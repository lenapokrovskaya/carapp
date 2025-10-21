import axios from "axios";
import type { Car } from "../types";

const BASE_URL = "https://ofc-test-01.tspb.su/test-task";

export const getVehicles = async (): Promise<Car[]> => {
  const response = await axios.get<Car[]>(`${BASE_URL}/vehicles`);
  return response.data;
};
