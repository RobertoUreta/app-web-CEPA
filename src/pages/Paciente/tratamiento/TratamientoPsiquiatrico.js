import React, { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import { TextoAyuda } from '../../../components/TextoAyuda'
import SweetAlert from 'react-bootstrap-sweetalert'
import { updateTratamientoPsiquiatrico, obtenerTratamientoPsiquiatrico } from '../../../backend/tratamiento/tratamientoPsiquiatrico';
const tiposTratamiento = ["Terapia individual", "Taller", "Intervención grupal", "Derivación asistida"]
export class TratamientoPsiquiatrico extends Component {

    constructor(props) {
        super(props);

        this.state = {
            motivoTratamiento: "",
            motivoCoconstruido: "",
            tipoTratamiento: "",
            alert: null
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const aux = JSON.parse(JSON.stringify(this.state, null, '  '));
        console.log(aux);
        let resp = updateTratamientoPsiquiatrico(aux, this.props.pacienteId);
        resp
            .then(res => {
                //console.log("agregado", res.data)
                if (res.data.ok) {
                    const getAlert = () => (
                    <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agregaron correctamente los datos del tratamiento psiquiatrico.
                    </SweetAlert>
                    )
                    this.setState({ alert: getAlert() })
                }

            })
    }
    _hideAlert = () => {
        this.setState({ alert: null })
    }

    componentDidMount() {
        let prom = obtenerTratamientoPsiquiatrico(this.props.pacienteId);
        prom.then(res => {
            let data = res.data;
            console.log(res.data);
            if (data !== undefined) {
                let tratamiento = data.respuesta[0];
                this.setState({
                    motivoTratamiento: tratamiento.motivo_consulta_psiquiatrica==='default'?"":tratamiento.motivo_consulta_psiquiatrica,
                    motivoCoconstruido: tratamiento.motivo_consulta_coconstruido==='default'?"":tratamiento.motivo_consulta_coconstruido,
                    tipoTratamiento: tratamiento.tipo_tratamiento==='default'?"":tratamiento.tipo_tratamiento,
                });
            }
        })
    }

    render() {
        return (
            <div className="tratamientoPsiquiatrico">
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>

                            <Form.Group controlId="tipoTratamiento">
                            <TextoAyuda
                                            nombre="tipoTratamiento"
                                            tooltip="Tipo Tratamiento"
                                            componente={<Form.Control
                                    as="select"
                                    value={this.state.tipoTratamiento}
                                    onChange={this.handleChange}
                                >
                                    <option hidden>Tipo Tratamiento</option>
                                    <Option options={tiposTratamiento} />
                                </Form.Control>}
                                        />
                                
                            </Form.Group>

                            <Form.Group controlId="motivoTratamiento">
                                <Form.Label>Motivo consulta psiquiatrico</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.motivoTratamiento}
                                    onChange={this.handleChange}
                                    placeholder="Detallar Motivos"
                                />
                            </Form.Group>
                            <Form.Group controlId="motivoCoconstruido">
                                <Form.Label>Motivo consulta Co-construido</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    value={this.state.motivoCoconstruido}
                                    onChange={this.handleChange}
                                    placeholder="Detallar Motivos"
                                />
                            </Form.Group>

                            <Form.Group>
                                <div className="btn-container">
                                    <Button
                                        className="btn-submit"
                                        type="submit"
                                    >
                                        Guardar
                                        </Button>
                                </div>
                            </Form.Group>
                        </Form.Group>
                    </Form.Row>
                    {this.state.alert}
                </form>
            </div>
        );
    }
}