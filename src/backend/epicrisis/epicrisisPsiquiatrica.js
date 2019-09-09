import request from '../config'

export let updateEpicrisisPsiquiatrica=  async (data,idPaciente) => {
  try{
      let res = await request.put('/update_epicrisisPsiquiatrica',{data,idPaciente})
      console.log("resEpicrisisPsiquiatrica", res);
      return res;
  }catch(error){
    console.log(error); 
  } 
}

export let obtenerEpicrisisPsiquiatrica= async (id) => {
  try{
      let res = await request.get('/obtener_epicrisisPsiquiatrica', {params: {idPaciente: id}})
      return res; 
  } catch (error) {
      console.log(error)
  }
}