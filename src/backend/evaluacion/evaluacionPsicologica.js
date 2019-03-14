import request from '../config'

export let updateEvaPsicologica=  async (data,idPaciente,idUsuario ) => {
  try{
      let res = await request.put('/update_evPsicologica',{data,idPaciente,idUsuario})
      console.log("resEvaluacionPsicologica", res);
      return res;
  }catch(error){
    console.log(error);
  } 
}

export let obtenerEvaPsicologica= async (id) => {
  try{
      let res = await request.get('/obtener_evPsicologica', {params: {idPaciente: id}})
      return res;
  } catch (error) {
      console.log(error)
  }
}