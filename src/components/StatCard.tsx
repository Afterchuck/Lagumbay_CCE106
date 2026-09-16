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
  card: { backgroundColor: '#eff6ff', borderLeftColor: '#1d4ed8', borderLeftWidth: 5, borderRadius: 12, padding: 16 },
  value: { fontSize: 28, fontWeight: '700' },
});
