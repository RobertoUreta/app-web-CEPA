import request from '../config'

export let updateDiagnosticoPsiquiatrico=  async (data,idPaciente) => {
  try{
      let res = await request.put('/update_diagnosticoPsiquiatrico',{data,idPaciente})
      console.log("resDiagnosticoPsiquiatrico", res);
      return res;
  }catch(error){
    console.log(error); 
  } 
}

export let obtenerDiagnosticoPsiquiatrico= async (id) => {
  try{
      let res = await request.get('/obtener_diagnosticoPsiquiatrico', {params: {idPaciente: id}})
      return res;
  } catch (error) {
      console.log(error)
  }
}