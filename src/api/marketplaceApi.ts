// src/api/marketplaceApi.ts
// Thin data-access layer. Screens call these functions, never mockProducts
// directly. Swapping to a real backend later = editing only this file.

import { mockProducts, Product } from '@/data/mockProducts';

const NETWORK_DELAY_MS = 600;
const SIMULATE_RANDOM_ERRORS = false; // flip true locally to test error states

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchProducts(): Promise<Product[]> {
  await delay(NETWORK_DELAY_MS);

  if (SIMULATE_RANDOM_ERRORS && Math.random() < 0.15) {
    throw new Error('Unable to load Marketplace products. Please try again.');
  }

  return mockProducts;
}

export async function fetchProductById(productId: string): Promise<Product> {
  await delay(NETWORK_DELAY_MS);

  const product = mockProducts.find((p) => p.id === productId);
  if (!product) {
    throw new Error('Product not found.');
  }
  return product;
}

export async function submitEmiSelection(params: {
  productId: string;
  variantId: string;
  emiPlanId: string;
}) {
  await delay(NETWORK_DELAY_MS);

  const { productId, variantId, emiPlanId } = params;
  if (!productId || !variantId || !emiPlanId) {
    throw new Error('Please select a variant and EMI plan before proceeding.');
  }

  return {
    success: true,
    orderId: `ORD-${Date.now()}`,
    productId,
    variantId,
    emiPlanId,
  };
}
