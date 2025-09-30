import axios from "axios";

// ajuste se precisar: porta 3001 se o front está no 3000
const api = axios.create({
  baseURL: "http://localhost:3000", 
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchVehicles() {
  const res = await api.get("/vehicles");
  return res.data;
}

export async function addVehicle(vehicle) {
  const res = await api.post("/vehicles", vehicle);
  return res.data;
}

export async function editVehicle(id, vehicle) {
  // ⚠️ se o servidor não retorna nada, devolvemos o que mandamos
  try {
    const res = await api.put(`/vehicles/${id}`, vehicle);
    return res.data || { ...vehicle, id };
  } catch (err) {
    console.error("Erro no editVehicle:", err);
    throw err;
  }
}

export async function removeVehicle(id) {
  await api.delete(`/vehicles/${id}`);
  return true;
}
