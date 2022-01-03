import React, {useCallback} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  icons: string[];
  name: string;
  url: string;
  description: string;
};

export const MetaData: React.VFC<Props> = ({icons, name, url, description}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  }, [url]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>App</Text>
      </View>

      <TouchableOpacity style={styles.innerContainer} onPress={handlePress}>
        <View style={styles.iconContainer}>
          <Image source={{uri: icons[0]}} style={styles.image} />
        </View>

        <View style={styles.textContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.appName}>
            {name}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.appDescription}>
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  innerContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  title: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (Dimensions.get('screen').width - 12 * 2) * 0.3,
  },
  textContainer: {
    width: (Dimensions.get('screen').width - 12 * 2) * 0.7,
  },
  appName: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appDescription: {
    color: 'rgba(0, 0, 0, 0.36)',
    fontSize: 14,
  },
  image: {
    width: 64,
    height: 64,
  },
});
