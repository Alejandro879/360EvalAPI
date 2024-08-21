const mongoose = require('mongoose');

const aggregatePromedioPorCompetencias = (empleadoId) => {
    return [
        { $match: { evaluadoId: new mongoose.Types.ObjectId(empleadoId) } },
        {
            $lookup: {
                from: 'preguntas',
                localField: 'preguntaId',
                foreignField: '_id',
                as: 'pregunta'
            }
        },
        { $unwind: '$pregunta' },
        {
            $lookup: {
                from: 'competencias',
                localField: 'pregunta.competenciaId',
                foreignField: '_id',
                as: 'competencia'
            }
        },
        { $unwind: '$competencia' },
        {
            $group: {
                _id: '$competencia._id',
                nombreCompetencia: { $first: '$competencia.nombre' },
                promedioValor: { $avg: '$valor' }
            }
        },
        { $sort: { promedioValor: -1 } }
    ]
}

const aggregatePromedioPorCompetenciasYTiposEvaluadores = (empleadoId) => {
    return [
        { $match: { evaluadoId: new mongoose.Types.ObjectId(empleadoId) } },
        {
            $lookup: {
                from: 'preguntas',
                localField: 'preguntaId',
                foreignField: '_id',
                as: 'pregunta'
            }
        },
        { $unwind: '$pregunta' },
        {
            $lookup: {
                from: 'competencias',
                localField: 'pregunta.competenciaId',
                foreignField: '_id',
                as: 'competencia'
            }
        },
        { $unwind: '$competencia' },
        {
            $lookup: {
                from: 'evaluadors',
                localField: 'evaluadorId',
                foreignField: 'evaluadorId',
                as: 'evaluador'
            }
        },
        { $unwind: '$evaluador' },
        {
            $group: {
                _id: {
                    competenciaId: '$competencia._id',
                    tipoEvaluador: '$evaluador.tipoEvaluador'
                },
                nombreCompetencia: { $first: '$competencia.nombre' },
                tipoEvaluador: { $first: '$evaluador.tipoEvaluador' },
                promedioValor: { $avg: '$valor' }
            }
        },
        { $sort: { promedioValor: -1 } }
    ]
}

const aggregatePromedioPorPreguntas = (empleadoId) => {
    return [
        { $match: { evaluadoId: new mongoose.Types.ObjectId(empleadoId) } },
        {
            $lookup: {
                from: 'preguntas',
                localField: 'preguntaId',
                foreignField: '_id',
                as: 'pregunta'
            }
        },
        { $unwind: '$pregunta' },
        {
            $group: {
                _id: '$pregunta._id',
                textoPregunta: { $first: '$pregunta.texto' },
                promedioValor: { $avg: '$valor' }
            }
        },
        { $sort: { promedioValor: -1 } }
    ]
}

const aggregateTopCompetencias = (empleadoId, order = 'desc', limit = 2) => {
    return [
        { $match: { evaluadoId: new mongoose.Types.ObjectId(empleadoId) } },
        {
            $lookup: {
                from: 'preguntas',
                localField: 'preguntaId',
                foreignField: '_id',
                as: 'pregunta'
            }
        },
        { $unwind: '$pregunta' },
        {
            $lookup: {
                from: 'competencias',
                localField: 'pregunta.competenciaId',
                foreignField: '_id',
                as: 'competencia'
            }
        },
        { $unwind: '$competencia' },
        {
            $group: {
                _id: '$competencia._id',
                nombreCompetencia: { $first: '$competencia.nombre' },
                promedioValor: { $avg: '$valor' }
            }
        },
        { $sort: { promedioValor: order === 'asc' ? 1 : -1 } },
        { $limit: limit }
    ]
}

const aggregatePromedioPorDepartamento = (departamento) => {
    return [
        {
            $lookup: {
                from: "evaluacions",
                localField: "evaluacionId",
                foreignField: "_id",
                as: "evaluacion",
            },
        },
        {
            $unwind: "$evaluacion",
        },
        {
            $lookup: {
                from: "empleados",
                localField: "evaluacion.evaluado",
                foreignField: "_id",
                as: "evaluado",
            },
        },
        {
            $unwind: "$evaluado",
        },
        {
            $match: {
                "evaluado.departamento": departamento,
            },
        },
        {
            $group: {
                _id: "$evaluado.departamento",
                promedioValor: {
                    $avg: "$valor",
                },
            },
        },
    ]
}
// 2. Promedio de los valores de la respuesta separados por cada una de las preguntas y por departamentos
const aggregatePromedioPorPreguntaYDepartamento = (departamento) => {
    return [
        {
            $lookup: {
                from: "preguntas",
                localField: "preguntaId",
                foreignField: "_id",
                as: "pregunta",
            },
        },
        {
            $unwind: "$pregunta",
        },
        {
            $lookup: {
                from: "evaluacions",
                localField: "evaluacionId",
                foreignField: "_id",
                as: "evaluacion",
            },
        },
        {
            $unwind: "$evaluacion",
        },
        {
            $lookup: {
                from: "empleados",
                localField: "evaluacion.evaluado",
                foreignField: "_id",
                as: "evaluado",
            },
        },
        {
            $unwind: "$evaluado",
        },
        {
            $match: {
                "evaluado.departamento": departamento,
            },
        },
        {
            $group: {
                _id: {
                    departamento: '$evaluado.departamento',
                    preguntaId: '$preguntaId',
                },
                departamento: {
                    $first: "$evaluado.departamento",
                },
                textoPregunta: {
                    $first: "$pregunta.texto",
                },
                promedioValor: {
                    $avg: "$valor",
                },
            },
        },
    ]
}

const aggregateTopDepartamentosCalificacion = (departamento, sort = -1) => {
    return [
        {
            $lookup: {
                from: 'evaluacions',
                localField: 'evaluacionId',
                foreignField: '_id',
                as: 'evaluacion',
            },
        },
        { $unwind: '$evaluacion' },
        {
            $lookup: {
                from: 'empleados',
                localField: 'evaluacion.evaluado',
                foreignField: '_id',
                as: 'evaluado',
            },
        },
        { $unwind: '$evaluado' },
        {
            $match: { 'evaluado.departamento': departamento },
        },
        {
            $group: {
                _id: '$evaluado.departamento',
                promedioValor: { $avg: '$valor' },
            },
        },
        { $sort: { promedioValor: sort } },
        { $limit: 2 },
    ]
}


module.exports = {
    aggregatePromedioPorCompetencias,
    aggregatePromedioPorCompetenciasYTiposEvaluadores,
    aggregatePromedioPorPreguntas,
    aggregateTopCompetencias,
    aggregatePromedioPorDepartamento,
    aggregatePromedioPorPreguntaYDepartamento,
    aggregateTopDepartamentosCalificacion
}