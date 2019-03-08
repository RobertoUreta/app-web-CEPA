import React, { Component } from 'react'
import { NavBar } from '../components/NavBar'
import { NavLateral } from '../components/SideBarNav'
import PropTypes from 'prop-types'

export class Index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mustBeSideNav: true,
        }
    }
    _renderSideNav() {
        const id = this.props.match.params.userId

        return (

            <NavLateral
                userId={id} 
                />

        )
    }

    render() {
        const id = this.props.match.params.userId
       
        return (
            <div>
                <div>
                    <NavBar
                        loggedUser={this.props.match.params.id}
                        history={this.props.history} />
                </div>
                <div>
                    <NavLateral
                        userId={id} 
                        history = {this.props.history}
                        loggedUser= {this.props.match.params.id}/>

                </div>
            </div>
        )
    }
}