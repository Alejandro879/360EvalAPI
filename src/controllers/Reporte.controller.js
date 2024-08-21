const reporteService = require('@services/Reporte.service');
const { validationResult } = require('express-validator');

class ReporteController {
    async reporteEmpleado(req, res) {
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
            const { id } = req.params;
            const reporte_empleado = await reporteService.reporteEmpleado(id);
            res.json({
                message: 'Reporte por empleado obtenida exitosamente',
                status: 'success',
                code: 200,
                data: reporte_empleado
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener reporte por empleado',
                status: 'error',
                code: 500,
                data: null
            });
        }
    }

    async reporteDepartamento(req, res) {
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
            const { id } = req.params;
            const reporte_empleado = await reporteService.reporteDepartamento(id);
            res.json({
                message: 'Reporte por departamento obtenida exitosamente',
                status: 'success',
                code: 200,
                data: reporte_empleado
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener reporte por departamento',
                status: 'error',
                code: 500,
                data: null
            });
        }
    }
}

module.exports = new ReporteController();
