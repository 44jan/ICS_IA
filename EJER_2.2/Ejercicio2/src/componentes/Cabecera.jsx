import { RelojEstatico } from './RelojEstatico';

export function Cabecera() {
  var nombreModulo = 'Desarrollo Web en Entorno Cliente';
  return (
    <header>
      <h1>{nombreModulo}</h1>
      <RelojEstatico />
    </header>
  );
}