import request from '../config'
import axios from 'axios'
export let insertarArchivo = async (data) => {
    try{
        let res = await /*axios({
            method: 'post',
            url: 'http://localhost:3001/upload',
            data: data,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })*/
            request.post('/upload',data);
        return res;
    }catch ( error){
        console.log(error)
    }
}