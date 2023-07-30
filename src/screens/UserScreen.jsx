import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar, Card, IconButton, useTheme } from 'react-native-paper'
import { Header, Background } from '../components'
import Icon, { Icons } from '../components/Icons'

const LeftContent = props => <Avatar.Icon {...props} icon="account" />
const RightContent = props => <IconButton {...props} icon="chevron-right" onPress={() => console.log('Pressed')} />

const headerButtonList = [
  {
    icon: 'heart-outline',
    label: 'Favoritos'
  },
  {
    icon: 'star-outline',
    label: 'Favoritos'
  },
  {
    icon: 'history',
    label: 'Favoritos'
  },
  {
    icon: 'ticket-percent-outline',
    label: 'Favoritos'
  }
]

const pedidosButtonList = [
  {
    icon: 'wallet',
    label: 'Pendientes de Pago'
  },
  {
    icon: 'wallet-giftcard',
    label: 'Pendientes de Envio'
  },
  {
    icon: 'truck-check',
    label: 'Enviados'
  },
  {
    icon: 'basket-check',
    label: 'Pendiente de Valoracion'
  }
]

const monederoButtonList = [
  {
    icon: 'cash-100',
    label: 'Consigue 20$'
  },
  {
    icon: 'credit-card-multiple',
    label: 'Tarjetas'
  },
  {
    icon: 'gift',
    label: 'Bonus de grupo'
  },
  {
    icon: 'party-popper',
    label: 'Promoción'
  }
]

const IconLabel = ({ icon, label, props }) => {
  const { colors } = useTheme()
  return (
    <TouchableOpacity style={styles.iconLabel}>
      <Icon type={Icons.MaterialCommunityIcons}
            name={icon}
            size={40}
            color={colors.primary}
            onPress={() => console.log('Pressed')}
            {...props}/>
      <Text style={styles.iconLabelText}>{label}</Text>
    </TouchableOpacity>
  )
}

const PerfilHeader = () => {
  return (
    <Card style={[styles.card, styles.transparent]} mode='contained'>
    <Card.Title titleStyle={styles.cardTitle} title='Anderson Grefa' subtitle='Admin' left={LeftContent} />
    <Card.Content>
      <View style={styles.rowAlign}>
      {headerButtonList.map((item, index) => (
        <IconButton
        style={styles.buttonIcon}
          key={index}
          icon={item.icon}
          size={30}
          onPress={() => console.log('Pressed')}
        />
      ))}
      </View>
    </Card.Content>
  </Card>
  )
}

const PedidosCard = () => {
  return (
    <Card style={styles.card}>
      <Card.Title titleStyle={styles.cardTitle} title='Pedidos' right={RightContent} />
      <Card.Content>
      <View style={styles.rowAlign}>
      {pedidosButtonList.map((item, index) => (
        <IconLabel
          mode='contained-tonal'
          style={styles.buttonIcon}
          key={index}
          icon={item.icon}
          label={item.label}
          onPress={() => console.log('Pressed')}
        />
      ))}
      </View>
    </Card.Content>
      <Card.Actions>
        <TouchableOpacity style={styles.footerCard} onPress={() => console.log('Pressed')}>
          <View style={styles.rowAlign}>
            <Icon style={{ marginRight: 10 }} name="cash-multiple" type={Icons.MaterialCommunityIcons} />
            <Text>Disputa abierta</Text>
          </View>
          <IconButton icon="chevron-right" onPress={() => console.log('Pressed')} />
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  )
}

const MonederoCard = () => {
  return (
    <Card style={styles.card}>
      <Card.Title titleStyle={styles.cardTitle} title='Monedero' right={RightContent} />
      <Card.Content>
      <View style={styles.rowAlign}>
      {monederoButtonList.map((item, index) => (
        <IconLabel
          mode='contained-tonal'
          style={styles.buttonIcon}
          key={index}
          icon={item.icon}
          label={item.label}
          onPress={() => console.log('Pressed')}
        />
      ))}
      </View>
    </Card.Content>
    </Card>
  )
}

const HomeScreen = () => {
  return (
    <Background>
      <Header>Perfil</Header>
      <View style={{ height: 10 }}/>
      <PerfilHeader />
      <View style={{ height: 10 }}/>
      <PedidosCard />
      <View style={{ height: 20 }}/>
      <Card style={styles.cardCover}>
        <Card.Cover style={{ height: 100 }} source={{ uri: 'https://cdn2.hubspot.net/hubfs/3815039/Imagen_Blog_BIT_1600x478px_240119.jpg' }} />
      </Card>
      <View style={{ height: 20 }}/>
      <MonederoCard />
    </Background>
  )
}

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  card: {
    width: '110%'
  },
  cardCover: {
    width: '110%',
    height: 100
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  transparent: {
    backgroundColor: 'transparent'
  },
  buttonIcon: {
    flex: 1
  },
  footerCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listContainer: {
    flexGrow: 1,
    padding: 20,
    width: '130%'
  },
  iconLabel: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconLabelText: {
    fontSize: 11
  }
})

export default HomeScreen
