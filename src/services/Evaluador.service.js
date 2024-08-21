const Evaluador = require('@models/Evaluador.model');

class EvaluadorService {
    async getAll() {
        return Evaluador.find().populate('empleadoId evaluadorId').exec();
    }

    async getById(id) {
        return Evaluador.findById(id).populate('empleadoId evaluadorId').exec();
    }

    async getByEmpleadoId(empleadoId) {
        return Evaluador.find({ empleadoId }).exec();
    }

    async create(data) {
        try {
            const nuevoEvaluador = new Evaluador(data);
            return await nuevoEvaluador.save();
        } catch (error) {
            if (error.code === 11000) { // Error de duplicado en MongoDB
                throw new Error('El evaluador con estos datos ya existe.');
            }
            throw error; // Propagar otros errores
        }
    }

    async createByEmpleadoId(empleadoId, data) {
        try {
            // Usar replaceOne para reemplazar el documento si existe o insertarlo si no existe
            const result = await Evaluador.replaceOne(
                { evaluadorId: data.evaluadorId, empleadoId },
                { ...data, empleadoId },
                { upsert: true }
            );
            return result;
        } catch (error) {
            throw error; // Propagar otros errores
        }
    }

    async createMultipleByEmpleadoId(empleadoId, evaluadores) {
        try {
            const bulkOps = evaluadores.map(evaluador => ({
                replaceOne: {
                    filter: { evaluadorId: evaluador.evaluadorId, empleadoId },
                    replacement: { ...evaluador, empleadoId },
                    upsert: true
                }
            }));

            const result = await Evaluador.bulkWrite(bulkOps);
            return result;
        } catch (error) {
            throw error; // Propagar otros errores
        }
    }

    async update(id, data) {
        return Evaluador.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async deleteByEmpleadoId(empleadoId) {
        return Evaluador.findOneAndDelete({ empleadoId }).exec();
    }

    async deleteMultipleByEmpleadoId(empleadoId) {
        return Evaluador.deleteMany({ empleadoId }).exec();
    }
}

module.exports = new EvaluadorService();
