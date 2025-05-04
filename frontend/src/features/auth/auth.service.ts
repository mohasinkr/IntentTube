export class AuthService {
  static async loginWithGoogle() {
    // TODO: Redirect to backend /auth/google endpoint
  }

  static async handleGoogleCallback(code: string) {
    // TODO: Exchange code for tokens via backend
  }

  static async refreshToken() {
    // TODO: Call backend to refresh token
  }

  static async logout() {
    // TODO: Call backend to logout and clear session
  }
} 