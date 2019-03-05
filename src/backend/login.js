import axios from 'axios';


export let obtenerSesion = (data)=>{
    axios.post('http://localhost:3001/identificacion', data)
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}