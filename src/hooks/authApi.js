export const registerUser = async (user) => {
  const response = await fetch('http://localhost:3000/register', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  try {
    if (response.status === 400) {
      return { error: true, message: 'El correo ya existe' }
    }
    const data = await response.json()
    return { error: false, message: 'Usuario registrado correctamente', user: { ...data.user, token: data.accessToken } }
  } catch (error) {
    console.log(error, 'error')
    return { error: true, message: 'Error al registrar el usuario' }
  }
}

export const loginUser = async (user) => {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  try {
    if (response.status === 400) {
      return { error: true, message: 'El usuario no existe' }
    }
    const data = await response.json()
    return { error: false, message: 'Usuario logueado correctamente', user: { ...data.user, token: data.accessToken } }
  } catch (error) {
    console.log(error, 'error')
    return { error: true, message: 'Error al loguear el usuario' }
  }
}
