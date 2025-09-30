import React, { useEffect, useState } from "react";
import { validateVehicle } from "../models/vehicleModel";

export default function VehicleForm({ onSave, initial = null, onCancel }) {
  const [form, setForm] = useState(initial || { placa: "", marca: "", modelo: "", ano: "", cor: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initial || { placa: "", marca: "", modelo: "", ano: "", cor: "" });
    setErrors({});
  }, [initial]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // uppercase, no space
    const norm = { ...form, placa: form.placa ? String(form.placa).toUpperCase().replace(/\s+/g, "") : form.placa };

    // front validation
    const validation = validateVehicle(norm);
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    try {
      await onSave(norm);
      if (!initial) setForm({ placa: "", marca: "", modelo: "", ano: "", cor: "" });
    } catch (err) {
      if (err?.validation) {
        setErrors(err.validation);
      } else {
        console.error("Erro no onSave:", err);
        alert("Erro ao salvar veículo (ver console)");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Placa</label>
        <input
          name="placa"
          value={form.placa}
          onChange={handleChange}
          placeholder="ABC-1234"
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.placa && <p className="text-xs text-red-600">{errors.placa}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Marca</label>
        <input
          name="marca"
          value={form.marca}
          onChange={handleChange}
          placeholder="Ex: Toyota"
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.marca && <p className="text-xs text-red-600">{errors.marca}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Modelo</label>
        <input
          name="modelo"
          value={form.modelo}
          onChange={handleChange}
          placeholder="Ex: Corolla"
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.modelo && <p className="text-xs text-red-600">{errors.modelo}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Ano</label>
        <input
          name="ano"
          type="number"
          value={form.ano}
          onChange={handleChange}
          placeholder="Ex: 2020"
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.ano && <p className="text-xs text-red-600">{errors.ano}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Cor</label>
        <input
          name="cor"
          value={form.cor}
          onChange={handleChange}
          placeholder="Ex: Prata"
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.cor && <p className="text-xs text-red-600">{errors.cor}</p>}
      </div>

      <div className="flex gap-2">
        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
          {initial ? "Salvar" : "Cadastrar"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="rounded border px-4 py-2">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
