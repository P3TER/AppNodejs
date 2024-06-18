const express = require('express')
const mysql = require('mysql')
const path = require('path')
const bodyParser = require('body-parser')
const { paginaInicial } = require('./routes')
const { paginaProductos, modificarProducto, paginaAgregarProducto } = require('./routes/productos')
const { paginaClientes, paginaAgregarCliente, modificarCliente } = require('./routes/clientes')
const { modificarPedido, paginaAgregarPedido, paginaPedidos } = require('./routes/pedidos')

const PORT = process.env.PORT || 3939

const servidorNGV = express()

const bd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tiendabd',
    port: '3306'
})

bd.connect((err) => {
    if (err) {
        throw err;
    }
    console.log(`Conectado a la base de datos: 'tiendabd'`);
})

global.bd = bd

servidorNGV.set('port', PORT)
servidorNGV.set('views', path.join(__dirname, 'views'))
servidorNGV.set('view engine', 'ejs')

servidorNGV.use(bodyParser.urlencoded({ extended: true }))
servidorNGV.use(bodyParser.json())

servidorNGV.use(express.static(path.join(__dirname, 'public')))

servidorNGV.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

// Manejador de errores
servidorNGV.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor');
});

servidorNGV.get('/', paginaInicial);
servidorNGV.get('/productos', paginaProductos);
servidorNGV.post('/productos/agregar', paginaAgregarProducto);
servidorNGV.post('/productos/modificar/:id', modificarProducto);
servidorNGV.get('/clientes', paginaClientes);
servidorNGV.post('/clientes/agregar', paginaAgregarCliente);
servidorNGV.post('/clientes/modificar/:id', modificarCliente);
servidorNGV.get('/pedidos', paginaPedidos);
servidorNGV.post('/pedidos/agregar', paginaAgregarPedido);
servidorNGV.post('/pedidos/modificar/:id', modificarPedido);
