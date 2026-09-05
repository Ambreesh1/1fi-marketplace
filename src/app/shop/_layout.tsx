import { Stack } from 'expo-router';

// This wraps everything under app/shop/ (the list + product detail) in a
// single navigation stack, so tapping a product pushes the detail screen
// with a proper header + back button, all within the "Shop" tab.
export default function ShopLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Shop', headerShown: false }} />
      <Stack.Screen name="product/[id]" options={{ headerShown: true }} />
    </Stack>
  );
}
