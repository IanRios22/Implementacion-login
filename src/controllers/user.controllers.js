import UserServices from "../services/user.services.js";
const userService = new UserServices();

export default class UserController {
    async register(req, res, next) {
        console.log(req.body);
        try {
            const user = await userService.register(req.body);
            //!user ? false : user;
            if (user) res.redirect('/views')
            else res.redirect('/views/register-error');
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await userService.login(email, password);

            if (user) {
                // Almacena toda la información del usuario en la sesión
                req.session.user = user;

                res.redirect('/views/profile');
            } else {
                res.redirect('/views/error-login');
            }
        } catch (error) {
            next(error);
        }
    }
    async logout(req, res) {
        try {
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
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            res.sendStatus(500);
        }
    }

}