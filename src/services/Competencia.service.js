const Competencia = require('../models/Competencia.model'); 

class CompetenciaService {
  // Listar todos los competencias
  async listarcompetencias() {
    try {
      return await Competencia.find();
    } catch (error) {
      throw new Error('Error al listar competencias: ' + error.message);
    }
  }

  // Obtener competencia por ID
  async obtenercompetenciaPorId(id) {

    try {
      const competencia = await Competencia.findById(id);
      if (!competencia) {
        throw new Error('Competencia no encontrado');
      }
      return competencia;
    } catch (error) {
      throw new Error('Error al obtener competencia: ' + error.message);
    }
  }

  // Crear un nuevo competencia
  async crearcompetencia(data) {
    try {
      const competencia = new Competencia(data);
      return await competencia.save();
    } catch (error) {
      throw new Error('Error al crear competencia: ' + error.message);
    }
  }

  // Actualizar un competencia existente
  async actualizarcompetencia(id, data) {
    try {
      const updatedCompetencia = await Competencia.findByIdAndUpdate(id, data, { new: true });
      if (!updatedCompetencia) {
        throw new Error('Competencia no encontrado');
      }
      return updatedCompetencia;
    } catch (error) {
      throw new Error('Error al actualizar competencia: ' + error.message);
    }
  }

  // Eliminar un competencia
  async eliminarcompetencia(id) {
    try {
      const deletedCompetencia = await Competencia.findByIdAndDelete(id);
      if (!deletedCompetencia) {
        throw new Error('Competencia no encontrado');
      }
      return deletedCompetencia;
    } catch (error) {
      throw new Error('Error al eliminar competencia: ' + error.message);
    }
  }
}

module.exports = new CompetenciaService();
