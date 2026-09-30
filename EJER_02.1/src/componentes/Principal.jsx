import { Bienvenida } from './Bienvenida';
import { ListaUnidades } from './ListaUnidades';

export function Principal() {
  return (
    <main>
      <Bienvenida />
      <ListaUnidades />
    </main>
  );
}