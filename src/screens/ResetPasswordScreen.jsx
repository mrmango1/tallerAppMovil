import React, { useState } from 'react'
import { Background, Logo, Header, Button, TextInput, BackButton } from '../components'
import { emailValidator } from '../helpers/emailValidator'

export default function ResetPasswordScreen ({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    navigation.navigate('Login')
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Recuperar Contraseña</Header>
      <TextInput
        label="Correo"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="Recibirá un correo con instrucciones para restablecer su contraseña."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Enviar Instrucciones
      </Button>
    </Background>
  )
}
