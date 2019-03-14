import request from '../config'

export let updateEvaPsiquiatrica=  async (data,idPaciente,idUsuario ) => {
  try{
      let res = await request.put('/update_evPsiquiatrica',{data,idPaciente,idUsuario})
      console.log("resEvaluacionPsiquiatrica", res);
      return res;
  }catch(error){
    console.log(error);
  } 
}

export let obtenerEvaPsiquiatrica= async (id) => {
  try{
      let res = await request.get('/obtener_evPsiquiatrica', {params: {idPaciente: id}})
      return res;
  } catch (error) {
      console.log(error)
  }
}