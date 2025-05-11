import { MonterosaSdkExperienceView } from '@monterosa-sdk/react-native';
import { useCallback, useRef } from 'react';
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PROJECT_ID = 'xxxx';
const EVENT_ID = 'xxx';

export default function HomeScreen() {
  const monterosaRef = useRef<any>(null);

  const onMessageReceived = useCallback(
    (e: any) => {
      const myEvent = e?.nativeEvent?.payload;
      if (myEvent.event === 'didChangeIntrinsicSize') {
        console.log('didChangeIntrinsicSize', myEvent.size.height);
      }
    },
    []
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MonterosaSdkExperienceView
          ref={monterosaRef}
          style={styles.container}
          onMessageReceived={onMessageReceived}
          // @ts-ignore
          configuration={{
            host: 'cdn.monterosa.cloud',
            hidesHeadersAndFooters: true,
            autoresizesHeight: true,
            projectId: PROJECT_ID,
            eventId: EVENT_ID,
            parameters: {
              lang: 'en',
            },
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
