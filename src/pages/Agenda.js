import React, { Component } from 'react'

import { Layout } from '../components/Layout'

import { Row, Col } from 'react-bootstrap'
import { ModalSesion } from '../components/ModalSesion'
import { ModalSesionInfo } from '../components/ModalSesionInfo'
import events from '../components/events'
import "react-big-calendar/lib/css/react-big-calendar.css"
import BigCalendar from 'react-big-calendar';
import "../styles/styles.css"
import SweetAlert from 'react-bootstrap-sweetalert'

import { verificarSesion } from '../backend/login'

import moment from 'moment'
import { insertarSesion, obtenerSesiones, obtenerLastIdSesion } from '../backend/agenda/agenda';



export class Agenda extends Component {

    constructor(props) {

        super(props)
        this._handleShow = this._handleShow.bind(this);
        this._handleShowInfo = this._handleShowInfo.bind(this);

        moment.lang('es', {
            months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
            monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
            weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
            weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
            weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
        }
        );


        this.state = {
            fecha: new Date(),
            show: false,
            showInfo: false,
            eventos: [],
            clickedId: 0,
            salas: new Map(),
            loadingInfo: 'initial',
            idSesion: 0,
        }
    }

    getHora(hora) {
        let fecha = new Date(hora)
        var localeSpecificTime = fecha.toLocaleTimeString();
        return localeSpecificTime.replace(/:\d+ /, ' ');

    }

    eventStyleGetter = (event) => {
        var backgroundColor = '#' + event.hexColor;
        var style = {
            backgroundColor: backgroundColor,

        };
        return {
            style: style
        };
    }




    componentDidMount() {
        this.setState({ loadingInfo: 'true' })
        let res = verificarSesion();
        res.then(resp => {
            if (!resp.data.ok) {
                this.props.history.push('/')
            }

        })

        let eventos = []
        let promise = obtenerSesiones()
        promise
            .then(res => {
                res.data.response.forEach(element => {
                    let aux = new Date(element.fecha_sesion)//.toISOString().split('T')
                    //aux[1] = element.hora_inicio_atencion
                    let fechaStart = aux.toISOString().split('T')
                    fechaStart[1] = element.hora_inicio_atencion
                    console.log(new Date(fechaStart[0] + " " + fechaStart[1]))
                    let fechaEnd = aux.toISOString().split('T')
                    fechaEnd[1] = element.hora_termino_atencion
                    let nuevoEvento = {
                        id: element.id_sesion,
                        title: element.descripcion_sesion,
                        start: new Date(fechaStart[0] + " " + fechaStart[1]),
                        end: new Date(fechaEnd[0] + " " + fechaEnd[1]),
                        fecha_sesion: element.fecha_sesion,
                        ref_sala: element.ref_sala,
                        ref_paciente: element.ref_ingreso,
                        estado_sesion: element.estado_sesion,
                        descripcion_sesion: element.descripcion_sesion,
                        valor_sesion: element.valor_sesion,
                        ref_usuario: element.ref_usuario,
                    }
                    eventos.push(nuevoEvento)
                })

                this.setState({ eventos: eventos, loadingInfo: 'false ' })

            }).catch(err => {
                console.log(err)
            })

    }

    _handleShowInfo(evt) {
        console.log("handleShowInfo", evt.id)

        this.setState({ showInfo: true, clickedId: evt.id });
        console.log(this.state.clickedId)

    }

    _handleShow(event) {
        console.log(event)
        this.setState({ show: true, fecha: event.start })
    }

    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }

    _hideAlert = () => {
        this.setState({ alert: null })
    }

    _handleModalSubmit = (evt) => {

        console.log("_handleModalSubmit")
        let aux = JSON.parse(evt)
        let fecha = new Date(aux.fechaSesion)
        console.log("aux", aux)
        let inicio = this.getHora(aux.horaInicio).split(":")
        let termino = this.getHora(aux.horaTermino).split(":")

        let fechaStart = new Date(fecha.getFullYear(), fecha.getMonth()
            , fecha.getDate(), inicio[0], inicio[1])

        let fechaEnd = new Date(fecha.getFullYear(), fecha.getMonth()
            , fecha.getDate(), termino[0], termino[1])

        let eventoNuevo = {
            id: aux.id,
            title: aux.descripcion,
            start: fechaStart,
            end: fechaEnd,
            fecha_sesion: aux.fechaSesion,
            ref_sala: aux.idSala,
            ref_paciente: aux.idPaciente,
            estado_sesion: aux.estadoSesion,
            descripcion_sesion: aux.descripcion,
            valor_sesion: aux.valorSesion,
            ref_usuario: this.props.match.params.id,
            startAux: fechaStart,
            endAux: fechaEnd

        }

        let validar = insertarSesion(eventoNuevo)
        validar
            .then(res => {
                console.log("res", res)

                if (res.data.ok) {
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Se agendó correctamente la sesión
                         </SweetAlert>
                    )
                    this.setState({ alert: getAlert() })
                    this.state.eventos.push(eventoNuevo)

                } else {
                    const getAlert = () => (
                        <SweetAlert warning title="Falla" onConfirm={this._hideAlert}>
                            Esa sala ya está utilizada en ese horario
                         </SweetAlert>
                    )
                    this.setState({ alert: getAlert() })

                }
            })

    }


    render() {
        let messages = {
            next: "Siguiente",
            previous: "Atrás",
            today: "Hoy",
            work_week: "Semanal",
            month: "Mensual",
            week: "Semanal",
            day: "Día",
            date: "Fecha"
        }

        const id = this.props.match.params.id


        let modalClose = () => this.setState({ showInfo: false });

        const views = ['month', 'work_week', 'day']

        moment.locale("es", { week: { dow: 1 } })
        let localizer = BigCalendar.momentLocalizer(moment)

        if (this.state.loadingInfo === 'initial') {
            return <h2>Intializing...</h2>;

        }


        if (this.state.loadingInfo === 'true') {
            return <h2>loadingInfo...</h2>;

        }

        console.log("amipixula21231", this.state.eventos, this.state.idSesion)

        return (
            <div>
                <div>
                    <div>

                        <Layout
                            mustBeSideNav={false}
                            loggedUser={id}
                            history={this.props.history} />

                    </div>
                </div>
                <div id="body-agenda">
                    <br></br>
                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                        <Row>
                            <Col>
                                <ModalSesion
                                    show={this.state.show}
                                    onClose={this._handleClose}
                                    onSubmit={this._handleModalSubmit}
                                    selectedDate={this.state.fecha}
                                />
                            </Col>

                        </Row>
                    </div>
                    <div style={{ height: '70vh' }}>
                        <BigCalendar
                            popup
                            selectable
                            min={new Date(2017, 10, 0, 9, 0, 0)}
                            max={new Date(2017, 10, 0, 18, 0, 0)}
                            views={views}
                            events={this.state.eventos}
                            step={15}
                            showMultiDayTimes
                            defaultDate={new Date()}
                            localizer={localizer}
                            messages={messages}
                            onSelectEvent={this._handleShowInfo}
                            onSelectSlot={this._handleShow}
                            eventPropGetter={(this.eventStyleGetter)}
                        />
                    </div>
                </div>


                <ModalSesionInfo
                    show={this.state.showInfo}
                    onHide={modalClose}
                    eventos={this.state.eventos}
                    clickedInfo={this.state.clickedId}
                />
                {this.state.alert}
            </div>
        )
    }
}