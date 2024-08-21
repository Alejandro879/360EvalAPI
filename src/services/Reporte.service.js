const Respuesta = require('@models/Respuesta.model');
const {
    aggregatePromedioPorCompetencias,
    aggregatePromedioPorCompetenciasYTiposEvaluadores,
    aggregatePromedioPorPreguntas,
    aggregateTopCompetencias,
    aggregatePromedioPorDepartamento,
    aggregatePromedioPorPreguntaYDepartamento,
    aggregateTopDepartamentosCalificacion
} = require('@utils/Aggregate/Reportes/index.aggregate');

class ReporteService {
    // Listar todos los reportes
    async reporteEmpleado(empleadoId) {
        try {
            const promedioPorCompetencias = await Respuesta.aggregate(aggregatePromedioPorCompetencias(empleadoId));
            const promedioPorCompetenciasYTiposEvaluadores = await Respuesta.aggregate(aggregatePromedioPorCompetenciasYTiposEvaluadores(empleadoId));
            const promedioPorPreguntas = await Respuesta.aggregate(aggregatePromedioPorPreguntas(empleadoId));
            const top2CompetenciasMayor = await Respuesta.aggregate(aggregateTopCompetencias(empleadoId, 'desc', 2));
            const top2CompetenciasMenor = await Respuesta.aggregate(aggregateTopCompetencias(empleadoId, 'asc', 2));

            return {
                promedioPorCompetencias,
                promedioPorCompetenciasYTiposEvaluadores,
                promedioPorPreguntas,
                top2CompetenciasMayor,
                top2CompetenciasMenor
            };
        } catch (error) {
            throw new Error('Error al obtener reportes por empleados: ' + error.message);
        }
    }

    async reporteDepartamento(departamento) {
        try { 
            const promedioPorDepartamento = await Respuesta.aggregate(aggregatePromedioPorDepartamento(departamento)); 
            const promedioPorPreguntaYDepartamento = await Respuesta.aggregate(aggregatePromedioPorPreguntaYDepartamento(departamento));
            const topDepartamentosCalificacionMayor = await Respuesta.aggregate(aggregateTopDepartamentosCalificacion(departamento, -1));
            const topDepartamentosCalificacionMenor = await Respuesta.aggregate(aggregateTopDepartamentosCalificacion(departamento, 1));

            return {
                promedioPorDepartamento,
                promedioPorPreguntaYDepartamento,
                topDepartamentosCalificacionMayor,
                topDepartamentosCalificacionMenor
            };
        } catch (error) {
            throw new Error('Error al obtener reportes por departamento: ' + error.message);
        }
    }
}

module.exports = new ReporteService();
