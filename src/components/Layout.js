import React, { Component } from 'react'
import { NavBar } from './NavBar'
import { NavLateral } from './SideBarNav'
import PropTypes from 'prop-types'

export class Layout extends Component {

    _renderSideNav() {
        return (

            <NavLateral />

        )
    }


    state = { mustBeSideNav: true }

    render() {
        return (
            <div>
                <div>
                    <NavBar />
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

