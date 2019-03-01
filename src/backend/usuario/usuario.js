let mysql = require('../mysql/mysql')
let database = mysql.default


let obtenerUsuarios = () => {
    let query = "SELECT id_usuario,nombre FROM usuario"
    
    database.ejecutarQuery(query,(err, data) => {
        if (err) {
            console.log("error :(");
        }
        else {
            console.log("funciona");
            console.log(data);
        }
    })
}

export {obtenerUsuarios}


obtenerUsuarios();
database.cerrarConexion();