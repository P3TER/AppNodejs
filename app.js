const express = require('express')
const mysql = require('mysql')
const path = require('path')
const bodyParser = require('body-parser')
const { paginaInicial } = require('./routes')
const { paginaProductos } = require('./routes/productos')

const PORT = process.env.PORT || 3939

const servidorNGV = express()

const bd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tiendabd',
    port: '3308'
})

bd.connect((err) => {
    if (err) {
        throw err;
    }
    console.log(`Conectado a la base de datos: 'tiendabd'`);
})

global.bd = bd

servidorNGV.set('port', PORT)
servidorNGV.set('views', __dirname, '/views')
servidorNGV.set('view engine', 'ejs')

servidorNGV.set(bodyParser.urlencoded({extended: true}))
servidorNGV.set(bodyParser.json())

servidorNGV.use(express.static(path.join(__dirname, 'public')))

servidorNGV.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})

// Manejador de errores
servidorNGV.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor');
});

servidorNGV.get('/', paginaInicial)
servidorNGV.get('/productos', paginaProductos)