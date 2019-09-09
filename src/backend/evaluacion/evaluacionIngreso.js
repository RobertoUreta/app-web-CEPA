import request from '../config'

export let updateEvaIngreso=  async (data,idPaciente,idUsuario ) => {
  try{
      let res = await request.put('/update_evIngreso',{data,idPaciente,idUsuario})
      console.log("resEvaluacionIngreso", res);
      return res;
  }catch(error){
    console.log(error);
  } 
}

export let obtenerEvaIngreso= async (id) => {
  try{
      let res = await request.get('/obtener_evIngreso', {params: {idPaciente: id}})
      return res;
  } catch (error) {
      console.log(error)
  }
}