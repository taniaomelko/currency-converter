import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 600000, // 600 seconds (10 minute)
      staleTime: 300000, // 300 seconds (5 minutes)
    },
  },
});

export default queryClient;
