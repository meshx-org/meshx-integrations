import { IArgs, IIntegrationCall, IIntegrationMethod, IXObject } from './interfaces/call'
import { IIntegration } from './interfaces/integration'
import { createHmac, randomBytes } from 'crypto'
import OAuth from 'oauth-1.0a'
import axios from 'axios'

export const useIntegrationCall = (integration: IIntegration): IIntegrationCall => {
    const request = axios.create({
        timeout: 2000,
    })

    // OAuth 1 signer interceptor
    request.interceptors.request.use((request) => {
        if (!!request.oauth1) {
            const random = randomBytes(20)
            const oauth_nonce = random.toString('base64')
            const oauth_timestamp = String(Math.floor(Date.now() * 0.001))
            const { oauth_consumer_key, oauth_consumer_secret, oauth_token, oauth_token_secret } = request.oauth1

            const data = {
                ...request.oauth1,
                ...request.params,
                oauth_timestamp,
                oauth_nonce,
                oauth_signature_method: 'HMAC-SHA1',
            }

            // Setup OAuth 1.0a
            const oauth = new OAuth({
                consumer: {
                    key: oauth_consumer_key,
                    secret: oauth_consumer_secret,
                },
                signature_method: 'HMAC-SHA1',
                hash_function(base_string, key) {
                    return createHmac('sha1', key).update(base_string).digest('base64')
                },
            })

            // Sign the request
            const signedData = oauth.authorize(
                {
                    url: request.url,
                    method: request.method,
                    data,
                },
                oauth_token_secret && { key: oauth_token, secret: oauth_token_secret }
            )

            const signedHeader = oauth.toHeader(signedData)

            request.headers.common = {
                ...request.headers.common,
                ...signedHeader,
            }
        }

        return request
    })

    if (integration.beforeRequest && integration.beforeRequest.length !== 0) {
        integration.beforeRequest.forEach(({ onFulfilled, onRejected }) => {
            request.interceptors.request.use(onFulfilled, onRejected)
        })
    }

    if (integration.afterResponse && integration.afterResponse.length !== 0) {
        integration.afterResponse.forEach(({ onFulfilled, onRejected }) => {
            request.interceptors.request.use(onFulfilled, onRejected)
        })
    }

    const xObject: IXObject = {
        request,
    }

    return async (integrationFn: IIntegrationMethod<any>, args: IArgs) => {
        const configOrResult = await integrationFn(xObject, args)
        return configOrResult
    }
}
