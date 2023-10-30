import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoScreen from './src/screen/TodoScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <TodoScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
});
