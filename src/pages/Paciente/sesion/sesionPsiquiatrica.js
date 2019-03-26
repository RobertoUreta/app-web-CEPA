import React, { Component } from 'react'
import { Form, Col, Button, Row } from 'react-bootstrap'
import { Option } from '../../../components/Option'
import { TextoAyuda } from '../../../components/TextoAyuda'
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import { imgDataFooter, imgDataUtal } from '../../../images/imagenes/imagenes';

import { obtenerRegistroPsiquiatrico } from '../../../backend/paciente/registros';
const tiposTratamiento = ["Terapia individual", "Taller", "Intervención grupal", "Derivación asistida"];

window.html2canvas = html2canvas

export class SesionPsiquiatrica extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numSesion: "",
            tipoTratamiento: "",
            notasSesion: "",
            editable: false,
            loadingInfo: 'initial',
            id: this.props.idSesion,
            refRegistro: this.props.refRegistro,
            num: this.props.numSesion,
            mostrarBotones: true
        };
    }
    componentDidMount() {
        const self = this
        this.setState({ loadingInfo: 'true' })
        console.log("State Id", this.state.id)
        console.log("refRegistro," ,this.state.refRegistro)
        let promise = obtenerRegistroPsiquiatrico(this.state.id,this.state.refRegistro)

        promise
            .then(res => {
                let data = res.data;
                if (data !== undefined) {
                    let reg = data.response[0]
                    console.log("Registro",reg)
                    self.setState({
                        tipoTratamiento: reg.tipo_tratamiento === "default" ? "" : reg.tipo_tratamiento,
                        notasSesion: reg.observaciones === "default" ? "" : reg.observaciones
                    })
                }
            })

    }

    printDocument(num) {
 
        console.log("aasdfa", num)
        const input = document.getElementById('divToPrint');
        const pdf = new jsPDF();
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight()
        var divHeight = document.getElementById('divToPrint').clientHeight;
        var divWidth = document.getElementById('divToPrint').clientWidth
        var ratio = divHeight / divWidth 
        console.log(ratio)
        pdf.addImage(imgDataUtal, 'png', 0, 0)
        pdf.setFontSize(20)
        pdf.text(55, 40, `Registro Sesión Psiquiatrica N°${num}`)
        pdf.addImage(imgDataFooter, 'png', 0, 255)
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                height = ratio * width
                pdf.addImage(imgData, 'JPEG', 15, 45, width - 30, height -10, 'content');
                pdf.save(`REG_SESION_PSIQUIATRICA_N_${num}`);

            })
            ;

    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        let info = JSON.stringify(this.state, null, '  ');

        this.props.onSubmit(info)

    }

    _handleClick = () => {
        this.setState({ editable: !this.state.editable })
    }


    render() {
        return (
            <div><div id='divToPrint' className="sesionPsiquiatrica" styles={{
                backgroundColor: '#f5f5f5',
                width: '210mm',
                minHeight: '297mm',
                marginLeft: 'auto',
                marginRight: 'auto'
            }} >
                <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Row>
                               
                                <Col>
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
                                </Col>
                            </Row>
                            <Form.Group controlId="notasSesion">
                                <Form.Label>Notas de la sesión</Form.Label>
                                <Form.Control
                                    readOnly={!this.state.editable}

                                    as="textarea"
                                    rows="10"
                                    value={this.state.notasSesion}
                                    onChange={this.handleChange}
                                    placeholder="Notas de la sesión"
                                />
                            </Form.Group>
                            <Form.Group>

                            </Form.Group>
                        </Form.Group>
                    </Form.Row>

                </form>
            </div>
                <div className="btn-container">
                    <Button
                        className="btn-custom"
                        onClick={() => this.printDocument(this.state.num)}>
                        Imprimir</Button>

                    <div className="divider"></div>

                    <Button
                        className="btn-submit"
                        onClick={this._handleClick}
                    >
                        Editar
                                        </Button>
                    <div className="divider"></div>
                    <Button
                        className="btn-submit"
                        type="submit"
                        onClick={this.handleSubmit}
                    >
                        Guardar
                                        </Button>
                </div>
            </div>
        );
    }
}