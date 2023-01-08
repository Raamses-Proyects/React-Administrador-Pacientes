import Formulario from './Formulario'
import useCitas from '../hooks/useCitas'
import { formatearFecha } from '../helpers'

function TitulosSecciones(props) {
    const { heading, span, bold } = props
    return(
        <header className='header-seccion'>
            <h2 className='header-seccion__heading'>{ heading }
                <span className='header-seccion__span'>{ span }
                    <span className='header-seccion__span--bold'> { bold }</span>
                </span>
            </h2>
        </header>
    )
}

function Buscador() {

    // State Global
    const { pacientesArray, setPacientesArrayBusqueda } = useCitas()

    // Funciones
    const buscadorPacientes = (e) => {
        let busqueda = (e.target.value).toLowerCase()
        if( busqueda.trim() !== '' ) {
            let arrayNuevo = pacientesArray.filter( (paciente) => paciente.mascota.includes(busqueda) )
            setPacientesArrayBusqueda(arrayNuevo)
        }
        else {
            setPacientesArrayBusqueda([])
        }
    }

    return(
        <div className='pacientes__buscador'>
            <label className='pacientes__label' htmlFor="buscar">Buscar Pacientes</label>
            { pacientesArray?.length < 3 ? (
                <input 
                className='pacientes__input pacientes__input--not'
                type="text" 
                name="buscar" 
                id="buscar" 
                title='Ingresa mas de 3 pacientes para activar el buscador'
                placeholder='Ingresa el nombre del paciente'
                disabled />
            ) : (
                <input 
                className='pacientes__input'
                type="text" 
                name="buscar" 
                id="buscar" 
                title='Buscar pacientes por su nombre'
                placeholder='Ingresa el nombre del paciente'
                onChange={ (e) => buscadorPacientes(e) } />
            ) }
        </div>
    )
}

function PacientesCards() {

    // State Global
    const { pacientesArray, setPacientesArray, setPacienteSeleccionado, setEditando, pacientesArrayBusqueda, setPacientesArrayBusqueda } = useCitas()

    // Funciones
    const editar = (id) => {
        setEditando(true)
        const pacienteInfo = pacientesArray.find( (info) => info.id === id)
        setPacienteSeleccionado(pacienteInfo)
    }

    const eliminar = (id) => {
        const nuevo = pacientesArray.filter( (paciente) => paciente.id !== id )
        const nuevoArr = pacientesArrayBusqueda.filter( (paciente) => paciente.id !== id )
        
        // Restableciendo los states de los array
        setPacientesArray(nuevo)
        setPacientesArrayBusqueda(nuevoArr)
        
        // Si ya no hay nada se limpia el input de busqueda
        if(pacientesArray?.length === 0) {
            document.querySelector('.pacientes__input').value = ''
        }
    }

    const arrayARenderizar = () => {
        // Eligir si se va a renderizar el array con todos los pacientes o solo el array filtrado por la busqueda
        let array;
        if( pacientesArrayBusqueda?.length > 0 ) {
            array = pacientesArrayBusqueda
        }
        else {
            array = pacientesArray
        }
        return array
    }
    
    return(
        arrayARenderizar()?.map((datos) => {

            const { mascota, propietario, email, fecha, hora, sintomas, id } = datos
            return <div className='pacientes__bloque' key={id} id={id}>
                <p className='pacientes__texto'>Nombre: <span className='pacientes__span capitalize'>{mascota}</span></p>
                <p className='pacientes__texto'>Propietario: <span className='pacientes__span capitalize'>{propietario}</span></p>
                <p className='pacientes__texto'>Email: <span className='pacientes__span'>{email}</span></p>
                <p className='pacientes__texto'>Fecha: <span className='pacientes__span'>{formatearFecha(fecha)}</span></p>
                <p className='pacientes__texto'>Hora: <span className='pacientes__span'>{hora}</span></p>
                <p className='pacientes__texto'>Sintomas: <span className='pacientes__span'>{sintomas}</span></p>

                <div className='pacientes__opciones'>
                    <button 
                        className='pacientes__accion pacientes__accion--editar' 
                        type='button' 
                        title='Editar registro' 
                        onClick={ () => editar(id) }>Editar</button>
                    <button 
                        className='pacientes__accion pacientes__accion--eliminar' 
                        type='button' 
                        title='Eliminar registro'
                        onClick={ () => eliminar(id) }>Eliminar</button>
                </div>
            </div>
        })
    )
}


function Principal() {

  // State Global
  const { pacientesArray } = useCitas()

  return (
    <main className='contenedor'>
        <section className='administrar'>

            <div className='administrar__contenido'>
                <TitulosSecciones heading="Agregar Pacientes" span="Añade a tus pacientes y" bold=" Administralos" />
                <Formulario />
            </div>

            <div className='pacientes'>
                <div className='pacientes__contenido'>
                    { pacientesArray?.length > 0 
                    ? (<TitulosSecciones heading="Listado de Pacientes" span="Administrar" bold=" Pacientes y Citas" />) 
                    : (<TitulosSecciones heading="No hay pacientes agregados" span="Los pacientes" bold=" apareceran en este lugar" />) }
                    
                    <Buscador />
                    <div className='pacientes__datos'>
                        <PacientesCards />
                    </div>
                </div>
            </div>

        </section>{ /* administrar */ }
    </main>
  )
}

export default Principal