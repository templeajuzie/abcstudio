import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function Page() {
  return (
    <>
<StatusBar barStyle="dark-content" backgroundColor={Platform.OS === 'ios' ? '#2c3e50' : '#2c3e50'} />
    <View style={styles.container}>
      <View style={styles.main}>
        <Link href="/home"> 
        
        <Text className="text-red-700 text-2xl">Home</Text>
        </Link>
        <Link href="/cart"> 
        
        <Text className="text-red-700 text-2xl">Cart</Text>
        </Link>
        <Link href="/auth/signup"> 
        
        <Text className="text-red-700 text-2xl">Auth</Text>
        </Link>
        <Link href="/news/12">
          <Text className="text-red-700 text-xl">Go to the news "[ID]" page</Text>
        </Link>
        <Link href="/news/type/12">
          <Text className="text-red-700 text-xl">Go to the  news type "[ID]" page</Text>
        </Link>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>

        
    
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
