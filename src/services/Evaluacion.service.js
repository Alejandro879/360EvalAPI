const Evaluacion = require('@models/Evaluacion.model');
const Respuesta = require('@models/Respuesta.model');
const Notificacion = require('@models/Notificacion.model');

const { listarEvaluacionesAgreggate, obtenerEvaluacionPorIdAggregate } = require('@utils/Aggregate/Evaluaciones/index.aggregate');

class EvaluacionService {
  async listarEvaluaciones() {
    return Evaluacion.aggregate(listarEvaluacionesAgreggate);
  }

  async obtenerEvaluacionPorId(evaluacionId) {
    const agregatePorId = obtenerEvaluacionPorIdAggregate(evaluacionId);
    return Evaluacion.aggregate(agregatePorId);
  }

  async crearEvaluacion(data) {
    const nuevaEvaluacion = new Evaluacion(data);
    const creadaEvaluacion = await nuevaEvaluacion.save();

    const notificacion = new Notificacion({
      empleadoId: nuevaEvaluacion.evaluado,
      mensaje: `Tienes una evaluación pendiente desde ${creadaEvaluacion.fechaCreacion.toLocaleDateString()}.`
    }); 
    await notificacion.save()

    return creadaEvaluacion;
  }

  async actualizarEvaluacion(id, data) {
    return Evaluacion.findByIdAndUpdate(id, data, { new: true });
  }

  async enviarEvaluacion(id, respuestas) { 
    try {
      
      const bulkOps = respuestas.map(respuesta => {
        const { preguntaId, evaluacionId, evaluadorId} = respuesta;
        return { 
          updateOne: {
            filter: { preguntaId, evaluacionId, evaluadorId },
            update: { $set: { fechaActualizacion: new Date() }, $setOnInsert: { ...respuesta } },
            upsert: true
          }      
        }
      });

      const result = await Respuesta.bulkWrite(bulkOps);
      return this.obtenerEvaluacionPorId(id);
    } catch (error) {
      throw error; // Propagar otros errores
    }
  }

  async eliminarEvaluacion(id) {
    return Evaluacion.findByIdAndDelete(id);
  }
}

module.exports = new EvaluacionService();
