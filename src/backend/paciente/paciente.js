import request from '../config'

export let obtenerPacientes = async ()=>{
    try {
        let res = await request.get('/listaPacientes');
        return res;
    } catch (error) {
        console.log(error);
    }   
    /*let arr;
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
    return arr;*/
}

export let busquedaPacientes = async (data) =>{
    try {
        let res = await request.get('/busquedaPacientes', { params: { search: data} });
        return res;
    } catch (error) {
        console.log(error);
    }   
}

export let obtenerIdPaciente = async () => {
    try {
        let res = await request.get('/obtener_id_paciente');
        return res;
    } catch (error) {
        console.log(error);
    }   
}