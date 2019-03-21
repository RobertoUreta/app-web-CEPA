import request from '../config'


export let obtenerRegistroPsicologico = async (data) => {

    try{
        let promise = await request.get('/obtenerRegistroPsicologico',{params:{id: data}})
        return promise
    }
    catch(err){
        console.log(err)
    }
}

export let updateRegistroPsicologico = async (data,id) =>{
    try{
        let res = await request.put('/updateRegistroPsicologico',{data,id})
        console.log("res", res)
        return res;
    }catch(error){

    }

}