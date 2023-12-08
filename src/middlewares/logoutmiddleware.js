// logoutMiddleware.js

const logoutMiddleware = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/logout') {
        // Elimina la sesión del usuario
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                res.sendStatus(500);
            } else {
                // Redirige al usuario a la página de inicio de sesión
                res.redirect('/login');
            }
        });
    } else {
        // Pasa la solicitud al siguiente middleware en la cadena
        next();
    }
};

export default logoutMiddleware;
