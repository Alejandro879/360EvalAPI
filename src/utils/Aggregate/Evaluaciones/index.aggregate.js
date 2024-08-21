
const mongoose = require('mongoose');

    const listarEvaluacionesAgreggate =   [
        {
            $lookup: {
                from: "preguntas",
                let: {
                    evaluacionId: "$_id",
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: ["$estado", true],
                                    },
                                ],
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: "competencias",
                            localField: "competenciaId",
                            foreignField: "_id",
                            as: "competenciaDetalles",
                        },
                    },
                    {
                        $unwind: "$competenciaDetalles",
                    },
                ],
                as: "preguntas",
            },
        },
        {
            $lookup: {
                from: "respuestas",
                localField: "_id",
                foreignField: "evaluacionId",
                as: "respuestas",
            },
        },
        {
            $lookup: {
                from: "evaluadors",
                localField: "evaluado",
                foreignField: "empleadoId",
                as: "evaluadores",
            },
        },
        {
            $unwind: {
                path: "$evaluadores",
                preserveNullAndEmptyArrays: true, // Preserva evaluadores vacíos como null
            },
        },
        {
            $lookup: {
                from: "empleados",
                localField: "evaluadores.evaluadorId",
                foreignField: "_id",
                as: "evaluadorDetalles",
            },
        },
        {
            $unwind: {
                path: "$evaluadorDetalles",
                preserveNullAndEmptyArrays: true, // Preserva evaluadorDetalles vacíos como null
            },
        },
        {
            $group: {
                _id: "$_id",
                evaluado: {
                    $first: "$evaluado",
                },
                estado: {
                    $first: "$estado",
                },
                fechaFinalizacion: {
                    $first: "$fechaFinalizacion",
                },
                fechaCreacion: {
                    $first: "$fechaCreacion",
                },
                evaluadores: {
                    $push: {
                        $cond: [
                            {
                                $gt: ["$evaluadores", null],
                            },
                            // Verifica si evaluadores no es null
                            {
                                _id: "$evaluadores._id",
                                evaluadorId: "$evaluadores.evaluadorId",
                                tipoEvaluador: "$evaluadores.tipoEvaluador",
                                empleadoId: "$evaluadores.empleadoId",
                                evaluadorDetalles: {
                                    email: "$evaluadorDetalles.email",
                                    nombres:
                                        "$evaluadorDetalles.nombres",
                                    apellidos:
                                        "$evaluadorDetalles.apellidos",
                                    puesto:
                                        "$evaluadorDetalles.puesto",
                                    departamento:
                                        "$evaluadorDetalles.departamento",
                                },
                            },
                            null, // Si no hay evaluadores, agrega null
                        ],
                    },
                },

                preguntas: {
                    $first: "$preguntas",
                },
              	respuestas: {
                    $first: "$respuestas",
                },
            },
        },
        {
            $addFields: {
                evaluadores: {
                    $filter: {
                        input: "$evaluadores",
                        as: "evaluador",
                        cond: {
                            $ne: ["$$evaluador", null],
                        }, // Filtra cualquier null en evaluadores
                    },
                },
            },
        },
    ];



const obtenerEvaluacionPorIdAggregate = (evaluacionId) => {
    listarEvaluacionesAgreggate.push({
        $match: { _id: new mongoose.Types.ObjectId(evaluacionId) } // Reemplaza evaluacionId por el ID específico de la evaluación
    })

    return listarEvaluacionesAgreggate;
}

module.exports = { listarEvaluacionesAgreggate, obtenerEvaluacionPorIdAggregate }