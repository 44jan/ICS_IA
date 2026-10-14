export var RelojEstatico = () => {
  var hora = new Date().toLocaleTimeString('es-ES');
  return <p>{hora}</p>;
};