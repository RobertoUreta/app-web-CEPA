import request from '../config'

export let updatepsicologoISL=  async (data,idPaciente) => {
  try{
      let res = await request.put('/update_psicologoISL',{data,idPaciente})
      console.log("respsicologoISL", res);
      return res;
  }catch(error){
    console.log(error); 
  } 
}

export let obtenerpsicologoISL= async (id) => {
  try{
      let res = await request.get('/obtener_psicologoISL', {params: {idPaciente: id}})
      return res; 
  } catch (error) {
      console.log(error) 
  }
}