import request from '../config'


export let insertarTamizaje = (data)=>{
  console.log('dataaaaaa:',data);
  request.post('/insertar_tamizaje', data)
      .then(function (response) {
        //console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}