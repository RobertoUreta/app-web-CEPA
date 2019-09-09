import React, { Component } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export class TextoAyuda extends Component {
    render() {
        const { nombre, componente, tooltip} = this.props
        return (
            <OverlayTrigger
                key={nombre}
                placement="top"
                delay={{ show: 3000, hide: 400 }}
                overlay={
                    <Tooltip id={`tooltip-${nombre}`}>
                        {tooltip}
                    </Tooltip>
                }
            >
                {componente}
            </OverlayTrigger>
        )
    }
}