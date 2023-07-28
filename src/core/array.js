import { SettingsScreen, HistoryScreen, UserScreen } from '../screens'
import ProductNavigator from '../navigation/product-navigator'
import { Icons } from '../components/Icons'

export const ScreensArray = [
  { route: 'user', label: 'Perfil', type: Icons.Feather, icon: 'home', component: UserScreen, notification: 0, visible: false },
  { route: 'store', label: 'Tienda', type: Icons.Feather, icon: 'inbox', component: ProductNavigator, notification: 9, visible: true },
  { route: 'history', label: 'Historial', type: Icons.Feather, icon: 'calendar', component: HistoryScreen, notification: 4, visible: false },
  { route: 'settings', label: 'Configuración', type: Icons.Feather, icon: 'layers', component: SettingsScreen, notification: 0, visible: true }
]

export const ProfileMenu = [
  { label: 'Mi Perfil', icon: 'star', iconType: Icons.MaterialIcons },
  { label: 'Historial', icon: 'history', iconType: Icons.MaterialIcons },
  { label: 'Cerrar Sesión', icon: 'logout', iconType: Icons.MaterialIcons }
]
