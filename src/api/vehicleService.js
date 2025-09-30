import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" }
});

export async function getVehicles() {
  const res = await api.get("/vehicles");
  return res.data;
}

export async function createVehicle(vehicle) {
  const res = await api.post("/vehicles", vehicle);
  return res.data;
}

export async function updateVehicle(id, vehicle) {
  const res = await api.put(`/vehicles/${id}`, vehicle);
  return res.data;
}

export async function deleteVehicle(id) {
  const res = await api.delete(`/vehicles/${id}`);
  return res.data;
}
