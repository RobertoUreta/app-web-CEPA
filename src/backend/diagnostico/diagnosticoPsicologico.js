import request from '../config'

export let updateDiagnosticoPsicologico=  async (data,idPaciente) => {
  try{
      let res = await request.put('/update_diagnosticoPsicologico',{data,idPaciente})
      console.log("resDiagnosticoPsicologico", res);
      return res;
  }catch(error){
    console.log(error);
  } 
}

export let obtenerDiagnosticoPsicologico= async (id) => {
  try{
      let res = await request.get('/obtener_diagnosticoPsicologico', {params: {idPaciente: id}})
      return res;
  } catch (error) {
      console.log(error)
  }
}