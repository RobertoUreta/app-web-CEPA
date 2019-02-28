let mysql = require('../mysql/mysql')
let database = mysql.default


let obtenerUsuarios = () => {
    let query = "SELECT * FROM permiso"
    
    database.ejecutarQuery(query,(err, data) => {
        if (data == null) {
            console.log("data null");
        }
        if (err) {
            console.log("error :(");
        }
        else {
            console.log("funciona");
            console.log(data);
        }
    })
}

obtenerUsuarios();
database.cerrarConexion();