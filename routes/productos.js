module.exports = {
    paginaProductos: (req, res) => {
        let productosStmt = `SELECT * FROM productos`;

        bd.query(productosStmt, (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.render('productos', {
                productos: result
            });
        });
    },
    paginaAgregarProducto: (req, res) => {
        const { nombre, precio, cantidad } = req.body;
        let agregarStmt = 'INSERT INTO productos (nombre_prod, precio_prod, cantidad_stock, fecha_compra) VALUES (?, ?, ?, NOW())';

        bd.query(agregarStmt, [nombre, precio, cantidad], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.redirect('/productos');
        });
    },
    modificarProducto: (req, res) => {
        const { nombre, precio, cantidad } = req.body;
        const idProducto = req.params.id;
        let modificarStmt = 'UPDATE productos SET nombre_prod = ?, precio_prod = ?, cantidad_stock = ? WHERE id_producto = ?';

        bd.query(modificarStmt, [nombre, precio, cantidad, idProducto], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.redirect('/productos');
        });
    }
}
