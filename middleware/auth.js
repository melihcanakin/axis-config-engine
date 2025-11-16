// Admin authentication middleware - for write operations (POST)
const authAdmin = (req, res, next) => {
  const token = req.headers['x-auth-token'];

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'No authentication token provided',
    });
  }

  if (token !== process.env.ADMIN_AUTH_TOKEN) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized: Invalid admin token',
    });
  }

  next();
};

// Service authentication middleware - for read operations (GET)
// Admin token also works for service operations
const authService = (req, res, next) => {
  const token = req.headers['x-auth-token'];

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'No authentication token provided',
    });
  }

  if (token !== process.env.SERVICE_AUTH_TOKEN && token !== process.env.ADMIN_AUTH_TOKEN) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized: Invalid service token',
    });
  }

  next();
};

module.exports = { authAdmin, authService };
