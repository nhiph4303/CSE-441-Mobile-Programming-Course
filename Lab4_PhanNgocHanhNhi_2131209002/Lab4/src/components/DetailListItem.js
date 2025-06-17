import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';

const DetailListItem = ({ icon, title, subtitle }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} style={styles.left} />
      <View style={styles.right}>
        <Text style={styles.rightTitle}>{title}</Text>
        <Text style={styles.rightSubTitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    marginRight: -40,
    paddingVertical: 25,
  },
  right: {
    flex: 4,
    justifyContent: 'flex-start',
  },
  rightTitle: {
    fontSize: 16,
    fontWeight: 700,
  },
  rightSubTitle: {
    color: 'blue',
    paddingTop:5,
  },
});

export default DetailListItem;
