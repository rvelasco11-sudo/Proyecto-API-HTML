import Vehiculo from "./Vehiculo.js";

class Almacen {
  constructor() {
    this.vehiculos = [];
  }

  agregar(placa, marca, modelo) {
    const existe = this.vehiculos.find(
      (v) => v.placa === placa.toUpperCase().trim()
    );
    if (existe) {
      throw new Error(`Ya existe un vehículo con la placa ${placa.toUpperCase().trim()}`);
    }
    const nuevo = new Vehiculo(placa, marca, modelo);
    this.vehiculos.push(nuevo);
    return nuevo;
  }

  listar() {
    return this.vehiculos.map((v) => v.toJSON());
  }

  buscarPorPlaca(placa) {
    const vehiculo = this.vehiculos.find(
      (v) => v.placa === placa.toUpperCase().trim()
    );
    return vehiculo ? vehiculo.toJSON() : null;
  }

  eliminarPorPlaca(placa) {
    const index = this.vehiculos.findIndex(
      (v) => v.placa === placa.toUpperCase().trim()
    );
    if (index === -1) return null;
    const eliminado = this.vehiculos.splice(index, 1)[0];
    return eliminado.toJSON();
  }
}

export default Almacen;