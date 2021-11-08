
import React from 'react';


export class ErrorDriver extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // También puedes registrar el error en un servicio de reporte de errores
      console.error(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // Puedes renderizar cualquier interfaz de repuesto
        window.location.reload(); 
        return <h3>Cargando...</h3>;
      }
  
      return this.props.children; 
    }
  }