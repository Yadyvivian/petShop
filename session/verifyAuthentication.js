//erifica si el usuario está autenticado antes de permitir que se realice una determinada acción

const authenticated = (req, res) => {
    //req.isAuthenticated(): verifica si el usuario está autenticado
    if (!req.isAuthenticated()) {
        res.status(403).json({ 
            message: 'No tienen permisos para hacer esta acción',
        });
        //Se devuelve false para indicar que la acción no está permitida
        return false;
    }
    
    return true;
}

export default authenticated;