import { base44 } from './base44Client';

export const fetchMarketPrices = base44.functions.fetchMarketPrices;

export const fetchCurrentUser = async () => {
  return base44.auth.me();
};

export const updateCurrentUser = async (data) => {
  return base44.auth.updateMe(data);
};

export const fetchPortfolioSnapshot = async (payload) => {
  return base44.functions.invoke('getPortfolioSnapshot', payload);
};

export const fetchWalletBalances = async (payload) => {
  return base44.functions.invoke('getWalletBalances', payload);
};

export const createWalletTransaction = async (payload) => {
  return base44.functions.invoke('createWalletTransaction', payload);
};

export const fetchReferralStats = async (payload) => {
  return base44.functions.invoke('getReferralStats', payload);
};

export const fetchSubscriptionPlans = async (payload) => {
  return base44.functions.invoke('getSubscriptionPlans', payload);
};
