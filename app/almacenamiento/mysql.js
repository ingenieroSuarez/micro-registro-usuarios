
const mysql = require('mysql');

const dbconf = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

let connection;
function handleCon() {
    connection = mysql.createConnection(dbconf);
    connection.connect((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}
handleCon();


function buscarUsuario(usuarioId) {
    return new Promise( (resolve, reject) => {
        let respuesta=[]
        connection.query(`SELECT * FROM usuarios where id=${usuarioId}`, (err, data) => {
            if (err) return reject(err);
            if(data.length>0){
                respuesta=data.map(({id, nombre, password, correo})=>({id, nombre, password, correo }))
            }
            resolve(respuesta);
        })
    })
}

function crearUsuario(usuario) {
    return new Promise( (resolve, reject) => {
        connection.query(`INSERT INTO usuarios SET ?`, usuario, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    buscarUsuario,
    crearUsuario,
};

