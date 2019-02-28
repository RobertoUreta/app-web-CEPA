import React, { Component } from 'react'

import { Layout } from '../components/Layout'

import { Button, Row, Col } from 'react-bootstrap'
import { ModalSesion } from '../components/ModalSesion'
import events from '../components/events'
import "react-big-calendar/lib/css/react-big-calendar.css"
import BigCalendar from 'react-big-calendar';
import "../styles/styles.css"

import moment from 'moment'


export class Agenda extends Component {

    constructor(props) {

        super(props)
        this._handleShow = this._handleShow.bind(this);


        moment.lang('es', {
            months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
            monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
            weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
            weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
            weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
        }
        );


        this.state = {

            show: false
        }
    }

    getHora(hora) {
        let fecha = new Date(hora)
        var localeSpecificTime = fecha.toLocaleTimeString();
        return localeSpecificTime.replace(/:\d+ /, ' ');

    }

    _handleShow() {
        this.setState({ show: true })
    }

    _handleClose = (modalEvt) => {
        this.setState({ show: modalEvt });
    }

    _handleModalSubmit = (evt) => {

        console.log("_handleModalSubmit")
        let aux = JSON.parse(evt)
        let fecha = new Date(aux.fechaSesion)
        console.log(fecha)
        let inicio = this.getHora(aux.horaInicio).split(":")
        let termino = this.getHora(aux.horaTermino).split(":")
        

        console.log(fecha.getFullYear())
        console.log(fecha.getMonth())
        console.log(fecha.getDate())


        let eventoNuevo = {
            id: events.lenghth,
            title: aux.descripcion,
            start: new Date(fecha.getFullYear(), fecha.getMonth()
                , fecha.getDate(), inicio[0], inicio[1]),
            end: new Date(fecha.getFullYear(), fecha.getMonth()
                , fecha.getDate(), termino[0], termino[1])
        }

        events.push(eventoNuevo)



    }

    render() {
        let messages = {
            next: "Siguiente",
            previous: "Atrás",
            today: "Hoy",
            month: "Mensual",
            week: "Semanal",
            day: "Día",
            date: "Fecha"
        }

        let localizer = BigCalendar.momentLocalizer(moment)
        return (
            <div>
                <div>
                    <div>

                        <Layout
                            mustBeSideNav={false} />

                    </div>
                </div>
                <div id="body-agenda">
                    <br></br>
                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                        <Row>
                            <Col>
                                <Button className="btn-custom-add" onClick={this._handleShow} ><i className="fa fa-plus"></i></Button>
                                <ModalSesion
                                    show={this.state.show}
                                    onClose={this._handleClose}
                                    onSubmit={this._handleModalSubmit} />
                            </Col>

                        </Row>
                    </div>
                    <div style={{ height: '70vh' }}>
                        <BigCalendar
                            events={events}

                            step={60}
                            showMultiDayTimes
                            defaultDate={new Date()}
                            localizer={localizer}
                            messages={messages}

                        />
                    </div>
                </div>
            </div>
        )
    }
}