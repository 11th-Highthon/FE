import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { Router } from './router';
import { initializeAuth } from './apis/instance';
import './main.css';

const queryClient = new QueryClient();

// 앱 시작시 인증 토큰 복원
initializeAuth();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Router />
  </QueryClientProvider>
);
