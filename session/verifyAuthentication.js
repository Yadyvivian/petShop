const verify = {

    verifyAuthentication: (req) => {
        if (!req.isAuthenticated()) {
            throw new Error('No tienen permisos para hacer esta acción');
        }
    },
    errorMessage: (res, mensaje, error) => {
        console.log(error);
        res.status(500).json({ 
            message: mensaje,
            cause: error.message
        });        
    }
}

export default verify;