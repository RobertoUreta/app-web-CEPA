import request from '../config'

export let insertarArchivo = async (data) => {
    try{
        let res = await request.post('/upload',data)
        return res;
    }catch ( error){
        console.log(error)
    }
}