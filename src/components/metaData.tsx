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
  label?: string;
  icons: string[];
  name: string;
  url: string;
  description: string;
  border?: boolean;
};

export const MetaData: React.VFC<Props> = ({
  label,
  icons,
  name,
  url,
  description,
  border,
}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  }, [url]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{label ?? 'App'}</Text>
      </View>

      <TouchableOpacity
        style={[styles.innerContainer, border && styles.border]}
        onPress={handlePress}>
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
  border: {
    paddingTop: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
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
    paddingTop: 6,
  },
  image: {
    width: 64,
    height: 64,
  },
});
