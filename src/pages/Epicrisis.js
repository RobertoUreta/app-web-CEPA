import React, { Component } from 'react'
import Accordion from '../components/Accordion'
import { EpicrisisPsicologica } from './Paciente/epicrisis/EpicrisisPsicologica'
import { EpicrisisPsiquiatrica } from './Paciente/epicrisis/EpicrisisPsiquiatrica'
export class Epicrisis extends Component {

    render() {
        return (
            <div>
                <Accordion>
                    <div label="Epicrisis Psicológica">
                        <EpicrisisPsicologica />
                    </div>
                    <div label="Epicrisis Psiquiátrica">
                        <EpicrisisPsiquiatrica />
                    </div>
                </Accordion>
            </div>
        )
    }
}