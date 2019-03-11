
import request from '../config'


export let insertarIngreso = async (data, id) => {
    try{
        let res = await request.post('/insertarPaciente',{ data,id})
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
        let data = res.data;

    }).catch(err => {

    });
}

export let updateDatosAdicionales = (data, id) => {
    request.put('/update_datosadicionales', {
        data, id
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}

export let updateDatosSocioDemo = (data, id) => {
    request.put('/update_datossociodemo', {
        data, id
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}

export let updateAdultoContacto = (data, id) => {
    request.put('/update_adultocontacto', {
        data, id
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}

export let updateDatosPersonales = (data,id ) => {
    request.put ('/update_datosPersonales', {
        data,id
    }).then(function (response) {
        console.log(response);
    }).catch(function (error){
        console.log(error)
    })
}

