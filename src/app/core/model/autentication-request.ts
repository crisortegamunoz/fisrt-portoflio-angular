interface IAuthenticationRequest {
    username: string;
    password: string;
}

export class AuthenticationRequest implements IAuthenticationRequest {
    username: string;
    password: string;
}