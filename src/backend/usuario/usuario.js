const mysql = require('../mysql/mysql')
const database = mysql.default


let obtenerUsuarios = () => {
    let query = "SELECT id_usuario,nombre FROM usuario"
    
    database.ejecutarQuery(query,(err, data) => {
        if (err) {
            console.log("error :(");
        }
        else {
            console.log("funciona");
            return data;
        }
    });
}



let insertarUsuario = (obj) => {
    let est = obj.estado;
    let estado = est ? 1 : 0;
    let query = `INSERT INTO usuario(id_usuario,nombre,apellido_paterno,apellido_materno,rut,genero,username,password,telefono_trabajo,telefono_movil,correo,horas_semanales,nombre_contacto_emergencia,telefono_contacto_emergencia,estado,ref_rol,ref_supervisor) VALUES(${obj.id_usuario},'${obj.nombre}','${obj.apellidoPaterno}','${obj.apellidoMaterno}','${obj.rut}','${obj.genero}','${obj.username}','${obj.password}','${obj.telefonoTrabajo}','${obj.telefonoMovil}','${obj.correo}',${obj.horasSemanales},'${obj.nombreContactoEmergencia}','${obj.telefonoContactoEmergencia}','${estado}',${obj.ref_rol},${obj.refSupervisor});`;
    database.ejecutarQuery(query,(err, data) => {
        if (err) {
            console.log("error :(");
        }
        else {
            console.log("realizado");
        }
    });
}
let objeto =  {
    id_usuario: 3,
    nombre: 'Pablos',
    apellidoPaterno: 'ss',
    apellidoMaterno: 'xd',
    rut: '19275731',
    genero: 'Masculino',
    username: 'roberto',
    password: '123456',
    telefonoTrabajo: '12345',
    telefonoMovil: '54321',
    correo: 'roberto@gmail.com',
    horasSemanales: 24,
    nombreContactoEmergencia: 'raimundo',
    telefonoContactoEmergencia: '433',
    estado: true,
    ref_rol: 1,
    refSupervisor: 1 }
//insertarUsuario(objeto);
//obtenerUsuarios();
export default obtenerUsuarios
database.cerrarConexion();

