import request from '../config'

export let updatePsiquiatraISL=  async (data,idPaciente) => {
  try{
      let res = await request.put('/update_psiquiatraISL',{data,idPaciente})
      console.log("resPsiquiatraISL", res);
      return res;
  }catch(error){
    console.log(error);
  } 
}

export let obtenerPsiquiatraISL= async (id) => {
  try{
      let res = await request.get('/obtener_psiquiatraISL', {params: {idPaciente: id}})
      return res;
  } catch (error) { 
      console.log(error)
  }
}