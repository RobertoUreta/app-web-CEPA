const mysql = require("mysql");
class MySQL {
    
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.conexion = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'db_cepa'
        });
        this.conectarDB();
    }
    //Usar solo una instancia de conexion de bd
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.conexion.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    static cerrarConexion(){
        this.instance.conexion.end();
    }
    conectarDB() {
        this.conexion.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('Base de datos online!');
        });
    }
}
exports.default = MySQL;