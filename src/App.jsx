import { CitasProvider } from './context/CitasProvider'
import CitasApp from './components/AppCitas'

function App() {

  return (
    <CitasProvider>
      <CitasApp/>
    </CitasProvider>
  )
}

export default App
