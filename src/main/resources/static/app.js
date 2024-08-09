const URL_API = "http://localhost:8080/api/users"; 

const frmRegistro = document.querySelector('#userForm');
const postUser = async (userData) => {
    try {
        console.log(userData);
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


document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    // const userData = {
    //     id: document.getElementById('id').value,
    //     nombre: document.getElementById('nombre').value
    // };

    postUser(Object.fromEntries(new FormData(frmRegistro).entries()));
});



const getUserById = async (id) => {
    try {
        const response = await fetch(`${URL_API}/${id}`);
        if (response.ok) {
            const user = await response.json();
            console.log('Usuario encontrado:', user);
            document.getElementById('filterName').value = user.nombre;
        } else if (response.status === 404) {
            alert('Usuario no encontrado');
            document.getElementById('filterName').value = ''; 
        } else {
            console.error('Error al buscar el usuario:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud GET:', error.message);
        alert('Usuario no encontrado');
    }
};


document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const userId = document.getElementById('filterId').value;
    console.log(userId);
    getUserById(userId);
});
