import React,{ Component } from 'react'
import { Layout } from '../components/Layout'
import { obtenerDatosUsuario } from '../backend/usuario/usuario'


export class Home extends Component { 
    constructor(props){
        super(props);

        this.state ={
            usuario:{}
        }
    }

    componentWillMount() {

        let promesa = obtenerDatosUsuario(this.props.match.params.id);
        promesa.
            then((res) => {
                console.log("resdatapromesa", res.data)
                this.setState({ usuario: res.data.usuarios[0] })
            })

    }
    render(){
        const id = this.props.match.params.id
        const { nombre, apellido_paterno, apellido_materno } = this.state.usuario

        return(
            <div>
                <div>

                    <Layout
                        mustBeSideNav={false} 
                        loggedUser = {id}
                        history={this.props.history}/>

                </div>
                <div id="body">

                    <h2>Bienvenido {nombre + " "+ apellido_paterno + " "+apellido_materno}</h2>
                  
                </div>
            </div>
        )
    }
}