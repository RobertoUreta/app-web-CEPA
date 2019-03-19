import request from '../config'

export let updateTratamientoPsiquiatrico=  async (data,idPaciente) => {
  try{
      let res = await request.put('/update_tratamientoPsiquiatrico',{data,idPaciente})
      console.log("resTratamientoPsiquiatrico", res);
      return res;
  }catch(error){
    console.log(error);
  } 
}

export let obtenerTratamientoPsiquiatrico= async (id) => {
  try{
      let res = await request.get('/obtener_tratamientoPsiquiatrico', {params: {idPaciente: id}})
      return res;
  } catch (error) {
      console.log(error)
  }
}