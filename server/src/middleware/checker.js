
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized: No user found' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};


const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }

  next();
};


const isSeller = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  // expected role value for sellers is 'penjual'
  if (req.user.role !== 'penjual') {
    return res.status(403).json({ message: 'Forbidden: Seller access required' });
  }

  next();
};

const isCustomer = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  if (req.user.role !== 'pelanggan') {
    return res.status(403).json({ message: 'Forbidden: Customer access required' });
  }

  next();
};

const ownsResource = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: You do not own this resource' });
  }

  next();
};

module.exports = {
  checkRole,
  isAdmin,
  isSeller,
  isCustomer,
  ownsResource
};
