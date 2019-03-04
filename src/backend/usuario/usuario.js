
import axios from 'axios';


export let obtenerSupervisores= ()=>{
    let supervisores = [];
    axios.get('http://localhost:3001/usuario')
    .then(res=>{
        let data = res.data;
        let arr = data.usuarios;
        arr.forEach(element => {
            supervisores.push(element.nombre +' '+element.apellido_paterno)
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
    let roles = []
    axios.get('http://localhost:3001/rol_usuario')
    .then(res=>{
        let data = res.data;
        let arr = data.roles;
        arr.forEach(element => {
            roles.push(element.nombre_rol)
        });
        console.log(roles);
    })
    .catch(err=>{
        roles.push("default");
        console.log(err);
    });
    return roles;
}

