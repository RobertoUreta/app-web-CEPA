import React , { Component } from 'react'
import { NavBar } from './NavBar'
import { NavLateral } from './SideBarNav'

export class Layout extends Component {
    
    _renderSideNav(){
        return (
            <NavLateral />
        )
    }


    state = { mustBeSideNav : true}
    
    render (){ 
        return (
            <div>
                <NavBar />
                {this.state.mustBeSideNav 
                ? this._renderSideNav()
                : null}

            </div>
        )
    }
}

