import request from '../config'


export let obtenerRegistroPsicologico = async (data) => {

    try {
        let promise = await request.get('/obtenerRegistroPsicologico', { params: { id: data } })
        return promise
    }
    catch (err) {
        console.log(err)
    }
}

export let updateRegistroPsicologico = async (data, id) => {
    try {
        let res = await request.put('/updateRegistroPsicologico', { data, id })
        console.log("res", res)
        return res;
    } catch (error) {

    }

}

export let obtenerRegistroPsiquiatrico = async (idSesion,refRegistro) => {

    try {
        let promise = await request.get('/obtenerRegistroPsiquiatrico', { params: { id: idSesion, ref: refRegistro } })
        return promise
    }
    catch (error) {

    }
}
export let updateRegistoPsiquiatrico = async (data, id) => {
    try {
        let res = await request.put('/updateRegistroPsiquiatrico', { data, id })
        return res
    } catch (error) {

    }
}