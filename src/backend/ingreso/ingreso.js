
import request from '../config'


export let insertarIngreso = async (data, id,loggedUser) => {
    try{
        let res = await request.post('/insertarPaciente',{ data,id,loggedUser})
    }catch ( error){
        console.log(error)
    }
    
}

export let obtenerIdIngreso = (data, id) => {
    request.get('/obtenerIngreso', {
        params: {
            id: id
        }

    }).then(res => {
        //let data = res.data;

    }).catch(err => {

    });
}

export let updateDatosAdicionales = async (data, id) => {
    try{
        let res = await request.put('/update_datosadicionales', {data, id})
        return res;
    }catch(error){
      console.log(error); 
    } 
}

export let updateDatosSocioDemo = async (data, id) => {
    try{
        let res = await request.put('/update_datossociodemo', {data, id})
        return res;
    }catch(error){
      console.log(error); 
    }
}

export let updateAdultoContacto = async (data, id) => {
    try{
        let res = await request.put('/update_adultocontacto', {data, id})
        return res;
    }catch(error){
      console.log(error); 
    }
}

export let updateDatosPersonales =  async (data,id ) => {
    try{
        let res = await request.put('/update_datosPersonales',{data,id})
        console.log("res", res)
        return res; 
    }catch(error){

    }
    
}

export let obtenerAdultoContacto= async (id) => {
    try{
        let res = await request.get('/obtener_adultoContacto', {params: {idPaciente: id}})
        return res;
    } catch (error) {
        console.log(error)
    }
  }

  
export let obtenerDatosSocio= async (id) => {
    try{
        let res = await request.get('/obtener_datosSocio', {params: {idPaciente: id}})
        return res;
    } catch (error) {
        console.log(error)
    }
  }

  
export let obtenerDatosAdicionales= async (id) => {
    try{
        let res = await request.get('/obtener_datosAdicionales', {params: {idPaciente: id}})
        return res;
    } catch (error) {
        console.log(error)
    }
  }