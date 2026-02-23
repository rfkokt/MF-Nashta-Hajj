/// <reference types="vite/client" />

declare module 'authMfe/LoginPage' {
  const LoginPage: React.ComponentType;
  export default LoginPage;
}

declare module 'authMfe/RegisterPage' {
  const RegisterPage: React.ComponentType;
  export default RegisterPage;
}

declare module 'authMfe/routes' {
  import type { RouteObject } from 'react-router';
  export const authRoutes: RouteObject[];
}
