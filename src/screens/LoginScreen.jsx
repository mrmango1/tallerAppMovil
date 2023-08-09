import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { emailValidator, passwordValidator } from '../helpers/validators'
import { Background, Logo, Header, TextInput, Button } from '../components'
import { loginUser } from '../hooks/authApi'
import { _storeUser } from '../hooks/asynStorage'

export default function LoginScreen ({ navigation }) {
  const { colors } = useTheme()
  const styles = makeStyles(colors)
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = async () => {
    validateInputs()
    const { error, message, user } = await loginUser({ email: email.value, password: password.value })
    if (error) {
      console.log(message)
    } else {
      await _storeUser(user)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }]
      })
    }
  }

  const validateInputs = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
    }
  }

  return (
    <Background>
      <Logo />
      <Header>Bienvenido</Header>
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
        label="Contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPassword')}
        >
          <Text style={styles.forgot}>¿Olvidó su contraseña?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Iniciar Sesión
      </Button>
      <View style={styles.row}>
        <Text>¿No tiene una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Regístrese</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const makeStyles = (colors) => StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24
  },
  row: {
    flexDirection: 'row',
    marginTop: 4
  },
  forgot: {
    fontSize: 13,
    color: colors.primary
  },
  link: {
    fontWeight: 'bold',
    color: colors.primary
  }
})
