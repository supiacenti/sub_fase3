import React from "react";

export default function VehicleDetails({ vehicle, onClose }) {
  if (!vehicle) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded bg-white p-6">
        <h3 className="text-lg font-bold">Detalhes do veículo</h3>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div><strong>Placa</strong><div>{vehicle.placa}</div></div>
          <div><strong>Marca</strong><div>{vehicle.marca}</div></div>
          <div><strong>Modelo</strong><div>{vehicle.modelo}</div></div>
          <div><strong>Ano</strong><div>{vehicle.ano}</div></div>
          <div className="col-span-2"><strong>Cor</strong><div>{vehicle.cor}</div></div>
        </div>
        <div className="mt-4 text-right">
          <button onClick={onClose} className="rounded border px-4 py-2">Fechar</button>
        </div>
      </div>
    </div>
  );
}
