// RETO 5 · Componente FormularioCandidato
// Ahora es un formulario estático que no hace nada. Hay que hacerlo funcional.

export function FormularioCandidato() {
  return (
    <form className="formulario">
      <h2>Nueva candidatura</h2>
      <div className="campo">
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" type="text" />
      </div>
      <div className="campo">
        <label htmlFor="numeroLista">Número de lista (1 a 30)</label>
        <input id="numeroLista" type="number" min="1" max="30" step="1" />
      </div>
      <div className="campo">
        <label htmlFor="lema">Lema (opcional)</label>
        <input id="lema" type="text" />
      </div>
      <button type="submit">Presentar candidatura</button>
    </form>
  );
}
