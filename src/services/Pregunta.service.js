const Pregunta = require('@models/Pregunta.model'); 

class PreguntaService {
  // Listar todos los preguntas
  async listarpreguntas() {
    try {
      return await Pregunta.find();
    } catch (error) {
      throw new Error('Error al listar preguntas: ' + error.message);
    }
  }

  // Obtener pregunta por ID
  async obtenerpreguntaPorId(id) {

    try {
      const pregunta = await Pregunta.findById(id);
      if (!pregunta) {
        throw new Error('Pregunta no encontrado');
      }
      return pregunta;
    } catch (error) {
      throw new Error('Error al obtener pregunta: ' + error.message);
    }
  }

  // Crear un nuevo pregunta
  async crearpregunta(data) {
    try {
      const pregunta = new Pregunta(data);
      return await pregunta.save();
    } catch (error) {
      throw new Error('Error al crear pregunta: ' + error.message);
    }
  }

  // Actualizar un pregunta existente
  async actualizarpregunta(id, data) {
    try {
      const updatedPregunta = await Pregunta.findByIdAndUpdate(id, data, { new: true });
      if (!updatedPregunta) {
        throw new Error('Pregunta no encontrado');
      }
      return updatedPregunta;
    } catch (error) {
      throw new Error('Error al actualizar pregunta: ' + error.message);
    }
  }

  // Eliminar un pregunta
  async eliminarpregunta(id) {
    try {
      const deletedPregunta = await Pregunta.findByIdAndDelete(id);
      if (!deletedPregunta) {
        throw new Error('Pregunta no encontrado');
      }
      return deletedPregunta;
    } catch (error) {
      throw new Error('Error al eliminar pregunta: ' + error.message);
    }
  }
}

module.exports = new PreguntaService();
