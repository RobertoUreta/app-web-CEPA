import request from '../config'

export let obtenerSalas = async () => {
    try {
        let promise = await request.get('/obtenerSalas')
        return promise;

    } catch (error) {
        console.log(error)
    }
}

export let obtenerSesiones = async (idUser) => {
    try {
        let promise = await request.get('/obtenerSesiones', {params: {id: idUser}})
        return promise
    } catch (error) {
        console.log(error)
    }
}

export let obtenerLastIdSesion = async () => {
    try {
        let promise = await request.get('/max_IdSesion')
        return promise
    } catch (err) {
        console.log(err)
    }
}

export let colorUsuario = async () => {
    try{
        let promise = await request.get('/colorUsuario')
        return promise
    }catch (err) {
        console.log(err)
    } 

}

export let obtenerSesionPorId =  async( idUser ) => {
    try{
        let promise = await request.get('/sesionPorId', {params: {id: idUser}})
        return promise
    }catch (err) {
        console.log(err)
    } 
}

export let insertarSesion = async (data) => {
    console.log(data.start)
    let fechaStart = new Date(data.start)
    let fechaEnd = new Date(data.end)
    let fechaSesion = new Date(data.fecha_sesion)

    console.log("fechaStart,fechaEnd", fechaStart , fechaEnd)


    data.startAux = (fechaStart.getHours()<10 ? '0':'')+fechaStart.getHours()+":"+(fechaStart.getMinutes()<10?'0':'') + fechaStart.getMinutes() +":"+ (fechaStart.getSeconds()<10?'0':'') +fechaStart.getSeconds()
    data.endAux = (fechaEnd.getHours()<10 ? '0':'')+fechaEnd.getHours()+":"+(fechaEnd.getMinutes()<10?'0':'') + fechaEnd.getMinutes()+":"+ (fechaEnd.getMinutes()<10?'0':'')+ fechaEnd.getSeconds()
    data.fecha_sesion = fechaSesion.toISOString().split('T')[0]

    console.log("start,end" , data.startAux,data.endAux)
    let promise = await request.post('/insertarSesion', data)
    return promise

}