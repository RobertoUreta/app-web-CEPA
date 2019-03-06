
import axios from 'axios';


export let insertarIngreso = (data, id) => {
    axios.post('http://localhost:3001/insertarPaciente', {
        data, id
    }).then(function (response) {
        console.log(data.apellido)
        console.log(response);
    })
        .catch(function (error) {
            console.log(data.nombre)
            console.log(error);
        });
}

export let obtenerIdIngreso = (data, id) => {
    axios.get('http://localhost:3001/obtenerIngreso', {
        data, id
    }).then(res => {
        let data = res.data;

    }).catch(err => {

    });
}

