const programacionModelo = require('../modelos/programacion_modelo');

// Crear
const crearFinca = (req, res) => {
  const { nombre, area, origen, fk_persona, fk_dron } = req.body;
  programacionModelo.insertarFinca(nombre, area, origen, fk_persona, fk_dron, (error, id) => {
    if (error) {
      console.error('Error al crear la finca:', error);
      return res.status(500).json({ error: 'Error al crear la finca' });
    }
    res.status(201).json({ id });
  });
};

const crearTrabajo = (req, res) => {
  const { fecha_inicio, fecha_final, origen, fk_finca, fk_factura } = req.body;
  programacionModelo.insertarTrabajo(fecha_inicio, fecha_final, origen, fk_finca, fk_factura, (error, id) => {
    if (error) {
      console.error('Error al crear el trabajo:', error);
      return res.status(500).json({ error: 'Error al crear el trabajo' });
    }
    res.status(201).json({ id });
  });
};

const crearPersona = (req, res) => {
  const { nombres, apellidos, origen } = req.body;
  programacionModelo.insertarPersona(nombres, apellidos, origen, (error, id) => {
    if (error) {
      console.error('Error al crear la persona:', error);
      return res.status(500).json({ error: 'Error al crear la persona' });
    }
    res.status(201).json({ id });
  });
};

const crearDron = (req, res) => {
  const { nombre, origen } = req.body;
  programacionModelo.insertarDron(nombre, origen, (error, id) => {
    if (error) {
      console.error('Error al crear el dron:', error);
      return res.status(500).json({ error: 'Error al crear el dron' });
    }
    res.status(201).json({ id });
  });
};

const crearFactura = (req, res) => {
  const { corte_facturacion, precio, total_factura, codigo_factura, origen } = req.body;
  programacionModelo.insertarFactura(corte_facturacion, precio, total_factura, codigo_factura, origen, (error, id) => {
    if (error) {
      console.error('Error al crear la factura:', error);
      return res.status(500).json({ error: 'Error al crear la factura' });
    }
    res.status(201).json({ id });
  });
};

const crearAvance = (req, res) => {
  const { mes, origen, fk_trabajo } = req.body;
  programacionModelo.insertarAvance(mes, origen, fk_trabajo, (error, id) => {
    if (error) {
      console.error('Error al crear la factura:', error);
      return res.status(500).json({ error: 'Error al crear la factura' });
    }
    res.status(201).json({ id });
  });
};
// Leer
const obtenerProgramaciones = (req, res) => {
  programacionModelo.obtenerProgramaciones((error, rows) => {
    if (error) {
      console.error("Error al obtener las programaciones:", error);
      return res.status(500).json({ error: "Error al obtener las programaciones" });
    }

    const fincasMap = new Map();

    rows.forEach(row => {
      if (!fincasMap.has(row.finca_id)) {
        fincasMap.set(row.finca_id, {
          id: row.finca_id,
          finca_nombre: row.finca_nombre,
          area: row.area,
          fk_persona: row.fk_persona,
          persona_nombre_completo: row.persona_nombre_completo,
          fk_dron: row.fk_dron,
          dron_nombre: row.dron_nombre,
          trabajos: []
        });
      }

      const finca = fincasMap.get(row.finca_id);

      if (row.trabajo_id) {
        let trabajo = finca.trabajos.find(t => t.id === row.trabajo_id);
        if (!trabajo) {
          trabajo = {
            id: row.trabajo_id,
            fecha_inicio: row.fecha_inicio,
            fecha_final: row.fecha_final,
            fk_factura: row.factura_id,
            corte_facturacion: row.corte_facturacion,
            precio: row.precio,
            total_factura: row.total_factura,
            codigo_factura: row.codigo_factura,
            avances: []
          };
          finca.trabajos.push(trabajo);
        }
        

        if (row.avance_id) {
          trabajo.avances.push({
            id: row.avance_id,
            avance_mes: row.avance_mes,
          });
        }
      }
    });

    res.status(200).json(Array.from(fincasMap.values()));
  });
};


// Actualizar
const actualizarFinca = (req, res) => {
  const id = req.params.id;
  const { nombre, area, origen, fk_persona, fk_dron } = req.body;
  programacionModelo.actualizarFinca(id, nombre, area, origen, fk_persona, fk_dron, (error) => {
    if (error) {
      console.error('Error al actualizar la finca:', error);
      return res.status(500).json({ error: 'Error al actualizar la finca' });
    }
    res.status(200).json({ message: 'Finca actualizada correctamente' });
  });
};

const actualizarTrabajo = (req, res) => {
  const id = req.params.id;
  const { fecha_inicio, fecha_final, origen, fk_finca, fk_factura } = req.body;
  programacionModelo.actualizarTrabajo(id, fecha_inicio, fecha_final, origen, fk_finca, fk_factura, (error) => {
    if (error) {
      console.error('Error al actualizar el trabajo:', error);
      return res.status(500).json({ error: 'Error al actualizar el trabajo' });
    }
    res.status(200).json({ message: 'Trabajo actualizado correctamente' });
  });
};

const actualizarPersona = (req, res) => {
  const id = req.params.id;
  const {nombres, apellidos, origen } = req.body;
  programacionModelo.actualizarPersona(id, nombres, apellidos, origen, (error) => {
    if (error) {
      console.error('Error al actualizar la persona:', error);
      return res.status(500).json({ error: 'Error al actualizar la persona' });
    }
    res.status(200).json({ message: 'Persona actualizada correctamente' });
  });
};

const actualizarDron = (req, res) => {
  const id = req.params.id;
  const { nombre, origen } = req.body;
  programacionModelo.actualizarDron(id, nombre, origen, (error) => {
    if (error) {
      console.error('Error al actualizar el dron:', error);
      return res.status(500).json({ error: 'Error al actualizar el dron' });
    }
    res.status(200).json({ message: 'Dron actualizado correctamente' });
  });
};

const actualizarFactura = (req, res) => {
  const id = req.params.id;
  const { corte_facturacion, precio, total_factura, codigo_factura, origen } = req.body;
  programacionModelo.actualizarFactura(id, corte_facturacion, precio, total_factura, codigo_factura, origen, (error) => {
    if (error) {
      console.error('Error al actualizar la factura:', error);
      return res.status(500).json({ error: 'Error al actualizar la factura' });
    }
    res.status(200).json({ message: 'Factura actualizada correctamente' });
  });
};

const actualizarAvance = (req, res) => {
  const id = req.params.id;
  const { mes, origen, fk_trabajo } = req.body;
  programacionModelo.actualizarAvance(id, mes, fk_trabajo, origen, (error) => {
    if (error) {
      console.error('Error al actualizar la factura:', error);
      return res.status(500).json({ error: 'Error al actualizar la factura' });
    }
    res.status(200).json({ message: 'Factura actualizada correctamente' });
  });
};

// Eliminar
const eliminarProgramacion = (req, res) => {
  const { id } = req.params;
  programacionModelo.eliminarProgramacion(id, (error) => {
    if (error) {
      console.error('Error al eliminar la programación:', error);
      return res.status(500).json({ error: 'Error al eliminar la programación' });
    }
    res.status(200).json({ message: 'Programación eliminada correctamente' });
  });
};

module.exports = {
  crearFinca,
  crearTrabajo,
  crearPersona,
  crearDron,
  crearFactura,
  crearAvance,
  obtenerProgramaciones,
  actualizarFinca,
  actualizarTrabajo,
  actualizarPersona,
  actualizarDron,
  actualizarFactura,
  actualizarAvance,
  eliminarProgramacion
};
