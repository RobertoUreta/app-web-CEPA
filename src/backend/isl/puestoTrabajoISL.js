import request from '../config'

export let updatePuestoTrabajoISL=  async (data,idPaciente) => {
  try{
      let res = await request.put('/update_puestoTrabajoISL',{data,idPaciente})
      console.log("resPuestoTrabajoISL", res);
      return res;
  }catch(error){
    console.log(error);
  } 
}

export let obtenerPuestoTrabajoISL= async (id) => {
  try{
      let res = await request.get('/obtener_puestoTrabajoISL', {params: {idPaciente: id}})
      return res;
  } catch (error) { 
      console.log(error)
  }
}