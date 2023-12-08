import { Router } from "express";

const router = Router();
router.get('/', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/profile', (req, res) => {
    const user = req.session.user;

    if (user) {
        res.render('profile', { user });
    } else {
        res.redirect('/'); // Otra lógica para manejar la falta de usuario en la sesión
    }
});
router.post('/logout', (req, res) => {
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
});

router.get('/register-error', (req, res) => {
    res.render('register-error')
})

// router.get('/realtimeproducts', (req, res) => {
//     // Puedes emitir eventos en tiempo real aquí
//     // Ejemplo: io.emit('productUpdated', { productId: '123', message: 'Producto actualizado' });
//     res.render('realtimeproducts');
// });

export default router