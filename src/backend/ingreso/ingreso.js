
import axios from 'axios';


export let insertarIngreso = (data, id) => {
    axios.post('http://localhost:3001/insertarPaciente', {
        data, id
    }).then(function (response) {
        console.log(data.apellido)
        console.log(response);
    }).catch(function (error) {
        console.log(data.nombre)
        console.log(error);
    });
}

export let obtenerIdIngreso = (data, id) => {
    axios.get('http://localhost:3001/obtenerIngreso', {
        params: {
            id: id
        }

    }).then(res => {
        let data = res.data;

    }).catch(err => {

    });
}

export let updateDatosAdicionales = (data, id) => {
    axios.put('http://localhost:3001/update_datosadicionales', {
        data, id
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}

export let updateDatosSocioDemo = (data, id) => {
    axios.put('http://localhost:3001/update_datossociodemo', {
        data, id
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}

export let updateAdultoContacto = (data, id) => {
    axios.put('http://localhost:3001/update_adultocontacto', {
        data, id
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}

