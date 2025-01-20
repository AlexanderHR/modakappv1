import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const dummyjsonApi = axios.create({
  baseURL: 'https://dummyjson.com',
});

const MAX_RETRIES = 1;
const RETRY_DELAY = 1000;

dummyjsonApi.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config;
    if (!config || config.retry >= MAX_RETRIES) {
      return Promise.reject(error);
    }

    config.retry = (config.retry || 0) + 1;

    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));

    console.log(`🔄 Retry ${config.retry}/${MAX_RETRIES}:`, config.url);

    return dummyjsonApi(config);
  }
);

dummyjsonApi.interceptors.request.use(
  config => {
    console.log('📡 REQUEST:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      params: config.params,
      data: config.data,
      timestamp: new Date().toISOString(),
    });
    return config;
  },
  error => {
    console.log('❌ REQUEST ERROR:', {
      error: error.message,
      timestamp: new Date().toISOString(),
    });
    return Promise.reject(error);
  }
);

dummyjsonApi.interceptors.response.use(
  response => {
    console.log('✅ RESPONSE:', {
      status: response.status,
      url: response.config.url,
      method: response.config.method?.toUpperCase(),
      timestamp: new Date().toISOString(),
      data: response.data,
    });
    return response;
  },
  error => {
    console.log('❌ RESPONSE ERROR:', {
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method?.toUpperCase(),
      timestamp: new Date().toISOString(),
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export const fetchWithCache = async (config: {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  params?: any;
  data?: any;
  ttl?: number;
  maxRetries?: number;
  retryDelay?: number;
}) => {
  const { url, method = 'get', params, data, ttl } = config;
  const cacheKey = `api-cache:${url}${JSON.stringify(params || {})}`;

  if (ttl) {
    try {
      const cached = await AsyncStorage.getItem(cacheKey);
      if (cached) {
        const { data: cachedData, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < ttl) {
          console.log('🎯 Cache HIT:', url);
          return cachedData;
        }
        await AsyncStorage.removeItem(cacheKey);
      }
    } catch (error) {
      console.log('❌ Cache ERROR:', error);
    }
  }

  const response = await dummyjsonApi.request({
    url,
    method,
    params,
    data,
  });

  if (ttl) {
    try {
      await AsyncStorage.setItem(
        cacheKey,
        JSON.stringify({
          data: response.data,
          timestamp: Date.now(),
        })
      );
      console.log('💾 Cache SAVE:', url);
    } catch (error) {
      console.log('❌ Cache SAVE ERROR:', error);
    }
  }

  return response.data;
};

export default dummyjsonApi;
