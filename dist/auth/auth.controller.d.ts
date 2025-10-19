import type { SignIn } from './signIn';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signIn: SignIn): Promise<any>;
}
