export type AuthStoreState = 'pending' | 'authenticated' | 'unauthenticated' | 'error';

export interface JWTResponse {
  data: string;
}
