const db = require('../config_db/database');

// Funcion de crear el objeto finca
const insertarFinca = (nombre, area, origen, fk_persona, fk_dron, callback) => {
  db.query(
    'INSERT INTO finca (nombre, area, origen, fk_persona, fk_dron) VALUES (?, ?, ?, ?, ?)',
    [nombre, area, origen, fk_persona, fk_dron],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    }
  );
};


// Funcion de crear el objeto trabajo
const insertarTrabajo = (fecha_inicio, fecha_final, origen, fk_finca, fk_factura, callback) => {
  db.query(
    'INSERT INTO trabajo (fecha_inicio, fecha_final, origen, fk_finca, fk_factura) VALUES (?, ?, ?, ?, ?)',
    [fecha_inicio, fecha_final, origen, fk_finca, fk_factura],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    }
  );
};


// Funcion de crear el objeto persona
const insertarPersona = (nombres, apellidos, origen, callback) => {
  db.query(
    'INSERT INTO personas (nombres, apellidos, origen) VALUES (?, ?, ?)',
    [nombres, apellidos, origen],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    }
  );
};


// Funcion de crear el objeto dron
const insertarDron = (nombre, origen, callback) => {
  db.query(
    'INSERT INTO dron (nombre, origen) VALUES (?, ?)',
    [nombre, origen],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    }
  );
};


// Funcion de crear el objeto factura 
const insertarFactura = (corte_facturacion, precio, total_factura, codigo_factura, origen, callback) => {
  db.query(
    'INSERT INTO factura (corte_facturacion, precio, total_factura, codigo_factura, origen) VALUES (?, ?, ?, ?, ?)',
    [corte_facturacion, precio, total_factura, codigo_factura, origen],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    }
  );
};


// Funcion de crear el objeto avance
const insertarAvance = (mes, origen, fk_trabajo, callback) => {
  db.query(
    'INSERT INTO avance (mes, origen, fk_trabajo) VALUES (?, ?, ?)',
    [mes, origen, fk_trabajo],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    }
  );
};



