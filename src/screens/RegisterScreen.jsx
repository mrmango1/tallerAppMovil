import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { Background, Logo, Header, Button, TextInput, BackButton } from '../components'
import { emailValidator, passwordValidator, nameValidator, lastNameValidator, ageValidator } from '../helpers/validators'
import { registerUser } from '../hooks/authApi'
import { _storeUser } from '../hooks/asynStorage'

export default function RegisterScreen ({ navigation }) {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const [name, setName] = useState({ value: '', error: '' })
  const [lastname, setLastname] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [age, setAge] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      })
    }
  }

  const onSignUpPressed = async () => {
    validateInputs()
    const userData = { name: name.value, lastname: lastname.value, email: email.value, age: age.value, password: password.value }
    const { error, message, user } = await registerUser(userData)
    if (error) {
      console.log(message, 'message')
    } else {
      console.log(user, 'user')
      await _storeUser(user)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }]
      })
    }
  }

  const validateInputs = () => {
    const nameError = nameValidator(name.value)
    const lastnameError = lastNameValidator(lastname.value)
    const emailError = emailValidator(email.value)
    const ageError = ageValidator(age.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError || lastnameError || ageError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setLastname({ ...lastname, error: lastnameError })
      setAge({ ...age, error: ageError })
    }
  }

  return (
    <Background>
      <BackButton goBack={() => goBack()} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Nombre"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Apellido"
        returnKeyType="next"
        value={lastname.value}
        onChangeText={(text) => setLastname({ value: text, error: '' })}
        error={!!lastname.error}
        errorText={lastname.error}
      />
      <TextInput
        label="Correo"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Edad"
        returnKeyType="next"
        value={age.value}
        onChangeText={(text) => setAge({ value: text, error: '' })}
        error={!!age.error}
        errorText={age.error}
      />
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Registrarse
      </Button>
      <View style={styles.row}>
        <Text>¿Ya tiene una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.link}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const makeStyles = (colors) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4
  },
  link: {
    fontWeight: 'bold',
    color: colors.primary
  }
})
