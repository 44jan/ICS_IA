// RETO 2 · Componente TarjetaCandidato
// Ahora muestra datos fijos y el botón no hace nada. Hay que hacerlo configurable mediante props.

import type { Estado } from "../tipos";
import type { Candidato } from "../tipos";


type Props = {
  candidato: Candidato
  estado: Estado
  textoBoton?: string
  alVotar: (id: number) => void

}

export function TarjetaCandidato({candidato, estado, textoBoton = "Votar", alVotar}: Props) {
  return (
    <article className="tarjeta">
      <h3>
        {candidato.nombre} <span className="numero">Nº {candidato.numeroLista}</span>
      </h3>
      <p>
        Votos: <strong>{candidato.votos}</strong>
      </p>
      <button onClick={() => alVotar(candidato.id)}>{textoBoton}</button>
      {estado === "lider" &&  <p>👑 Va en cabeza</p>}
      {estado === "ninguno" &&  <p>Todavía sin votos</p>}
      {candidato.lema && <p>Lema: {candidato.lema}</p>}
    </article>
  );
}
