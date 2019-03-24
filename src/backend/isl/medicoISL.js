import request from '../config'

export let updateMedicoISL=  async (data,idPaciente) => {
  try{
      let res = await request.put('/update_medicoISL',{data,idPaciente})
      console.log("resmedicoISL", res);
      return res;
  }catch(error){
    console.log(error); 
  } 
}

export let obtenerMedicoISL= async (id) => {
  try{
      let res = await request.get('/obtener_medicoISL', {params: {idPaciente: id}})
      return res; 
  } catch (error) {
      console.log(error) 
  }
}