import request from '../config'

export let updateEpicrisisPsicologica=  async (data,idPaciente) => {
  try{
      let res = await request.put('/update_epicrisisPsicologica',{data,idPaciente})
      console.log("resEpicrisisPsicologica", res);
      return res;
  }catch(error){
    console.log(error); 
  } 
}

export let obtenerEpicrisisPsicologica= async (id) => {
  try{
      let res = await request.get('/obtener_epicrisisPsicologica', {params: {idPaciente: id}})
      return res;
  } catch (error) {
      console.log(error)
  }
}