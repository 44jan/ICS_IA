/*
  =====================================================================
  GUÍA · COMPONENTE PreguntaFrecuente (apoyo para el ejercicio 5)
  =====================================================================

  Es un componente pequeño para practicar con las React DevTools:
  tiene un estado booleano 'abierta' que puedes alternar a mano desde
  el panel Components (seleccionas el componente y pinchas el valor
  true/false del hook State) y ver cómo cambia la página.

  PATRÓN "INTERRUPTOR" (TOGGLE)
  Un estado booleano que se invierte con cada clic:
      setAbierta(!abierta)
  El operador ! niega el valor: true pasa a false y false pasa a true.

  ESTADO BOOLEANO + RENDERIZADO CONDICIONAL
  El estado decide QUÉ se pinta:
      {abierta && <p>...</p>}
  Si abierta es true se pinta la respuesta; si es false, nada.
  =====================================================================
*/

import { useState } from 'react';

export function PreguntaFrecuente({ pregunta, children }) {
  var [abierta, setAbierta] = useState(false);

  function manejarClic() {
    setAbierta(!abierta);
  }

  return (
    <div>
      <button onClick={manejarClic}>{pregunta}</button>
      {abierta && <p>{children}</p>}
    </div>
  );
}
