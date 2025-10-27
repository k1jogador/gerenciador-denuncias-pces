import type { SignIn } from './signIn';
import type { signUp } from './signUp';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signIn: SignIn): Promise<any>;
    signUp(signUp: signUp): Promise<any>;
}
