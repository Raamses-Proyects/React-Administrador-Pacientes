import Principal from './Principal'

function CitasApp() {
  return (
   <>
      <header className='header contenedor'>
        <h1 className='header__heading'>Seguimiento de Pacientes <span className='header__span'>Veterinaria</span></h1>
      </header>
      <Principal/>
      <footer className='footer'>
      </footer>
   </>
  )
}

export default CitasApp