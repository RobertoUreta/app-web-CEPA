import request from '../config'

export let obtenerSalas = async () => {
    try {
        let promise = await request.get('/obtenerSalas')
        return promise;

    } catch (error) {
        console.log(error)
    }
}

export let obtenerSesiones = async () => {
    try {
        let promise = await request.get('/obtenerSesiones')
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

export let insertarSesion = async (data) => {
    let data2 = data
    let fechaStart = new Date(data.start)
    let fechaEnd = new Date(data.end)
    let fechaSesion = new Date(data.fecha_sesion)

    data.startAux = fechaStart.getHours()+":"+(fechaStart.getMinutes()<10?'0':'') + fechaStart.getMinutes() +":"+ (fechaStart.getSeconds()<10?'0':'') +fechaStart.getSeconds()
    data.endAux = fechaEnd.getHours()+":"+(fechaEnd.getMinutes()<10?'0':'') + fechaEnd.getMinutes()+":"+ (fechaEnd.getMinutes()<10?'0':'')+ fechaEnd.getSeconds()
    data.fecha_sesion = fechaSesion.toISOString().split('T')[0]

    let promise = await request.post('/insertarSesion', data)
    return promise

}