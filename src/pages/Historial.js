import React, { Component } from 'react'
import { Card, Collapse } from 'react-bootstrap'


export class Historial extends Component {

    constructor(props) {
        super(props)

        this.state = {
            openHistorialPsico: false,
            openHistorialPsiquiatra: false
        }

    }


    _onClickAction = (evt) => {
        // eslint-disable-next-line default-case
        switch (evt.currentTarget.id) {
            case ('1'):
                this.setState(() => ({
                    openHistorialPsico: !this.state.openHistorialPsico,
                    openHistorialPsiquiatra: false
                }))
                break;
            case ('2'):
                this.setState(() => ({
                    openHistorialPsico: false,
                    openHistorialPsiquiatra: !this.state.openHistorialPsiquiatra
                }))
        }
    }

    render() {
        return (
            <div>
                <Card.Header
                    id="1"
                    onClick={this._onClickAction} >
                    <span className="linkspan">
                        <strong>Historial Psicológico</strong>
                    </span>
                </Card.Header>

                <Collapse in={this.state.openHistorialPsico}>
                    <Card.Body>
                        Esse minim aliqua proident dolore esse deserunt aliqua cillum duis quis. Ullamco id dolor do Lorem quis consectetur reprehenderit adipisicing duis. Fugiat deserunt quis elit quis. Elit officia cupidatat in in ad id. Pariatur laborum laborum veniam eu ut officia in.
                    </Card.Body>
                </Collapse>

                <br></br>
                <Card.Header
                    id="2"
                    onClick={this._onClickAction} >
                    <span className="linkspan">
                        <strong>Historial Psiquiátrico</strong>
                    </span></Card.Header>
                <Collapse in={this.state.openHistorialPsiquiatra}>
                    <Card.Body>
                        Amet elit sint pariatur ut ex Lorem eiusmod esse mollit mollit irure dolor. Magna do mollit Lorem et sit aliquip eu. Lorem in aliquip nostrud excepteur velit non fugiat in laboris deserunt dolor eiusmod. Veniam officia laborum nisi Lorem eu officia.
                    </Card.Body>
                </Collapse>

                <br></br>
            </div>
        )
    }
}