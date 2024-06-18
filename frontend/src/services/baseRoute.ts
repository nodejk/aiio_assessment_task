import { EnvironmentProvider } from '../core/environment';


export const baseServerRoute: string = `${EnvironmentProvider.BASE_SERVER_URL}` as const;

// export const baseServerRoute: string = 'http://0.0.0.0:8000/api' as const;
