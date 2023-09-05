const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors")

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "Mncdm2023.",
    database: "hmac"
});

app.post("/create", (req,res)=>{
    const tipoDoc = req.body.tipoDoc;
    const ID = req.body.ID;
    const Nombre = req.body.Nombre;
    const fechaNacimiento = req.body.fechaNacimiento;

    db.query('INSERT INTO paciente (ID, TIPO_DOCUMENTO_ID_TIPODOC, NOMBRE, FECHA_NAC) VALUES(?,?,?,?)', [ID, tipoDoc, Nombre, fechaNacimiento],
    (err, result)=>{
        if(err){
            console.log(err);
        } else {
            res.send("Usuario Registrado con Exito");
        }
    }
    );
});

app.get("/tiposDocumento", (req, res) => {
    db.query("SELECT * FROM tipo_documento",
    (err, results) =>{
      if (err) {
        console.log(err);
        res.status(500).send("Error al obtener los tipos de documento.");
      } else {
        res.json(results);
      }
    });
  });

app.listen(3001, ()=>{
    console.log("Corriendo en el puerto 3001")
})