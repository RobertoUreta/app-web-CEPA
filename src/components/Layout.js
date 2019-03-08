import React, { Component } from 'react'
import { NavBar } from './NavBar'
import { NavLateral } from './SideBarNav'
import PropTypes from 'prop-types'

export class Layout extends Component {

    constructor(props){
        super(props)
        this.state = {
            mustBeSideNav: true,
        }
    }
    _renderSideNav() {
        const id = this.props.match.params.userId

        return (

            <NavLateral
                userId = {id}/>

        )
    }

    render() {
        return (
            <div>
                <div>
                    <NavBar
                    loggedUser = { this.props.loggedUser} 
                    history = {this.props.history}/>
                </div>
                <div>
                    {this.props.mustBeSideNav
                        ? this._renderSideNav()
                        : <div></div>}
                </div>
            </div>
        )
    }
}

Layout.propTypes = {
    mustBeSideNav: PropTypes.bool,
}

Layout.defaultProps = {
    mustBeSideNav: true
}

