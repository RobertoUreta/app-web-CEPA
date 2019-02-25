import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/styles.css'

class AccordionSection extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Object).isRequired,
    isOpen: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    this.props.onClick(this.props.label);
  };

  render() {
    const {
      onClick,
      props: { isOpen, label },
    } = this;

    return (
      <div
        style={{
          background: isOpen ? 'white' : 'white',
          padding: '5px 10px',
          borderBottom:'1px solid rgba(0, 0, 0, 0.125)',
        }}
      >
      
        <div onClick={onClick} style={{ cursor: 'pointer' }}>
          <strong>{label}</strong>
          <div style={{ float: 'right' }}>
            {!isOpen && <span style={{color: 'lightgray'}}>&#9654;</span>}
            {isOpen && <span style={{color: 'lightgray'}}>&#9660;</span>}
          </div>
        </div>
        {isOpen && (
        
  
          <div
            style={{
              background: '#f8f9fa',
              marginTop: 10,
              borderTop: '1px solid rgba(0, 0, 0, 0.125)',
              padding: '10px 20px',
              
            }}
          >
            {this.props.children}
          </div>

          
          
        )}
        
      </div> 
    );
  }
}

export default AccordionSection;