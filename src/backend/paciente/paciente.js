import request from '../config'

export let obtenerPacientes = ()=>{
    let arr;
    request.get('/listaPacientes')
    .then(res=>{
        let data = res.data;
        arr = data.pacientes;
        console.log("arr en ",arr);
    })
    .catch(err=>{
        arr.push("default");
        console.log(err);
    });
    console.log(arr);
    return arr;
}