module.exports = {
    paginaClientes: (req, res) => {
        let clientesStmt = `SELECT * FROM clientes`;

        bd.query(clientesStmt, (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.render('clientes', {
                clientes: result
            });
        });
    },
    paginaAgregarCliente: (req, res) => {
        const { identificacion, nombres, apellidos, telefono, correo } = req.body;
        let agregarStmt = 'INSERT INTO clientes (identificacion, nombres, apellidos, telefono, correo) VALUES (?, ?, ?, ?, ?)';

        bd.query(agregarStmt, [identificacion, nombres, apellidos, telefono, correo], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.redirect('/clientes');
        });
    },
    modificarCliente: (req, res) => {
        const { identificacion, nombres, apellidos, telefono, correo } = req.body;
        const idCliente = req.params.id;
        let modificarStmt = 'UPDATE clientes SET identificacion = ?, nombres = ?, apellidos = ?, telefono = ?, correo = ? WHERE id_cliente = ?';

        bd.query(modificarStmt, [identificacion, nombres, apellidos, telefono, correo, idCliente], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.redirect('/clientes');
        });
    }
}
