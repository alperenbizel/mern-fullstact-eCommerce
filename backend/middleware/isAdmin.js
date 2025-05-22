

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === true) {

      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Bu işlemi sadece admin kullanıcılar gerçekleştirebilir.",
      });
    }
  };
  
  module.exports = isAdmin;
  