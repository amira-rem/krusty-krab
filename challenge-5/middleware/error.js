function notFound(req, res) {
  res.status(404).json({ message: "Route not found" });
}

function errorHandler(err, req, res, next) {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "Validation error", details: err.errors });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({ message: "Duplicate key", details: err.keyValue });
  }

  console.error("❌", err);
  res.status(500).json({ message: "Internal server error" });
}

module.exports = { notFound, errorHandler };
