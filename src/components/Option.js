import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class Option extends Component{
    static propTypes = {
        options: PropTypes.array
    }

    render(){
        const {options} = this.props
        return(
            options.map((op,i) =>(
                <option key={i}>{op}</option>
            ) )
        )
    }
}