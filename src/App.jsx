import ThemeProvider from './theme';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
import { LocalizationProvider } from 'src/locales';
import MainLayout from 'src/layouts/main';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { AuthProvider } from './context/jwt';
import Router from 'src/routes/sections';
import 'src/global.css';
import ProgressBar from 'src/components/progress-bar';
import { CheckoutProvider } from 'src/sections/checkout/context';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
// i18n
import 'src/locales/i18n';


function App() {
  return (
    <AuthProvider>
      <LocalizationProvider>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'dark', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
            <SnackbarProvider>
              <CheckoutProvider>
                <SettingsDrawer />
                <ProgressBar />
                <Router />
              </CheckoutProvider>
              </SnackbarProvider>
            </MotionLazy>
            
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </AuthProvider>
  )
}

export default App
