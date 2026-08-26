import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#c4dce3', dark: '#1e2224' }}
      headerImage={
        <Image
          source={require('@/assets/images/subscribe.jpg')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.contentBackground}>  
        <View style={styles.titleContainer}>
          <ThemedText type="subtitle" style={{color: '#fff'}}>
            App Title: "Subscriptions Reminder"
          </ThemedText>
        </View>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Student Name:{' '}
            <ThemedText type='default' style={{fontWeight: 'bold', fontSize: 19}}>
              Johnrie O. Lagumbay
            </ThemedText>
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          {/* <Link href="/modal">
            <Link.Trigger>
              <ThemedText type="subtitle">Step 2: Explore</ThemedText>
            </Link.Trigger>
            <Link.Preview />
            <Link.Menu>
              <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
              <Link.MenuAction
                title="Share"
                icon="square.and.arrow.up"
                onPress={() => alert('Share pressed')}
              />
              <Link.Menu title="More" icon="ellipsis">
                <Link.MenuAction
                  title="Delete"
                  icon="trash"
                  destructive
                  onPress={() => alert('Delete pressed')}
                />
              </Link.Menu>
            </Link.Menu>
          </Link> */}
          <ThemedText type='subtitle'>
            Course: {' '}
            <ThemedText type='default' style={{fontWeight: 'bold', fontSize: 19}}>
              BSIT 3rd Year
            </ThemedText>
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          {/* <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            {`When you're ready, run `}
            <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
            <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          </ThemedText> */}
          <ThemedText type='subtitle'>
            Short App Idea:{' '}
            <ThemedText>
              Warns and rings the phone before the day of the monthly fee (e.g. Netflix, Spotify, etc.).
            </ThemedText>
          </ThemedText>
        </ThemedView>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: { //title
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    borderRadius: 8,
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8,
    marginBottom: 8,
  },
  contentBackground: { //background sa steps
    backgroundColor: '#d82424',
    padding: 8,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  stepContainer: { //steps
    gap: 8,
    marginBottom: 8,
    borderColor: '#37c0d2',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
  },
  reactLogo: { //picture sa babaw
    height: 250,
    width: 400,
    bottom: 0,
    left: 0,
    
  },
});
