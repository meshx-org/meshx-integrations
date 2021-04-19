import { slack } from './apis/slack'
import { twitter } from './apis/twitter'
import { instagram } from './apis/instagram'
import { facebook } from './apis/facebook'

import { getIntegrationNodes } from './nodes'
export * from './nodes'
export * from './call'

export const integrations = [slack, twitter, instagram, facebook]
export const integratonNodes = getIntegrationNodes(integrations)

declare module 'axios' {
    export interface AxiosRequestConfig {
        oauth1?: {
            oauth_consumer_key: string
            oauth_consumer_secret: string
            oauth_token?: string
            oauth_token_secret?: string
            // These are added
            oauth_nonce?: string
            oauth_timestamp?: number
            oauth_signature_method?: 'HMAC-SHA1'
            oauth_signature?: string
            oauth_callback?: string
            oauth_verifier?: string
            oauth_version?: '1.0'
        }
    }
}
