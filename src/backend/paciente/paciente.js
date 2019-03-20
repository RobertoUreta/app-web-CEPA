import request from '../config'

export let obtenerPacientes = async ()=>{
    try {
        let res = await request.get('/listaPacientes');
        return res;
    } catch (error) {
        console.log(error);
    }   
    
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

export let obtenerDatosPaciente = async (id) => {
    try{
        let res = await request.get('/datosPaciente', {params: {idPaciente: id}})
        return res;
    } catch (error) {
        console.log(error)
    }
}

export let obtenerHistorialPsicologico = async (data) => {
    try{
        console.log(data)
        let res = await request.get('/obtenerHistorialPsicologico', {params: {
            id_paciente: data.paciente,
            id_usuario: data.usuario,
        }})
        return res;
    } catch (error) {
        console.log(error)
    }
}

export let obtenerHistorialPsiquiatrico = async (data) => {
    try{
        console.log(data)
        let res = await request.get('/obtenerHistorialPsiquiatrico', {params: {
            id_paciente: data.paciente,
            id_usuario: data.usuario,
        }})
        return res;
    } catch (error) {
        console.log(error)
    }
}