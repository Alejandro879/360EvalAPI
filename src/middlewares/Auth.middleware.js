const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({
        message: 'Acceso no autorizado',
        status: 'failed',
        code: 401,
        data: null
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.rol)) {
        return res.status(403).json({
          message: 'Permisos insuficientes',
          status: 'failed',
          code: 403,
          data: null
        });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Token inválido' });
    }
  };
};

module.exports = authMiddleware;
