import request from '../config'

export let obtenerListaUsuarios = ()=>{
    let arr;
    request.get('/listaUsuario')
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

export let obtenerUsuarios = async () => {
    try {
        let promise = await request.get('/listaUsuario')
        return promise;
    }catch(err){
        console.log(err)
    }
}

export let obtenerSupervisores= ()=>{
    let supervisores = new Map();
    request.get('/usuario')
    .then(res=>{
        let data = res.data;
        let arr = data.usuarios;
        arr.forEach(element => {
            supervisores.set( element.nombre +' '+element.apellido_paterno,element.id_usuario)
        });
    })
    .catch(err=>{
        supervisores.push("default");
        console.log(err);
    });
    return supervisores;
    
}
export let obtenerRoles= ()=>{
    let roles = new Map();
    request.get('/rol_usuario')
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

export let obtenerRolId =async (id) => {
    try{
        let promise = await request.get('/rol_usuarioId',{params:{id:id}})
        return promise
    }catch(err){
        console.log(err)
    }
}

export let revisarRestricted = ()=>{
    request.get('/restricted')
      .then(res=>{
            console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
}

export let insertarUsuario = (data)=>{
    request.post('/insertar_usuario', data)
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

export let obtenerDatosUsuario = async (id) => {
    try {
        let res = await request.get('/datosUsuario', {params:{
            idUser: id
        }});
        return res;
    } catch (error) {
        console.log(error);
    }   
}


export let obtenerUsuario = async (id) => {
    try {
        let res = await request.get('/obtenerUsuario', {params:{
            idUser: id
        }});
        return res;
    } catch (error) {
        console.log(error);
    }   
}
export let updateUsuario=  async (data,idUsuario ) => {
    try{
        let res = await request.put('/update_usuario',{data,idUsuario})
        console.log("resupdateUusuario", res);
        return res;
    }catch(error){
      console.log(error);
    } 
  }

  export let updatePasswordUsuario=  async (data,idUsuario ) => {
    try{
        let res = await request.put('/update_password',{data,idUsuario})
        console.log("passwoooord", res);
        return res;
    }catch(error){
      console.log(error);
    } 
  }