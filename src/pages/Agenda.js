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
import { insertarSesion, obtenerSesiones, obtenerLastIdSesion, colorUsuario, obtenerPacienteSesion } from '../backend/agenda/agenda';



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
            eventos: events,
            clickedId: 0,
            salas: new Map(),
            loadingInfo: 'initial',
            idSesion: 0,
            colorUsuario: new Map(),
            clickedEvent: false,

        }
    }

    //no sirve por el momento
    getHora(hora) {
        let fecha = new Date(hora)
        var localeSpecificTime = fecha.toLocaleTimeString();
        console.log("localeSpecific", localeSpecificTime)
        return localeSpecificTime.replace(/:\d+ /, ' ');

    }

    eventStyleGetter = (event) => {
        var backgroundColor = event.hexColor;
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
        let idUser = this.props.match.params.id

        let promiseColor = colorUsuario()
        promiseColor
            .then(res => {
                console.log(res)
                let aux = new Map()
                let data = res.data;
                let arr = data.response;
                arr.forEach(element => {
                    aux.set(element.id_usuario, element.color)
                });
                this.setState({ color: aux })
            })

        let eventos = []
        let promise = obtenerSesiones(idUser)
        promise
            .then(res => {https://makeawebsitehub.com/host-website-computer/
                res.data.response.forEach(element => {
                    let aux = new Date(element.fecha_sesion)
                    //aux[1] = element.hora_inicio_atencion
                    let fechaStart = aux.toISOString().split('T')
                    fechaStart[1] = element.hora_inicio_atencion

                    let fechaEnd = aux.toISOString().split('T')
                    fechaEnd[1] = element.hora_termino_atencion
                    let promesaPaciente = obtenerPacienteSesion(element.id_sesion)
                    let title;
                    promesaPaciente
                        .then(res => {
                            console.log(res.data.respuesta)
                            let data = res.data.respuesta
                            title = data.nombre + " " + data.apellido_paterno + " " + data.apellido_materno
                            console.log(title)
                            let nuevoEvento = {
                                id: element.id_sesion,
                                title: title,
                                start: new Date(fechaStart[0] + " " + fechaStart[1]),
                                end: new Date(fechaEnd[0] + " " + fechaEnd[1]),
                                fecha_sesion: element.fecha_sesion,
                                ref_sala: element.ref_sala,
                                ref_paciente: element.ref_ingreso,
                                estado_sesion: element.estado_sesion,
                                descripcion_sesion: element.descripcion_sesion,
                                valor_sesion: element.valor_sesion,
                                ref_usuario: element.ref_usuario,
                                hexColor: element.color
                            }
                            eventos.push(nuevoEvento)
                            this.setState({ eventos: eventos})
                        }).catch(err => {
                            console.log(err)
                        })

                    console.log("aquiTitle" + title)


                   
                })

                this.setState({loadingInfo: 'false ', clickedId: 1 })

            }).catch(err => {
                this.setState({ loadingInfo: 'false ' })
            })

    }

    _handleShowInfo(evt) {
        console.log("handleShowInfo", evt.id, "event", evt)

        this.setState({ showInfo: true, clickedId: evt.id, clickedEvent: true });
        console.log("stateClickedId", this.state.clickedId)

    }

    _handleShow(event) {
        console.log(event)
        this.setState({ show: true, fecha: event.start })
    }

    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt, clickedEvent: false });
    }

    _hideAlert = () => {
        this.setState({ alert: null })
    }

    _handleModalSubmit = (evt) => {

        console.log("_handleModalSubmit")
        let aux = JSON.parse(evt)
        let fecha = new Date(aux.fechaSesion)

        let fechaStart = new Date(fecha.getFullYear(), fecha.getMonth()
            , fecha.getDate(), new Date(aux.horaInicio).getHours(), new Date(aux.horaInicio).getMinutes()) //en linux tiraba error

        console.log(fechaStart)
        let fechaEnd = new Date(fecha.getFullYear(), fecha.getMonth()
            , fecha.getDate(), new Date(aux.horaTermino).getHours(), new Date(aux.horaTermino).getMinutes()) //en linux tiraba error  

        let title = aux.paciente + " " + aux.sala
        let colorNuevo = this.state.color.get(aux.idProfesional)
        console.log("color del usuario", colorNuevo)
        let eventoNuevo = {
            id: aux.id,
            title: title,
            start: fechaStart,
            end: fechaEnd,
            fecha_sesion: aux.fechaSesion,
            ref_sala: aux.idSala,
            ref_paciente: aux.idPaciente,
            estado_sesion: aux.estadoSesion,
            descripcion_sesion: aux.descripcion,
            valor_sesion: aux.valorSesion,
            ref_usuario: aux.idProfesional,
            startAux: fechaStart,
            endAux: fechaEnd,
            hexColor: colorNuevo
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


        let modalClose = () => this.setState({ showInfo: false, clickedEvent: false });

        const views = ['month', 'work_week', 'day']

        moment.locale("es", { week: { dow: 1 } })
        let localizer = BigCalendar.momentLocalizer(moment)

        if (this.state.loadingInfo === 'initial') {
            return <h2>Intializing...</h2>;

        }


        if (this.state.loadingInfo === 'true') {
            return <h2>Cargando...</h2>;

        }



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


                {this.state.clickedEvent && <ModalSesionInfo
                    show={this.state.showInfo}
                    onHide={modalClose}
                    eventos={this.state.eventos}
                    clickedInfo={this.state.clickedId}
                />}
                {this.state.alert}
            </div>
        )
    }
}