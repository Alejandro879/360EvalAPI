const employeService = require('@services/Empleado.service');
const { validationResult } = require('express-validator');

class EmployeController {
  async listaremployes(req, res) {
    try {
      const employes = await employeService.listaremployes();
      res.json({
        message: 'Lista de empleados obtenida exitosamente',
        status: 'success',
        code: 200,
        data: employes
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener la lista de empleados',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }

  async obteneremployePorId(req, res) {
    try {
      const { id } = req.params;
      const empleado = await employeService.obteneremployePorId(id);
      if (!empleado) {
        return res.status(404).json({
          message: 'Empleado no encontrado',
          status: 'failed',
          code: 404,
          data: null
        });
      }
      res.json({
        message: 'Empleado obtenido exitosamente',
        status: 'success',
        code: 200,
        data: empleado
      });
    } catch (error) {
      res.status(500).json({
        message: error.message ?? 'Error al obtener el empleado',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }

  async crearemploye(req, res) {
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
      const empleado = await employeService.crearemploye(req.body);
      res.status(201).json({
        message: 'Empleado creado exitosamente',
        status: 'success',
        code: 201,
        data: empleado
      });
    } catch (error) {
      res.status(500).json({
        message: error.message ?? 'Error al crear el empleado',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }

  async actualizaremploye(req, res) {
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

      const employeActualizado = await employeService.actualizaremploye(id, req.body);
      if (!employeActualizado) {
        return res.status(404).json({
          message: 'Empleado no encontrado',
          status: 'failed',
          code: 404,
          data: null
        });
      }
      res.json({
        message: 'Empleado actualizado exitosamente',
        status: 'success',
        code: 200,
        data: employeActualizado
      });
    } catch (error) {
      res.status(500).json({
        message: error.message ?? 'Error al actualizar el empleado',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }

  async eliminaremploye(req, res) {
    try {
      const { id } = req.params;
      const employeEliminado = await employeService.eliminaremploye(id);
      if (!employeEliminado) {
        return res.status(404).json({
          message: 'Empleado no encontrado',
          status: 'failed',
          code: 404,
          data: null
        });
      }
      res.status(200).json({
        message: 'Empleado eliminado exitosamente',
        status: 'success',
        code: 200,
        data: employeEliminado
      });
    } catch (error) {
      res.status(500).json({
        message: error.message ?? 'Error al eliminar el empleado',
        status: 'error',
        code: 500,
        data: null
      });
    }
  }
}

module.exports = new EmployeController();
