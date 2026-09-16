import { type StyleProp, StyleSheet, Text, type ViewStyle, View } from 'react-native';

type StatCardProps = {
  label: string;
  value: string | number;
  style?: StyleProp<ViewStyle>;
};

export function StatCard({ label, value, style }: StatCardProps) {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.value}>{value}</Text>
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#dbeafe',
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
  },
  value: { color: '#1d4ed8', fontSize: 28, fontWeight: '800', marginBottom: 4 },
});
