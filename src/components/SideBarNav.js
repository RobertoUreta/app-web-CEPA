import React, { Component } from 'react'
import { SideNav, Nav } from 'react-sidenav'
import styled from "styled-components";
import {
    AppContainer as BaseAppContainer,
    ExampleNavigation as BaseNavigation,
    Body
  } from "../containers/containers";
import "../styles/styles.css";
import { Link } from 'react-router-dom'


const AppContainer = styled(BaseAppContainer)`
  height: calc(100vh - 40px);
`;

const Navigation = styled(BaseNavigation)`
  background: #303641;
  color: #8d97ad;
  font-size: 1em;
  letter-spacing: 2px;
  width: 130px;
  line-height: 22px;
`;

const theme = {
  selectionColor: "#FFF",
  hoverBgColor: "#181b20"
};

const Text = styled.div`
  padding-left: 8px;
`;

export class NavLateral extends Component {
    state = { selectedPath: '' }

    _onItemSelection = ( arg )  => {
        console.log( arg.path )
        this.setState( { selectedPath: arg.path })
        
    }

    render() {
        console.log('->render')
        return (
            <AppContainer>
            <Navigation>
              <SideNav
                defaultSelectedPath="1"
                theme={theme}
                onItemSelection={this.onItemSelection}
              >
                <Link to="/">
                 <Nav id="1">
                    <Text>General</Text>
                </Nav>
                </Link>
                <Link to="/Layout">
                 <Nav id="2">
                    <Text>Evaluacion</Text>
                </Nav>
                </Link>
                <Link to="/Layout">
                 <Nav id="3">
                    <Text>Tratamiento</Text>
                </Nav>
                </Link>
                <Link to="/Layout">
                 <Nav id="4">
                    <Text>Derivación</Text>
                </Nav>
                </Link>
                <Link to="/Layout">
                 <Nav id="5">
                    <Text>Historial</Text>
                </Nav>
                </Link>
            </SideNav>

            </Navigation>
            <Body>
            </Body>
            </AppContainer>
        )
    }
}