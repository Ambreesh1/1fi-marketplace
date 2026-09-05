import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProductCard } from '@/components/marketplace/product-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { fetchProducts } from '@/api/marketplaceApi';
import { Product } from '@/data/mockProducts';

const TABS = [
  { key: 'topBrands', label: 'Top Brands' },
  { key: 'nearbyStores', label: 'Nearby Stores' },
  { key: 'marketplace', label: '1Fi Marketplace' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function ShopScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('marketplace');
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ThemedView style={{ flex: 1 }}>
        {/* Promo banner — same purple/indigo look as the rest of the Shop page */}
        <View style={[styles.banner, { backgroundColor: colors.primary }]}>
          <ThemedText type="smallBold" themeColor="text" style={styles.bannerBadge}>
            ✨ NO-COST EMIs
          </ThemedText>
          <ThemedText style={styles.bannerTitle}>
            Shop today,{'\n'}Pay later using{'\n'}Mutual funds.
          </ThemedText>
          <ThemedText type="small" style={styles.bannerSubtitle}>
            No credit score required. No interest.
          </ThemedText>
        </View>

        {/* 3-tab pill switcher */}
        <View style={[styles.tabBar, { backgroundColor: colors.primaryLight }]}>
          {TABS.map((tab) => {
            const active = tab.key === activeTab;
            return (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[
                  styles.tabPill,
                  active && { backgroundColor: colors.background },
                ]}>
                <ThemedText
                  type="smallBold"
                  themeColor={active ? 'primary' : 'textSecondary'}
                  numberOfLines={1}>
                  {tab.label}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>

        <View style={{ flex: 1 }}>
          {activeTab === 'topBrands' && <PlaceholderTab label="Top Brands" />}
          {activeTab === 'nearbyStores' && <PlaceholderTab label="Nearby Stores" />}
          {activeTab === 'marketplace' && <MarketplaceList />}
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

function PlaceholderTab({ label }: { label: string }) {
  return (
    <View style={styles.centered}>
      <ThemedText themeColor="textSecondary">{label} — coming soon</ThemedText>
    </View>
  );
}

function MarketplaceList() {
  const router = useRouter();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const data = await fetchProducts();
      setProducts(data);
      setStatus('success');
    } catch (err: any) {
      setErrorMessage(err.message ?? 'Something went wrong.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = products.filter((p) =>
    `${p.name} ${p.brand}`.toLowerCase().includes(query.toLowerCase())
  );

  if (status === 'loading') {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <ThemedText type="small" themeColor="textSecondary" style={{ marginTop: Spacing.two }}>
          Loading Marketplace...
        </ThemedText>
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={styles.centered}>
        <ThemedText>{errorMessage}</ThemedText>
        <Pressable
          onPress={load}
          style={[styles.retryButton, { backgroundColor: colors.primary }]}>
          <ThemedText type="smallBold" style={{ color: '#fff' }}>
            Retry
          </ThemedText>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Search products..."
          placeholderTextColor={colors.textSecondary}
          value={query}
          onChangeText={setQuery}
          style={[
            styles.searchInput,
            { borderColor: colors.border, color: colors.text, backgroundColor: colors.background },
          ]}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: Spacing.three, paddingBottom: Spacing.five }}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => router.push(`/shop/product/${item.id}`)} />
        )}
        ListEmptyComponent={
          <View style={styles.centered}>
            <ThemedText themeColor="textSecondary">No products match "{query}"</ThemedText>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    padding: Spacing.four,
    paddingBottom: Spacing.five,
  },
  bannerBadge: {
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.five,
    marginBottom: Spacing.three,
  },
  bannerTitle: { color: '#fff', fontSize: 26, fontWeight: '800', lineHeight: 32 },
  bannerSubtitle: { color: 'rgba(255,255,255,0.85)', marginTop: Spacing.two },
  tabBar: {
    flexDirection: 'row',
    borderRadius: Spacing.five,
    margin: Spacing.three,
    marginTop: -Spacing.four,
    padding: 4,
  },
  tabPill: {
    flex: 1,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    alignItems: 'center',
  },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.four },
  retryButton: {
    marginTop: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
  },
  searchWrapper: { paddingHorizontal: Spacing.three, paddingTop: Spacing.three },
  searchInput: {
    borderRadius: Spacing.five,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    borderWidth: 1,
    fontSize: 15,
  },
});
