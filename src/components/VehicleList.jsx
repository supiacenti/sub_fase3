import React from "react";

export default function VehicleList({ vehicles, onEdit, onDelete, onShow }) {
  const safe = Array.isArray(vehicles) ? vehicles.filter((v) => v && typeof v === "object" && (v.id || v.placa)) : [];

  if (!safe.length) return <div className="p-4 text-sm text-gray-600">Nenhum veículo cadastrado.</div>;

  return (
    <div className="space-y-2">
      {safe.map((v) => {
        const key = String(v.id ?? (v.placa ?? Math.random()));
        return (
          <div key={key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded border p-3">
            <div>
              <div className="font-semibold">{v.placa} — {v.marca} {v.modelo}</div>
              <div className="text-sm text-gray-600">{v.ano} • {v.cor}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onShow(v)} className="rounded border px-3 py-1 text-sm">Ver</button>
              <button onClick={() => onEdit(v)} className="rounded border px-3 py-1 text-sm">Editar</button>
              <button onClick={() => onDelete(v.id)} className="rounded bg-red-600 px-3 py-1 text-sm text-white">Excluir</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
