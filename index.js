// server/index.js
const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.listen(PORT, '192.168.10.168', () => {
    console.log(`Servidor escuchando en la dirección: http://192.168.10.168:${PORT}/api`);
});

app.use(express.static(path.resolve(__dirname, '../client/build')));

const tareas = [];

app.get('/api', (req, res) => {
  res.json({ tareas });
});

app.post('/api', (req, res) => {
  const tarea = req.body;
  tarea.id = Date.now();
  tarea.completada = false;
  //host:localhost:3001
  tareas.push(tarea);
  console.log(`Tarea agregada: ${JSON.stringify(tarea)}`);
  res.json({ tarea });
});

app.put('/api/:id/completar', (req, res) => {
  const id = parseInt(req.params.id);
  const tarea = tareas.find((t) => t.id === id);
  if (tarea) {
    tarea.completada = !tarea.completada;
    console.log(`Tarea actualizada: ${JSON.stringify(tarea)}`);
    res.json({ tarea });
  } else {
    res.status(404).json({ message: `No se encontró la tarea con ID ${id}` });
  }
});

app.delete('/api/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tareaIndex = tareas.findIndex((t) => t.id === id);
  if (tareaIndex >= 0) {
    const tareaEliminada = tareas.splice(tareaIndex, 1)[0];
    console.log(`Tarea eliminada: ${JSON.stringify(tareaEliminada)}`);
    res.json({ tarea: tareaEliminada });
  } else {
    res.status(404).json({ message: `No se encontró la tarea con ID ${id}` });
  }
});














// // Manejar las peticiones GET en la ruta /api
// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// // Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// });

// app.post('/api', (req, res) => {
//   const tarea = req.body;
//   // aquí puedes almacenar la tarea en una base de datos o en algún otro lugar en el servidor
//   console.log(tarea);
//   res.json({ tarea });
// });
































// https://crm.wolkvox.com/server/API/v2/custom/insert.php

// "Wolkvox-Token : 7b6363672d756e6973616e697461737d2d7b32303233303231343134313333367d"

// {
//   "operation": "ccg-unisanitas",
//   "module": "Interacciones",
//   "fields": {
//       "Nombre": "Por identificacion",
//       "Numero": "'.$ani.'",
//       "Canal": "Fijo",
//       "Programa": "Pregrados",
//       "Programa académico": "Sin gestion"
//   }
// }

// https://wv0038.wolkvox.com/api/v2/campaign.php?api=add_record&type_campaign=predictive&campaign_id=26069&campaign_status=stopped

// [
//   {
//       "customer_name": "'.$nombre.'",
//       "customer_last_name": "",
//       "id_type": "",
//       "customer_id": "'.$chat_id.'",
//       "age": "",
//       "gender": "",
//       "country": "",
//       "state": "",
//       "city": "",
//       "zone": "",
//       "address": "",
//       "opt1": "'.$programa.'",
//       "opt2": "Desea mayor información por medio de la llamada",
//       "opt3": "",
//       "opt4": "",
//       "opt5": "",
//       "opt6": "",
//       "opt7": "",
//       "opt8": "",
//       "opt9": "",
//       "opt10": "",
//       "opt11": "",
//       "opt12": "",
//       "tel1": "'.$telefono.'",
//       "tel2": "",
//       "tel3": "",
//       "tel4": "",
//       "tel5": "",
//       "tel6": "",
//       "tel7": "",
//       "tel8": "",
//       "tel9": "",
//       "tel10": "",
//       "tel_extra": "",
//       "email": "",
//       "recall_date": "",
//       "recall_telephone": ""
//   }
// ]

// preg_replace
// '/^57/', '9', $cust_phone


// {
//   "code": "200",
//   "error": "null",
//   "msg": "1 records were are found",
//   "data": [
//       {
          // "wolkvox_form_name": "2023_WOLKVOX_PREGRADO_FINAL_CORREGIDO",
          // "Programa acadu00e9mico": "Medicina",
          // "Documento": "555",
          // "names": "Cesar PRUEBAS",
          // "Telephone": {
          //     "country": "",
          //     "code": "",
          //     "value": "573173654079"
          // },
//           "Email": "unisanitas@unisanitas.edu.co",
//           "ID": "fGKdrZsOlhTSbRKq",
//           "wolkvox_usuario_creacion": "API@micro",
//           "wolkvox_fecha_creacion": "2023-06-06 12:42:08",
//           "wolkvox_origen": null,
//           "wolkvox_ip_address": "35.225.100.125",
//           "wolkvox_owner": {
//               "user": "agent_12009@ccg-unisanitas",
//               "nombre": "Agente 2 - Maria Bohorquez",
//               "id": "5757221858181120",
//               "email": "agent_12009@ccg-unisanitas"
//           },
//           "Etapa del ciclo de vida ": "Aspirante",
//           "Etapa detallada ": "Sin gestion",
//           "Programa": "Pregrados",
//           "Tipo de Lead": "Pauta",
//           "Url": "https:\/\/developers.facebook.com",
//           "status": "Sin gestion",
//           "wolkvox_fecha_modificacion": "2023-06-06 12:42:10",
//           "wolkvox_usuario_modificacion": "API",
//           "wolkvox_id": "647f6ff1660dff48d803ffe6"
//       }
//   ]
// }