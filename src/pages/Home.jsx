import React, { useState, useEffect } from "react";
import VehicleForm from "../components/VehicleForm";
import VehicleList from "../components/VehicleList";
import VehicleDetails from "../components/VehicleDetails";
import {
  fetchVehicles,
  addVehicle,
  editVehicle,
  removeVehicle,
} from "../controllers/vehicleController";

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [showing, setShowing] = useState(null);

  // filtros
  const [filterMarca, setFilterMarca] = useState("");
  const [filterAno, setFilterAno] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchVehicles();

      const normalized = (data || [])
        .filter((v) => v)
        .map((v) => ({
          ...v,
          id: String(v.id),
          ano: v.ano ? String(v.ano) : "",
        }));

      setVehicles(normalized);
    } catch (err) {
      console.error("Erro carregando veículos:", err);
      setError("Erro ao carregar veículos.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(data) {
    try {
      if (editing) {
        await editVehicle(String(editing.id), data);

        setVehicles((prev) =>
          prev.map((v) =>
            String(v.id) === String(editing.id)
              ? { ...v, ...data, id: String(editing.id) }
              : v
          )
        );

        setEditing(null);
      } else {
        const created = await addVehicle(data);

        if (!created || !created.id) {
          alert("Erro: servidor não retornou veículo criado.");
          return;
        }

        const norm = {
          ...created,
          id: String(created.id),
          ano: String(created.ano ?? data.ano ?? ""),
        };

        setVehicles((prev) => [...prev, norm]);
      }
    } catch (err) {
      console.error("Erro salvando veículo:", err);
      alert("Erro ao salvar veículo.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja excluir este veículo?")) return;

    try {
      await removeVehicle(String(id));
      setVehicles((prev) => prev.filter((v) => String(v.id) !== String(id)));
    } catch (err) {
      console.error("Erro excluindo veículo:", err);
      alert("Erro ao excluir veículo.");
    }
  }

  const filteredVehicles = vehicles.filter((v) => {
    return (
      (!filterMarca || v.marca.toLowerCase().includes(filterMarca.toLowerCase())) &&
      (!filterAno || String(v.ano) === String(filterAno))
    );
  });

  if (loading) return <div>Carregando veículos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Gerenciador de Veículos</h1>

      <VehicleForm
        key={editing?.id || "new"}
        onSave={handleSave}
        initial={editing}
        onCancel={() => setEditing(null)}
      />

      <div className="flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium">Filtrar por Marca</label>
          <input
            type="text"
            value={filterMarca}
            onChange={(e) => setFilterMarca(e.target.value)}
            className="mt-1 block w-full rounded-md border p-2"
            placeholder="Ex: Toyota"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Filtrar por Ano</label>
          <input
            type="number"
            value={filterAno}
            onChange={(e) => setFilterAno(e.target.value)}
            className="mt-1 block w-full rounded-md border p-2"
            placeholder="Ex: 2020"
          />
        </div>
      </div>

      <VehicleList
        vehicles={filteredVehicles.filter((v) => v && v.id)}
        onEdit={setEditing}
        onDelete={handleDelete}
        onShow={setShowing}
      />

      {showing && (
        <VehicleDetails vehicle={showing} onClose={() => setShowing(null)} />
      )}
    </div>
  );
}
