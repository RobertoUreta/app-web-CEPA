
import axios from 'axios';

export let obtenerListaUsuarios = ()=>{
    let arr;
    axios.get('http://localhost:3001/listaUsuario')
    .then(res=>{
        let data = res.data;
        arr = data.usuarios;
        console.log("arr en ",arr);
    })
    .catch(err=>{
        arr.push("default");
        console.log(err);
    });
    console.log(arr);
    return arr;
}

export let obtenerSupervisores= ()=>{
    let supervisores = new Map();
    axios.get('http://localhost:3001/usuario')
    .then(res=>{
        let data = res.data;
        let arr = data.usuarios;
        arr.forEach(element => {
            supervisores.set( element.nombre +' '+element.apellido_paterno,element.id_usuario)
        });
        console.log(supervisores);
    })
    .catch(err=>{
        supervisores.push("default");
        console.log(err);
    });
    return supervisores;
}
export let obtenerRoles= ()=>{
    let roles = new Map();
    axios.get('http://localhost:3001/rol_usuario')
    .then(res=>{
        let data = res.data;
        let arr = data.roles;
        arr.forEach(element => {
            roles.set( element.nombre_rol,element.id_rol_usuario)
        });
        console.log(roles);
    })
    .catch(err=>{
        roles.push("default");
        console.log(err);
    });
    return roles;
}

export let insertarUsuario = (data)=>{
    axios.post('http://localhost:3001/insertar_usuario', data)
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
