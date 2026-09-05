import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { EmiPlan } from '@/data/mockProducts';

type Props = {
  plan: EmiPlan;
  selected: boolean;
  onPress: () => void;
};

export function EMIPlanCard({ plan, selected, onPress }: Props) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <View
        style={[
          styles.card,
          {
            borderColor: selected ? colors.primary : colors.border,
            backgroundColor: selected ? colors.primaryLight : colors.background,
          },
        ]}>
        <ThemedText type="smallBold" themeColor={selected ? 'primary' : 'text'}>
          {plan.tenureMonths} months
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" style={{ marginTop: 4 }}>
          ₹{plan.monthlyAmount.toLocaleString('en-IN')}/mo
        </ThemedText>
        <ThemedText type="small" themeColor="success" style={{ marginTop: 4, fontWeight: '600' }}>
          No-cost EMI
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  card: {
    minWidth: 120,
    borderWidth: 1.5,
    borderRadius: Spacing.three,
    padding: Spacing.three,
    marginRight: Spacing.two,
    alignItems: 'center',
  },
});
