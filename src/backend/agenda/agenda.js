import request from '../config'

export let obtenerSalas = async () => {
    try {
        let promise = await request.get('/obtenerSalas')
        console.log("res en obtenerSalas", promise)
        return promise;

    } catch (error) {
        console.log(error)
    }
}

export let obtenerSesiones = async () => {
    try {
        let promise = await request.get('/obtenerSesiones')
        console.log("obtenerSesiones", promise)
        return promise
    } catch (error) {
        console.log(error)
    }
}

export let obtenerLastIdSesion = async () =>{ 
    await request.get('/max_IdSesion')
    .then(res => {
        let data = res.data
        console.log("obtenerLastId", data, "response", data.response)
        return data.response
    })
}

export let insertarSesion = (data) => {
    let fechaStart = new Date(data.start)
    let fechaEnd = new Date(data.end)
    let fechaSesion = new Date(data.fecha_sesion)

    data.start = fechaStart.toJSON().slice(0, 19).replace('T', ' ')
    data.end = fechaEnd.toJSON().slice(0, 19).replace('T', ' ')
    data.fecha_sesion = fechaSesion.toJSON().slice(0, 19).replace('T', ' ')

    request.post('/insertarSesion', data)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

}