import request from '../config'

export let updateTamizaje =  async (data,idPaciente,idUsuario ) => {
  try{
      let res = await request.put('/update_tamizaje',{data,idPaciente,idUsuario})
      console.log("resTAMIZAJE", res)
      return res;
  }catch(error){

  } 
}

export let obtenerTamizaje = async (id) => {
  try{
      let res = await request.get('/obtener_tamizaje', {params: {idPaciente: id}})
      return res;
  } catch (error) {
      console.log(error)
  }
}