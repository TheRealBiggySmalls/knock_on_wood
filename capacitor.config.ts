
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.90a656ef77364081a8407ec57eec7af3',
  appName: 'iphone-native-guide',
  webDir: 'dist',
  server: {
    url: 'https://90a656ef-7736-4081-a840-7ec57eec7af3.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;
