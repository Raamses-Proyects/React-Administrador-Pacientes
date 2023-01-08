import { useState, useEffect } from 'react'
import useCitas from '../hooks/useCitas'
import { generarID, sincronizarStorage } from '../helpers'

function Alerta({mensaje}) {
    return(
        <div className='alerta'>
            <p className='alerta__texto'>{mensaje}</p>
        </div>
    )
}

function Formulario() {

  // State local
  const [mascotaInput, setMascotaInput] = useState('')
  const [propietarioInput, setPropietarioInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [fechaInput, setFechaInput] = useState('')
  const [horaInput, setHoraInput] = useState('')
  const [sintomasInput, setSintomasInput] = useState('')
  const [error, setError] = useState(false)


  // State Global
  const { pacientesArray, setPacientesArray, pacienteSeleccionado, setPacienteSeleccionado, editando, setEditando, setPacientesArrayBusqueda } = useCitas()


  // Llenando los inputs con los datos del paciente
  useEffect(() => {
    if( Object.keys(pacienteSeleccionado).length > 0 ) {
        setMascotaInput(pacienteSeleccionado.mascota)
        setPropietarioInput(pacienteSeleccionado.propietario)
        setEmailInput(pacienteSeleccionado.email)
        setFechaInput(pacienteSeleccionado.fecha)
        setHoraInput(pacienteSeleccionado.hora)
        setSintomasInput(pacienteSeleccionado.sintomas)
        return
    }
  }, [pacienteSeleccionado])


   // Sincronizando el storage
   useEffect(() => {
        sincronizarStorage('pacientes', pacientesArray)
   }, [pacientesArray])

   
    // Funciones
    const handleSubmit = (e) => {
        e.preventDefault()

        // Validando por campos vacios o espacios en blanco
        if( [mascotaInput, propietarioInput, emailInput, fechaInput, horaInput, sintomasInput].some((dato) => dato.trim() === '') ) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000)
            return
        }
        setError(false)

        // Creando Objeto de con datos enlazados con lo que ingresa el usuario
        const paciente = {
            mascota: mascotaInput.toLowerCase(),
            propietario: propietarioInput,
            email: emailInput,
            fecha: fechaInput,
            hora: horaInput,
            sintomas: sintomasInput
        }

        if( editando ) {
            // Agregando el id seleccionado Objeto de paciente que esta enlazado con lo que ingrese el usuario
            paciente.id = pacienteSeleccionado.id

            // Actualizando los datos
            const nuevoArray = pacientesArray.map((pacienteArr) => {
                if( pacienteArr.id === paciente.id ) {
                    return paciente
                }
                else {
                    return pacienteArr
                }
            })

            // Actualizando el array de pacientes
            setPacientesArray(nuevoArray)

            // Sincronizando el storage
            sincronizarStorage('pacientes', nuevoArray)

            // Restableciendo las busquedas
            document.querySelector('.pacientes__input').value = ''
            setPacientesArrayBusqueda([])
        }
        else {
            // Agregando ID al nuevo registro
            paciente.id = generarID()

             // Llenando el array con los datos de los pacientes
            setPacientesArray( [ ...pacientesArray, paciente ] )

            // Restableciendo las busquedas
            document.querySelector('.pacientes__input').value = ''
            setPacientesArrayBusqueda([])
        }

        // Restableciendo los states de los inputs/y el formulario
        setMascotaInput('')
        setPropietarioInput('')
        setEmailInput('')
        setFechaInput('')
        setHoraInput('')
        setSintomasInput('')

        // Restableciendo el boton y el objeto de paciente
        setPacienteSeleccionado({})
        setEditando(false)
    }


  return (
    <div className='formulario'>
        <form className='formulario__contenedor' action="" onSubmit={ handleSubmit }>
            <div className='formulario__bloque'>
                <label className='formulario__label' htmlFor="mascota">Nombre mascota:</label>
                <input 
                    className='formulario__input' 
                    type="text" 
                    id='mascota' 
                    placeholder='Nombre de mascota'
                    value={mascotaInput}
                    onChange={ (e) => setMascotaInput(e.target.value) } />
            </div>
            <div className='formulario__bloque'>
                <label className='formulario__label' htmlFor="propietario">Nombre propietario:</label>
                <input 
                    className='formulario__input' 
                    type="text" 
                    id='propietario' 
                    placeholder='Nombre del propietario'
                    value={propietarioInput}
                    onChange={ (e) => setPropietarioInput(e.target.value) } />
            </div>
            <div className='formulario__bloque'>
                <label className='formulario__label' htmlFor="email">Email:</label>
                <input 
                    className='formulario__input' 
                    type="email" 
                    id='email' 
                    placeholder='Email contacto propietario'
                    value={emailInput}
                    onChange={ (e) => setEmailInput(e.target.value) } />
            </div>
            <div className='formulario__bloque'>
                <label className='formulario__label' htmlFor="fecha">Fecha:</label>
                <input 
                    className='formulario__input' 
                    type="date" 
                    id='fecha'
                    value={fechaInput}
                    onChange={ (e) => setFechaInput(e.target.value) } />
            </div>
            <div className='formulario__bloque'>
                <label className='formulario__label' htmlFor="hora">Hora:</label>
                <input 
                    className='formulario__input' 
                    type="time" 
                    id='hora'
                    value={horaInput}
                    onChange={ (e) => setHoraInput(e.target.value) } />
            </div>
            <div className='formulario__bloque'>
                <label className='formulario__label' htmlFor="sintomas">Sintomas:</label>
                <textarea 
                    className='formulario__input'
                    name="sintomas" 
                    id="sintomas" 
                    cols="30" 
                    rows="10" 
                    placeholder='Describe los malestares'
                    value={sintomasInput}
                    onChange={ (e) => setSintomasInput(e.target.value) }
                    ></textarea>
            </div>
            { error && <Alerta mensaje="Todos los campo son obligatorios"/> }
            <button className='formulario__submit' type="submit" title='Agregar paciente'>{editando ? `Actualizar registro` : 'Agregar paciente' }</button>
        </form>
    </div>
  )
}

export default Formulario