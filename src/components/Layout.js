import React , { Component } from 'react'
import { NavBar } from './NavBar'
import { NavLateral } from './SideBarNav'

export class Layout extends Component {
    
    render (){ 
        return (
            <div>
                <NavBar />
                <NavLateral />
            </div>
        )
    }
}

