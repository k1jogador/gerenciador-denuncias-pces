import type { SignIn } from './dto/signIn';
import type { signUp } from './dto/signUp';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signIn: SignIn): Promise<any>;
    signUp(signUp: signUp): Promise<any>;
}
