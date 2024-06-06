module.exports = {
    paginaProductos: (req, res) => {
        let productosStmt = `SELECT * FROM productos`

        bd.query(productosStmt, (err, result) => {
            if (err) {
                return res.send(err)
            }
            res.render('views/productos.ejs', {
                productos: result
            })
        })
    }
}