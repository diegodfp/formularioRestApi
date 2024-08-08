const URL_API = "http://localhost:8080/api/users"; // Asegúrate de que la URL sea correcta

// Función para manejar el envío del formulario
const postUser = async (userData) => {
    try {
        const response = await fetch(URL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const createdUser = await response.json();
            console.log('Usuario creado:', createdUser);
            alert(`Usuario creado: ${createdUser.nombre}`);
        } else {
            console.error('Error al crear el usuario:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud POST:', error.message);
    }
};

// Manejador del evento submit del formulario
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    const userData = {
        id: document.getElementById('id').value,
        nombre: document.getElementById('nombre').value
    };

    postUser(userData);
});


// Función para obtener un usuario por ID
const getUserById = async (id) => {
    try {
        const response = await fetch(`${URL_API}/${id}`);
        if (response.ok) {
            const user = await response.json();
            console.log('Usuario encontrado:', user);
            document.getElementById('filterName').value = user.nombre;
        } else if (response.status === 404) {
            alert('Usuario no encontrado');
            document.getElementById('filterName').value = ''; // Limpiar el campo si no se encuentra
        } else {
            console.error('Error al buscar el usuario:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud GET:', error.message);
        alert('Usuario no encontrado');
    }
};

// Manejador del evento submit para filtrar por ID
document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    const userId = document.getElementById('filterId').value;
    console.log(userId);
    getUserById(userId);
});
