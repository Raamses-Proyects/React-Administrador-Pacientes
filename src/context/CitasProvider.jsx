import { createContext, useState } from 'react'


// El context/CitasContext es el nombre para usar los datos(al provider/CitasProvider)
const CitasContext = createContext()


// El Provider/CitasProvider es el que contiene los datos
const CitasProvider = ({children}) => {

    const [pacientesArray, setPacientesArray] = useState( JSON.parse(localStorage.getItem('pacientes')) || [] )
    const [pacientesArrayBusqueda, setPacientesArrayBusqueda] = useState([])
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState({})
    const [editando, setEditando] = useState(false)


    return(
        <CitasContext.Provider
        value={{
            pacientesArray,
            setPacientesArray,
            pacienteSeleccionado,
            setPacienteSeleccionado,
            editando,
            setEditando,
            setPacientesArrayBusqueda,
            pacientesArrayBusqueda
        }}
        >
            {children}
        </CitasContext.Provider>
    )
}

export { CitasProvider }
export default CitasContext