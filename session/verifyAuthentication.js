const authenticated = (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(403).json({ 
            message: 'No tienen permisos para hacer esta acción',
        });
        return false;
    }
    return true;
}

export default authenticated;