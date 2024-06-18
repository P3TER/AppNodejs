module.exports = {
    paginaPedidos: (req, res) => {
        let pedidosStmt = `SELECT * FROM pedidos`;

        bd.query(pedidosStmt, (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.render('pedidos', {
                pedidos: result
            });
        });
    },
    paginaAgregarPedido: (req, res) => {
        const { nro_pedido, id_cliente, cantidad_producto } = req.body;
        let agregarStmt = 'INSERT INTO pedidos (nro_pedido, fecha_pedido, id_cliente, cantidad_producto) VALUES (?, NOW(), ?, ?)';

        bd.query(agregarStmt, [nro_pedido, id_cliente, cantidad_producto], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.redirect('/pedidos');
        });
    },
    modificarPedido: (req, res) => {
        const { nro_pedido, cantidad_producto } = req.body;
        const idPedido = req.params.id;
        let modificarStmt = 'UPDATE pedidos SET nro_pedido = ?, cantidad_producto = ? WHERE id_pedido = ?';

        bd.query(modificarStmt, [nro_pedido, cantidad_producto, idPedido], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.redirect('/pedidos');
        });
    }
}
