function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // User is authenticated
    }
    return res.status(401).json({ error: "Unauthorized access. Please log in." });
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.session.user && req.session.user.role === role) {
            return next(); // User has the correct role
        }
        return res.status(403).json({ error: "Forbidden. You do not have access to this resource." });
    };
}

module.exports = { isAuthenticated, authorizeRole };