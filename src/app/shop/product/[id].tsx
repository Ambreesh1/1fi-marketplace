import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EMIPlanCard } from '@/components/marketplace/emi-plan-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { fetchProductById, submitEmiSelection } from '@/api/marketplaceApi';
import { Product } from '@/data/mockProducts';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedEmiId, setSelectedEmiId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    setStatus('loading');
    fetchProductById(id)
      .then((data) => {
        if (!isMounted) return;
        setProduct(data);
        setSelectedVariantId(data.variants[0]?.id ?? null);
        setSelectedEmiId(data.emiPlans[0]?.id ?? null);
        setStatus('success');
      })
      .catch((err) => {
        if (!isMounted) return;
        setErrorMessage(err.message ?? 'Something went wrong.');
        setStatus('error');
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleProceed = async () => {
    if (!product || !selectedVariantId || !selectedEmiId) return;
    setSubmitting(true);
    try {
      const result = await submitEmiSelection({
        productId: product.id,
        variantId: selectedVariantId,
        emiPlanId: selectedEmiId,
      });
      Alert.alert('Order placed', `Reference ID: ${result.orderId}`);
    } catch (err: any) {
      Alert.alert('Could not proceed', err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'loading') {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </ThemedView>
    );
  }

  if (status === 'error' || !product) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText>{errorMessage || 'Product not found.'}</ThemedText>
        <Pressable onPress={() => router.back()} style={{ marginTop: Spacing.three }}>
          <ThemedText themeColor="primary" type="smallBold">
            Go back
          </ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId);
  const selectedEmi = product.emiPlans.find((e) => e.id === selectedEmiId);

  return (
    <ThemedView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: product.name, headerBackTitle: 'Shop' }} />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Image source={{ uri: product.image }} style={styles.heroImage} contentFit="cover" />

        <View style={styles.content}>
          <ThemedText type="small" themeColor="textSecondary">
            {product.brand}
          </ThemedText>
          <ThemedText type="subtitle" style={{ fontSize: 24, marginTop: 2 }}>
            {product.name}
          </ThemedText>
          <ThemedText type="smallBold" style={{ fontSize: 20, marginTop: Spacing.one }}>
            ₹{(selectedVariant?.price ?? product.basePrice).toLocaleString('en-IN')}
          </ThemedText>

          <ThemedText themeColor="textSecondary" style={{ marginTop: Spacing.three }}>
            {product.description}
          </ThemedText>

          <ThemedText type="smallBold" style={styles.sectionTitle}>
            Select variant
          </ThemedText>
          <View style={styles.variantRow}>
            {product.variants.map((v) => {
              const active = v.id === selectedVariantId;
              return (
                <Pressable
                  key={v.id}
                  onPress={() => setSelectedVariantId(v.id)}
                  style={[
                    styles.variantChip,
                    {
                      borderColor: active ? colors.primary : colors.border,
                      backgroundColor: active ? colors.primaryLight : colors.background,
                    },
                  ]}>
                  <ThemedText
                    type="small"
                    themeColor={active ? 'primary' : 'textSecondary'}
                    style={{ fontWeight: '600' }}>
                    {v.label}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>

          <ThemedText type="smallBold" style={styles.sectionTitle}>
            Choose EMI plan
          </ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {product.emiPlans.map((plan) => (
              <EMIPlanCard
                key={plan.id}
                plan={plan}
                selected={plan.id === selectedEmiId}
                onPress={() => setSelectedEmiId(plan.id)}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View style={[styles.ctaBar, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <View>
          <ThemedText type="small" themeColor="textSecondary">
            Selected plan
          </ThemedText>
          <ThemedText type="small">
            {selectedEmi
              ? `₹${selectedEmi.monthlyAmount.toLocaleString('en-IN')}/mo × ${selectedEmi.tenureMonths}m`
              : '—'}
          </ThemedText>
        </View>
        <Pressable
          onPress={handleProceed}
          disabled={submitting}
          style={[styles.ctaButton, { backgroundColor: colors.primary, opacity: submitting ? 0.6 : 1 }]}>
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText type="smallBold" style={{ color: '#fff' }}>
              Proceed with EMI
            </ThemedText>
          )}
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.four },
  heroImage: { width: '100%', height: 280 },
  content: { padding: Spacing.four },
  sectionTitle: { marginTop: Spacing.four, marginBottom: Spacing.two },
  variantRow: { flexDirection: 'row', flexWrap: 'wrap' },
  variantChip: {
    borderWidth: 1.5,
    borderRadius: Spacing.five,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    marginRight: Spacing.two,
    marginBottom: Spacing.two,
  },
  ctaBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.three,
    borderTopWidth: 1,
  },
  ctaButton: {
    borderRadius: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    minWidth: 170,
    alignItems: 'center',
  },
});
