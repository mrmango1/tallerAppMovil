import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { Background, Logo, Header, Button, TextInput } from '../components'

export default function LoginScreen ({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }]
    })
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

const styles = StyleSheet.create({
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
    color: theme.colors.secondary
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary
  }
})
