import request from '../config'

export let updateTratamientoPsicologico=  async (data,idPaciente) => {
  try{
      let res = await request.put('/update_tratamientoPsicologico',{data,idPaciente})
      console.log("resTratamientoPsicologico", res);
      return res;
  }catch(error){
    console.log(error);
  } 
}

export let obtenerTratamientoPsicologico= async (id) => {
  try{
      let res = await request.get('/obtener_tratamientoPsicologico', {params: {idPaciente: id}})
      return res;
  } catch (error) {
      console.log(error)
  }
}