import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';

import {Provider} from 'react-redux'
import { persistore, store } from '@/store/initStore';
import { PersistGate } from 'redux-persist/integration/react';

export default function RootLayout() {
  const colorScheme = useColorScheme();


  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    IbmItalics:require('../assets/fonts/IBMPlexSansItalicFont.ttf'),
    IbmSans:require('../assets/fonts/IBMPlexSansVariableFont.ttf'),
     IbmMonoBold:require('../assets/fonts/IBMPlexMonoBold.ttf'),
    IBMPlexMonoItalic:require('../assets/fonts/IBMPlexMonoItalic.ttf'),
    ['IBMPlexSans-Bold']:require('../assets/fonts/IBMPlexSans-Bold.ttf'),
    ['IBMPlexMono-BoldItalic']:require('../assets/fonts/IBMPlexMono-BoldItalic.ttf'),
    ['SFProText-Regular']:require('../assets/fonts/SFProText-Regular.ttf')
   
    
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }



 

  return (

  
    <Provider store={store} >

      <PersistGate persistor={persistore}>

        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar hidden />
     
     <SafeAreaView style={{flex:1,backgroundColor:colorScheme === 'dark'?'#151718':'transparent'}}>
      
       <Stack >
        <Stack.Screen name="(home)" options={{ headerShown: false,
         
         }} />
        <Stack.Screen name="+not-found" />
      </Stack>

     </SafeAreaView>
      
    </ThemeProvider>

      </PersistGate>

    </Provider>
  );
}
