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

export let insertarArchivo = async (data) => {
    try{
        let res = await request.post('/upload',{data},{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          })
    }catch ( error){
        console.log(error)
    }
}