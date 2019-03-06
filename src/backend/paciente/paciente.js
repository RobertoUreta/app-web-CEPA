import axios from 'axios';

export let obtenerPacientes = ()=>{
    let arr;
    axios.get('http://localhost:3001/listaPacientes')
    .then(res=>{
        let data = res.data;
        arr = data.pacientes;
        console.log("arr en ",arr);
    })
    .catch(err=>{
        arr.push("default");
        console.log(err);
    });
    console.log(arr);
    return arr;
}