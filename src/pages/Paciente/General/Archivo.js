import React, { Component } from 'react';
import { insertarArchivo } from '../../../backend/paciente/archivo';
import { Form, Button } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert'
export class Archivo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: 0
        }

    }
    _hideAlert = () => {
        this.setState({ alert: null })
    }
    onChangeHandler = event => {
        let files = event.target.files
        this.setState({
            selectedFile: files,
            loaded: 0
        });
    }
    onClickHandler = () => {
        if (this.state.selectedFile != null) {
            const data = new FormData()
            for (var x = 0; x < this.state.selectedFile.length; x++) {
                data.append('file', this.state.selectedFile[x])
            }
            let resp = insertarArchivo(data)
            resp.then(res => { // then print response status
                if (res.data.ok) {
                    const getAlert = () => (
                        <SweetAlert success title="Datos agregados" onConfirm={this._hideAlert}>
                            Los documentos fueron agregados correctamente!
                </SweetAlert>
                    )
                    this.setState({ selectedFile: null, alert: getAlert() })
                }
            })
                .catch(err => { // then print response status
                    console.log(err);
                })
        }
        else {
            const getAlert = () => (
                <SweetAlert warning title="Problema" onConfirm={this._hideAlert}>
                    Aun no ha seleccionado ningun documento!
        </SweetAlert>
            )
            this.setState({ alert: getAlert() })
        }
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <Form.Group className="form-group files">
                            <input type="file" multiple onChange={this.onChangeHandler} />
                        </Form.Group>
                        <Button type="button" className="btn-custom" onClick={this.onClickHandler}>Subir Documento(s)!</Button>
                        {this.state.alert}
                    </div>
                </div>
            </div>
        );
    }
}
