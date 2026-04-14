class Vehiculo {
  constructor(placa, marca, modelo) {
    this.placa = placa.toUpperCase().trim();
    this.marca = marca.trim();
    this.modelo = modelo.trim();
  }

  toJSON() {
    return {
      placa: this.placa,
      marca: this.marca,
      modelo: this.modelo,
    };
  }
}

export default Vehiculo;