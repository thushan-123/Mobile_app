import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'edexme',
  webDir: 'dist',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    CapacitorBrowser: {
      enabled: true,
    },
    WebView: {
      enabled: true,
    },
    Camera: {
      permissions: ['camera', 'microphone'],
    },
  },
  
};

export default config;
