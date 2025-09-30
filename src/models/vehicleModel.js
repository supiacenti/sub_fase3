export function validateVehicle(vehicle) {
    const errors = {};
  
    // placa
    if (!vehicle.placa || !String(vehicle.placa).trim()) {
      errors.placa = "Placa é obrigatória";
    } else {
      const p = String(vehicle.placa).toUpperCase().replace(/\s+/g, "");
      if (!/^[A-Z]{3}-?\d{4}$/.test(p)) errors.placa = "Placa inválida (ex: ABC-1234)";
    }
  
    if (!vehicle.marca || !String(vehicle.marca).trim()) errors.marca = "Marca obrigatória";
    if (!vehicle.modelo || !String(vehicle.modelo).trim()) errors.modelo = "Modelo obrigatório";
  
    const current = new Date().getFullYear();
    if (vehicle.ano === undefined || vehicle.ano === null || String(vehicle.ano).trim() === "") {
      errors.ano = "Ano obrigatório";
    } else {
      const y = Number(vehicle.ano);
      if (Number.isNaN(y) || y < 1900 || y > current + 1) errors.ano = `Ano inválido (1900–${current + 1})`;
    }
  
    if (!vehicle.cor || !String(vehicle.cor).trim()) errors.cor = "Cor obrigatória";
  
    return errors;
  }
  