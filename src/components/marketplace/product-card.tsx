import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { Product } from '@/data/mockProducts';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  product: Product;
  onPress: () => void;
};

export function ProductCard({ product, onPress }: Props) {
  const theme = useTheme();
  const cheapestEmi = Math.min(...product.emiPlans.map((e) => e.monthlyAmount));

  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView type="backgroundElement" style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.image} contentFit="cover" />
        <View style={styles.info}>
          <ThemedText type="smallBold" numberOfLines={1}>
            {product.name}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={{ marginTop: 2 }}>
            {product.brand}
          </ThemedText>
          <View style={styles.priceRow}>
            <ThemedText type="smallBold">
              ₹{product.basePrice.toLocaleString('en-IN')}
            </ThemedText>
            <ThemedText type="small" themeColor="primary" style={styles.emiHint}>
              EMI from ₹{cheapestEmi.toLocaleString('en-IN')}/mo
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  card: {
    flexDirection: 'row',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    marginBottom: Spacing.three,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: Spacing.two,
  },
  info: {
    flex: 1,
    marginLeft: Spacing.three,
    justifyContent: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  emiHint: {
    fontWeight: '600' as const,
  },
});
