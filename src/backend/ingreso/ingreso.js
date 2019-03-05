
import axios from 'axios';


export let insertarIngreso = (data) => {
    axios.post('http://localhost:3001/ingreso', {
        data
    }).then(function (response) {
        console.log(data.apellido)
        console.log(response);
    })
        .catch(function (error) {
            console.log(data.nombre)
            console.log(error);
        });
}

