import jwt from 'jsonwebtoken'

export interface AuthConfig {
  jwtSecret: string
  jwtOptions: jwt.SignOptions
  adapter: AuthUserAdapter
}

export interface AuthUser {
  id: string
  email: string
}

export interface AuthUserAdapter {
  find(id: string): Promise<any>

  upsert(id: string, payload: any): Promise<any>

  destroy(id: string): Promise<void>
}

export class Auth {
  constructor(private config: AuthConfig) {}

  private generateJwtToken({ userId }: { userId: string }): string {
    return jwt.sign({ userId }, this.config.jwtSecret, this.config.jwtOptions)
  }

  private verifyJwtToken({ token }: { token: string }) {
    return jwt.verify(token, this.config.jwtSecret)
  }
}
