// RETO 1 · Función obtenerEstado
// Escribe aquí la función `obtenerEstado` (consulta el enunciado).

import type { Estado } from "./tipos";

export function obtenerEstado (votos: number, maximo: number): Estado {
    if (votos === 0) {
        return "ninguno"
    } else if (votos === maximo) {
        return "lider"
    } return "algunos"
}
