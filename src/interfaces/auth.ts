import { AxiosRequestConfig } from 'axios'
import { IIntegrationMethod } from './call'

interface IOAath2GetAccessToken {
    access_token: string
    refresh_token: string
}

interface IOAath2RefreshToken {
    access_token: string
}

interface IOAuth1GetAccessToken {
    oauth_token: string
    oauth_token_secret: string
}

interface IOAuth1GetRequestToken {
    oauth_token: string
    oauth_token_secret: string
    oauth_verifier: string
}

export interface IOauth2Config {
    authorizeUrl: AxiosRequestConfig
    getAccessToken: IIntegrationMethod<IOAath2GetAccessToken>
    refreshToken?: IIntegrationMethod<IOAath2RefreshToken>
}

export interface IOAuth1Config {
    authorizeUrl: AxiosRequestConfig
    getRequestToken: IIntegrationMethod<IOAuth1GetRequestToken>
    getAccessToken?: IIntegrationMethod<IOAuth1GetAccessToken>
}

export interface IAuthConfig {
    type: 'oauth2' | 'oauth1' | 'system'
    oauth2?: IOauth2Config
    oauth1?: IOAuth1Config
    //apiKey?: IApiKeySettings
}
