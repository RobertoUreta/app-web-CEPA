import request from './config'
export let obtenerSesion = async (data) => {
    try {
        let res = await request.post('/login', data);
        return res;
    } catch (error) {
        console.log(error);
    }   
}

export let verificarSesion = async () =>{
    try {
        let res = await request.get('/auth');
        return res;
    } catch (error) {
        console.log(error);
    }
}


export let cerrarSesion = async ()=> {
    try {
        let res = await request.get('/logout');
        console.log(res.data);
        return res;
    } catch (error) {
        console.log(error);
    }
}