import React, { Component } from 'react'

import { Layout } from '../components/Layout'

import { Button, Row, Col } from 'react-bootstrap'


export class Agenda extends Component {


    render() {
        return (
            <div>
                <div>
                    <div>

                        <Layout
                            mustBeSideNav={false} />

                    </div>
                </div>
                <div id="body">
                    <div>
                        <h3>
                            <strong>
                                Agenda
                        </strong>
                        </h3>
                    </div>
                    <div style={{ display: 'flex', paddingBottom: '10px' }}>
                        <Row>
                            <Col>
                                <Button href="/index" > Agendar Sesion</Button>
                            </Col>

                            <Col>

                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}