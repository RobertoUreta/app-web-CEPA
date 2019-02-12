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
import { Tratamiento } from '../pages/Tratamiento'
import { General } from '../pages/General'


const AppContainer = styled(BaseAppContainer)`
  height: 100vh
  width: 100wh
`;

const Navigation = styled(BaseNavigation)`
  background:  #f8f9fa;
  color: #8d97ad;
  font-size: 1em;
  width: 130px;
  line-height: 22px;
`;

const theme = {
  selectionColor: "#FFF",
  hoverBgColor: "#438C83"
};

const Text = styled.div`
  color:  black
  padding-left: 8px;
`;

export class NavLateral extends Component {
  state = { selectedPath: '' }

  _onItemSelection = (arg) => {
    console.log(arg.path)
    this.setState({ selectedPath: arg.path })

  }

  _renderSelection() {
    console.log('_renderSelection')
    if (this.state.selectedPath === "1") {
      return <General />
    }
    if (this.state.selectedPath === "3") {
      return <Tratamiento />
    }
  }


  render() {
    console.log('->render')
    console.log(this.state.selectedPath)
    return (
      <AppContainer>
        <Navigation>
          <SideNav
            defaultSelectedPath="1"
            theme={theme}
            onItemSelection={this._onItemSelection}
          >
              <Nav id="1">
                <Text>General</Text>
              </Nav>
            
              <Nav id="2">
                <Text>Evaluacion</Text>
              </Nav>
              <Nav id="3">
                <Text>Tratamiento</Text>
              </Nav>
              <Nav id="4">
                <Text>Derivación</Text>
              </Nav>
              <Nav id="5">
                <Text>Historial</Text>
              </Nav>
          </SideNav>

        </Navigation>
        <Body>
          {this._renderSelection()}
        </Body>
      </AppContainer>
    )
  }
}
