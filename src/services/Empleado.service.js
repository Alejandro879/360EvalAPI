const Empleado = require('@models/Empleado.model');
const { populate } = require('../models/Evaluador.model');
class EmployeService {
  // Listar todos los empleados
  async listaremployes() {
    try {
      return await Empleado.aggregate([
        {
          $lookup: {
            from: 'evaluadors',  
            localField: '_id',  
            foreignField: 'empleadoId',  
            as: 'evaluadores',  
          },
        },
      ]);
    } catch (error) {
      throw new Error('Error al listar empleados: ' + error.message);
    }
  }

  // Obtener empleado por ID
  async obteneremployePorId(id) {

    try {
      const empleado = await Empleado.findById(id);
      if (!empleado) {
        throw new Error('Empleado no encontrado');
      }
      return empleado;
    } catch (error) {
      throw new Error('Error al obtener empleado: ' + error.message);
    }
  }

  // Crear un nuevo empleado
  async crearemploye(data) {
    try {
      const empleado = new Empleado(data);
      return await empleado.save();
    } catch (error) {
      throw new Error('Error al crear empleado: ' + error.message);
    }
  }

  // Actualizar un empleado existente
  async actualizaremploye(id, data) {
    try {
      const updatedEmploye = await Empleado.findByIdAndUpdate(id, data, { new: true });
      if (!updatedEmploye) {
        throw new Error('Empleado no encontrado');
      }
      return updatedEmploye;
    } catch (error) {
      throw new Error('Error al actualizar empleado: ' + error.message);
    }
  }

  // Eliminar un empleado
  async eliminaremploye(id) {
    try {
      const deletedEmploye = await Empleado.findByIdAndDelete(id);
      if (!deletedEmploye) {
        throw new Error('Empleado no encontrado');
      }
      return deletedEmploye;
    } catch (error) {
      throw new Error('Error al eliminar empleado: ' + error.message);
    }
  }
}

module.exports = new EmployeService();
