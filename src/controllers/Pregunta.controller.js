const preguntaService = require('@services/Pregunta.service');
const { validationResult } = require('express-validator');

class PreguntaController {
    async listarpreguntas(req, res) {
        try {
            const preguntas = await preguntaService.listarpreguntas();
            res.json({
                message: 'Lista de preguntas obtenida exitosamente',
                status: 'success',
                code: 200,
                data: preguntas
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener la lista de preguntas',
                status: 'error',
                code: 500,
                data: null
            });
        }
    }

    async obtenerpreguntaPorId(req, res) {
        try {
            const { id } = req.params;
            const pregunta = await preguntaService.obtenerpreguntaPorId(id);
            if (!pregunta) {
                return res.status(404).json({
                    message: 'Pregunta no encontrado',
                    status: 'failed',
                    code: 404,
                    data: null
                });
            }
            res.json({
                message: 'Pregunta obtenido exitosamente',
                status: 'success',
                code: 200,
                data: pregunta
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ?? 'Error al obtener el pregunta',
                status: 'error',
                code: 500,
                data: null
            });
        }
    }

    async crearpregunta(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Error en los datos proporcionados',
                    status: 'failed',
                    code: 400,
                    data: errors.array()
                });
            }
            const pregunta = await preguntaService.crearpregunta(req.body);
            res.status(201).json({
                message: 'Pregunta creado exitosamente',
                status: 'success',
                code: 201,
                data: pregunta
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ?? 'Error al crear el pregunta',
                status: 'error',
                code: 500,
                data: null
            });
        }
    }

    async actualizarpregunta(req, res) {
        try {
            const { id } = req.params;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Error en los datos proporcionados',
                    status: 'failed',
                    code: 400,
                    data: errors.array()
                });
            }

            const preguntaActualizado = await preguntaService.actualizarpregunta(id, req.body);
            if (!preguntaActualizado) {
                return res.status(404).json({
                    message: 'Pregunta no encontrado',
                    status: 'failed',
                    code: 404,
                    data: null
                });
            }
            res.json({
                message: 'Pregunta actualizado exitosamente',
                status: 'success',
                code: 200,
                data: preguntaActualizado
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ?? 'Error al actualizar el pregunta',
                status: 'error',
                code: 500,
                data: null
            });
        }
    }

    async eliminarpregunta(req, res) {
        try {
            const { id } = req.params;
            const preguntaEliminado = await preguntaService.eliminarpregunta(id);
            if (!preguntaEliminado) {
                return res.status(404).json({
                    message: 'Pregunta no encontrado',
                    status: 'failed',
                    code: 404,
                    data: null
                });
            }
            res.status(200).json({
                message: 'Pregunta eliminado exitosamente',
                status: 'success',
                code: 200,
                data: preguntaEliminado
            });
        } catch (error) {
            res.status(500).json({
                message: error.message ?? 'Error al eliminar el pregunta',
                status: 'error',
                code: 500,
                data: null
            });
        }
    }
}

module.exports = new PreguntaController();
