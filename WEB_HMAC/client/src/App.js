import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {

  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [tipoDoc, setTipoDoc] = useState("");
  const [ID, setID] = useState("");
  const [Nombre, setNombre] = useState("");
  
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const handleFechaNacimientoChange = (event) => {
    setFechaNacimiento(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Fecha de Nacimiento:", fechaNacimiento);
  };

  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      tipoDoc:tipoDoc,
      ID:ID,
      Nombre:Nombre,
      fechaNacimiento:fechaNacimiento
    }).then(()=>{
      alert("Usuario Registrado");
    }).catch((error) => {
      console.error("Error al registrar usuario:", error);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/tiposDocumento")
      .then((response) => {
        setTiposDocumento(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los tipos de documento:", error);
      });
  }, []);


  return (
    <div className="App">
      <div className="datos">
        
      <label>Tipo de documento:
          <select
            value={tipoDoc}
            onChange={(event) => {
              setTipoDoc(event.target.value);
            }}
          >
            <option value="">Selecciona un tipo de documento</option>
            {tiposDocumento.map((tipo) => (
              <option key={tipo.ID_TIPODOC} value={tipo.ID_TIPODOC}>
                {tipo.ALIAS} - {tipo.NOMBRE}
              </option>
            ))}
          </select>
        </label>


        <label>Número de documento: <input
        onChange={(event)=>{
          setID(event.target.value);
        }}
        type="text"/></label>

        <label>Nombre: <input 
        onChange={(event)=>{
          setNombre(event.target.value);
        }}
        type="text"/></label>

        <form onSubmit={handleSubmit}>
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            value={fechaNacimiento}
            onChange={handleFechaNacimientoChange}
            name="FECHA_NAC"
          />
          <button type="submit">Guardar</button>
        </form>

        <button onClick={add}>Registrar</button>

      </div>
    </div>
  );
}

export default App;