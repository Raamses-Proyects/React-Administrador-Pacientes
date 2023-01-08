# React-Administrador-Pacientes
Sobre el proyecto

    Construir una aplicación que tenga las funcionalidades de un CRUD, para la administración de
    pacientes de una veterinaria.

    Va a contar con un formulario con los campos de:
        1.- Nombre de Mascota - campo tipo text
        2.- Nombre Propietario - campo tipo text
        3.- Email - campo tipo email
        4.- Fecha - campo tipo date
        5.- Hora - campo tipo time
        6.- Síntomas - campo tipo textarea
    
    Tendrá un buscador para filtrar entre la lista de pacientes en base al Nombre
        1.- Un campo de tipo text
    
     Se mostrara una lista de los datos de los pacientes con las funcionalidades de
        1.- Editar/actualizar
        2.- Eliminar



CSS

    Esta construido con CSS plano y tiene descargado el archivo de normalize CSS, el sitio es
    responsive para mobil, tablet, desktop, etc.



REACT

    Se utilizaron los Hooks de useState(), useEffect() y useContent() para el manejo global de 
    las variables/states



JavaScript/Funciones

    Se tiene las funcionalidades para:
        1.- Generar ID:
            const generarID = () => {
                const fecha = Date.now().toString(36)
                const randomNum = Math.random().toString(36).substring(2)
                return fecha + randomNum
            }
        
        2.- Guardar en local storage:
            const sincronizarStorage = (nombre, array) => {
                localStorage.setItem(nombre,  JSON.stringify(array))
            }
        
        3.- Formatear una fecha:
            const formatearFecha = (fecha) => {
                let nuevaFecha
                if (!fecha.includes('T00:00:00.000Z')) {
                    nuevaFecha = new Date(fecha.split('-'))
                } 
                else {
                    nuevaFecha = new Date(fecha)
                }
                const opciones = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                    }
                return nuevaFecha.toLocaleDateString('es-ES', opciones)
            }
        
        4.- Al ser una aplicación que tiene un array con la lista de los pacientes y otro array
            con la lista de pacientes con relacion a la busqueda del usuario, se necesita saber
            en que momento renderizar uno u otro, para eso se utilizo la función de:

              const arrayARenderizar = () => {
                // Eligir si se va a renderizar el array con todos los pacientes o solo el array filtrado por la búsqueda
                let array;
                if( pacientesArrayBusqueda?.length > 0 ) {
                    array = pacientesArrayBusqueda
                }
                else {
                    array = pacientesArray
                }
                return array
            }
