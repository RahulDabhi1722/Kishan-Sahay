/**
 * Role-based access control middleware
 * Checks if the authenticated user has the required role(s) to access a route
 */
const ErrorResponse = require('../utils/errorResponse');

const roleCheck = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(
        new ErrorResponse('User not authenticated or role not defined', 401)
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }

    next();
  };
};

module.exports = roleCheck;