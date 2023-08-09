export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/
  if (!email) return 'El correo no puede estar vacío.'
  if (!re.test(email)) return 'Ooops! Se necesita un correo válido.'
  return ''
}

export const passwordValidator = (password) => {
  if (!password) return 'La contraseña no puede estar vacía.'
  if (password.length < 5) return 'La contraseña debe tener al menos 5 caracteres.'
  return ''
}

export const nameValidator = (name) => {
  if (!name) return 'El nombre no puede estar vacío.'
  return ''
}

export const lastNameValidator = (lastName) => {
  if (!lastName) return 'El apellido no puede estar vacío.'
  return ''
}

export const ageValidator = (age) => {
  if (!age) return 'La edad no puede estar vacía.'
  return ''
}
