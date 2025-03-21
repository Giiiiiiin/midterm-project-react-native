import { SafeAreaView } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { styles } from './src/styles/globalStyles';
import { GlobalProvider } from './src/context/globalContext';
import FlashMessage from "react-native-flash-message";
import Header from './src/components/Header';
import Footer from './src/components/Footer';

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <GlobalProvider>
          <AppNavigator />
          <Footer />
        </GlobalProvider>
      </SafeAreaView>
      <FlashMessage position="bottom" />
    </>
  );
}