/*Se crea la funcion "ObtenerProgramaciones" que esta compuesta de una query que hace un llamado a la base de datos 
para obtener todos los datos de las entidades cuyo valor en el dato origen se igual a formulario2*/
const obtenerProgramaciones = (callback) => {
  db.query(`
    SELECT 
      finca.id AS finca_id, finca.nombre AS finca_nombre,finca.area,finca.fk_persona,finca.fk_dron,
      personas.id AS personas_id, personas.nombres, personas.apellidos,
      CONCAT(personas.nombres, ' ', personas.apellidos) AS persona_nombre_completo,
      trabajo.id AS trabajo_id,
      DATE_FORMAT(trabajo.fecha_inicio, '%Y-%m-%d') AS fecha_inicio, 
      DATE_FORMAT(trabajo.fecha_final, '%Y-%m-%d') AS fecha_final,
      trabajo.fk_factura,
      dron.id AS dron_id,
      dron.nombre AS dron_nombre,
      factura.id AS factura_id, factura.corte_facturacion, factura.precio, factura.total_factura, factura.codigo_factura,
      avance.id AS avance_id, avance.mes AS avance_mes
    FROM finca
    LEFT JOIN personas ON finca.fk_persona = personas.id AND personas.origen = 'formulario2'
    LEFT JOIN trabajo ON trabajo.fk_finca = finca.id AND finca.origen = 'formulario2'
    LEFT JOIN dron ON finca.fk_dron = dron.id AND dron.origen = 'formulario2'
    LEFT JOIN factura ON trabajo.fk_factura = factura.id AND factura.origen = 'formulario2'
    LEFT JOIN avance ON avance.fk_trabajo = trabajo.id AND trabajo.origen = 'formulario2'
    WHERE finca.origen = 'formulario2';
  `, (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

// Funcion de actualizar el objeto finca
const actualizarFinca = (id, nombre, area, origen, fk_persona, fk_dron, callback) => {
  db.query(
    'UPDATE finca SET nombre = ?, area = ?, origen=?, fk_persona = ?, fk_dron = ? WHERE id = ?',
    [nombre, area, origen, fk_persona, fk_dron, id],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};


// Funcion de actualizar el objeto trabajo
const actualizarTrabajo = (id, fecha_inicio, fecha_final, origen, fk_finca, fk_factura, callback) => {
  db.query(
    'UPDATE trabajo SET fecha_inicio = ?, fecha_final = ?, origen = ? , fk_finca = ?, fk_factura = ? WHERE id = ?',
    [fecha_inicio, fecha_final, origen, fk_finca, fk_factura, id],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

// Funcion de actualizar el objeto persona
const actualizarPersona = (id, nombres, apellidos, origen, callback) => {
  db.query(
    'UPDATE personas SET nombres = ?, apellidos = ?, origen = ? WHERE id = ?',
    [nombres, apellidos, origen, id],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

// Funcion de actualizar el objeto dron
const actualizarDron = (id, nombre, origen, callback) => {
  db.query(
    'UPDATE dron SET nombre = ?, origen = ? WHERE id = ?',
    [nombre, origen, id],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};


// Funcion de actualizar el objeto factura
const actualizarFactura = (id, corte_facturacion, precio, total_factura, codigo_factura, origen, callback) => {
  console.log("📋 Valores recibidos:", { id, corte_facturacion, precio, total_factura, origen });
  db.query(
    'UPDATE factura SET corte_facturacion = ?, precio = ?, total_factura = ?, codigo_factura = ?, origen = ? WHERE id = ?',
    [corte_facturacion, precio, total_factura, codigo_factura, origen, id],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};

// Funcion de actualizar el objeto avance
const actualizarAvance = (id, mes, fk_trabajo, origen, callback) => {
  db.query(
    'UPDATE avance SET mes = ?, fk_trabajo = ?, origen = ? WHERE id = ?',
    [mes, fk_trabajo, origen, id],
    (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    }
  );
};



/* Se crea la funcion "eliminarProgramcion" con el fin de eliminar una programacion completa,
que incluye finca, trabajos, avances, facturas,dron y persona,
asegurando que se eliminen todas las relaciones y datos asociados. */
const eliminarProgramacion = (id, callback) => {
  const obtenerIDs = `SELECT fk_dron, fk_persona FROM finca WHERE id = ? AND origen = 'formulario2'`;

  db.query(obtenerIDs, [id], (err, results) => {
    if (err) return callback(err);

    if (results.length === 0) {
      return callback(new Error("No se encontró la finca con el ID proporcionado o el origen no coincide."));
    }

    const { fk_dron, fk_persona } = results[0];

    // 1. Eliminar avances
    const eliminarAvances = `
      DELETE FROM avance 
      WHERE fk_trabajo IN (
        SELECT id FROM trabajo WHERE fk_finca = ? AND origen = 'formulario2'
      )
    `;
    db.query(eliminarAvances, [id], (err) => {
      if (err) return callback(err);

      // 2. Eliminar trabajos
      const eliminarTrabajos = `DELETE FROM trabajo WHERE fk_finca = ? AND origen = 'formulario2'`;
      db.query(eliminarTrabajos, [id], (err) => {
        if (err) return callback(err);

        // 3. Eliminar facturas (ya sin relaciones)
        const eliminarFacturas = `
          DELETE FROM factura 
          WHERE id IN (
            SELECT fk_factura FROM trabajo 
            WHERE fk_finca = ? AND origen = 'formulario2'
          )
        `;
        // Nota: Esta subconsulta ahora está vacía porque los trabajos ya se eliminaron, así que este delete no tendrá efecto pero tampoco fallará.
        db.query(eliminarFacturas, [id], (err) => {
          if (err) return callback(err);

          // 4. Eliminar finca
          const eliminarFinca = `DELETE FROM finca WHERE id = ? AND origen = 'formulario2'`;
          db.query(eliminarFinca, [id], (err) => {
            if (err) return callback(err);

            // 5. Eliminar dron
            if (fk_dron) {
              const eliminarDron = `DELETE FROM dron WHERE id = ? AND origen = 'formulario2'`;
              db.query(eliminarDron, [fk_dron], (err) => {
                if (err) return callback(err);
              });
            }

            // 6. Eliminar persona
            if (fk_persona) {
              const eliminarPersona = `DELETE FROM personas WHERE id = ? AND origen = 'formulario2'`;
              db.query(eliminarPersona, [fk_persona], (err) => {
                if (err) return callback(err);
              });
            }

            // ✅ Todo eliminado correctamente
            callback(null, { message: "Finca y relaciones eliminadas correctamente." });
          });
        });
      });
    });
  });
};




module.exports = {
  insertarFinca,
  insertarTrabajo,
  insertarPersona,
  insertarDron,
  insertarFactura,
  insertarAvance,
  obtenerProgramaciones,
  actualizarFinca,
  actualizarTrabajo,
  actualizarPersona,
  actualizarDron,
  actualizarFactura,
  actualizarAvance,
  eliminarProgramacion
};
