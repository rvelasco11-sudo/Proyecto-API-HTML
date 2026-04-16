import express from "express";
import cors from "cors";
import Almacen from "../../../Almacen.js";

const app = express();
const PORT = process.env.PORT || 3000;
const API_PREFIX = "/api";
app.use(cors());
app.use(express.json());

const almacen = new Almacen();

app.get("/vehiculos", (req, res) => {
  const lista = almacen.listar();
  res.json({ ok: true, data: lista, total: lista.length });
});

app.get("/vehiculos/:placa", (req, res) => {
  const { placa } = req.params;
  const vehiculo = almacen.buscarPorPlaca(placa);
  if (!vehiculo) {
    return res
      .status(404)
      .json({ ok: false, mensaje: `Vehículo con placa '${placa.toUpperCase()}' no encontrado` });
  }
  res.json({ ok: true, data: vehiculo });
});
app.post("/vehiculos", (req, res) => {
  const { placa, marca, modelo } = req.body;

  if (!placa || !marca || !modelo) {
    return res.status(400).json({
      ok: false,
      mensaje: "Los campos placa, marca y modelo son obligatorios",
    });
  }

  try {
    const nuevo = almacen.agregar(placa, marca, modelo);
    res.status(201).json({ ok: true, mensaje: "Vehículo agregado", data: nuevo.toJSON() });
  } catch (error) {
    res.status(409).json({ ok: false, mensaje: error.message });
  }
});

app.delete("/vehiculos/:placa", (req, res) => {
  const { placa } = req.params;
  const eliminado = almacen.eliminarPorPlaca(placa);
  if (!eliminado) {
    return res
      .status(404)
      .json({ ok: false, mensaje: `Vehículo con placa '${placa.toUpperCase()}' no encontrado` });
  }
  res.json({ ok: true, mensaje: "Vehículo eliminado", data: eliminado });
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});