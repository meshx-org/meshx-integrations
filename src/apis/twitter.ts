import { IIntegration } from '../interfaces/integration'

import qs from 'qs'

const INTEGRATION_NAME = 'twitter@2.0'
const $schema = 'http://json-schema.org/draft/2019-09/schema#'

const baseUrl = 'https://api.twitter.com'
const TWITTER_OAUTH1_AUTH_URL = `${baseUrl}/oauth/authorize`
const TWITTER_OAUTH1_REQUEST_TOKEN_URL = `${baseUrl}/oauth/request_token`
const TWITTER_OAUTH1_ACCESS_TOKEN_URL = `${baseUrl}/oauth/access_token`

const TWITTER_OAUTH1_CONSUMER_KEY = `123`
const TWITTER_OAUTH1_CONSUMER_SECRET = `123`

export const twitter: IIntegration = {
    name: INTEGRATION_NAME,
    display: {
        label: 'Twitter',
        iconUrl: '/images/Twitter_Logo_Blue.png',
        getConnectionName: (x, args) => {
            console.log(args)
            return `${twitter.display.label} - ${args.auth.screen_name}`
        },
    },
    testUrl: async (x, args) => {
        return ''
    },
    auth: {
        type: 'oauth1',
        oauth1: {
            authorizeUrl: {
                method: 'GET',
                url: TWITTER_OAUTH1_AUTH_URL,
                params: {},
            },
            async getAccessToken(x, args) {
                const response = await x.request({
                    url: TWITTER_OAUTH1_ACCESS_TOKEN_URL,
                    method: 'POST',
                    oauth1: {
                        oauth_consumer_key: TWITTER_OAUTH1_CONSUMER_KEY,
                        oauth_consumer_secret: TWITTER_OAUTH1_CONSUMER_SECRET,
                        oauth_token: args.oauth_token,
                        oauth_token_secret: args.oauth_token_secret,
                        oauth_verifier: args.oauth_verifier,
                        oauth_signature_method: 'HMAC-SHA1',
                    },
                })

                return qs.parse(response.data) as any
            },
            async getRequestToken(x, args) {
                const response = await x.request({
                    url: TWITTER_OAUTH1_REQUEST_TOKEN_URL,
                    method: 'POST',
                    oauth1: {
                        oauth_consumer_key: TWITTER_OAUTH1_CONSUMER_KEY,
                        oauth_consumer_secret: TWITTER_OAUTH1_CONSUMER_SECRET,
                        oauth_signature_method: 'HMAC-SHA1',
                        oauth_callback: args.oauth_callback,
                        oauth_version: '1.0', // Twitter says this should be 1.0
                    },
                })

                return qs.parse(response.data) as any
            },
        },
    },
    schema: {
        $schema,
        definitions: {},
    },
    actions: [
        {
            id: 'createTweet',
            display: {
                label: 'Post New Tweet',
            },
            inputPortsSchema: {
                type: 'object',
                properties: {
                    status: {
                        title: 'Status Text',
                        type: 'string',
                    },
                },
            },
            outputPortsSchema: {
                type: 'object',
                properties: {
                    tweet: {
                        title: 'Tweet Object',
                        type: 'object',
                    },
                },
            },
            async action(x, args) {
                console.log(x)

                const res = await x.request({
                    url: `${baseUrl}/1.1/statuses/update.json`,
                    method: 'POST',
                    oauth1: {
                        // TODO: add these to the interceptor
                        oauth_consumer_key: TWITTER_OAUTH1_CONSUMER_KEY,
                        oauth_consumer_secret: TWITTER_OAUTH1_CONSUMER_SECRET,
                        oauth_token: args.auth.oauth_token,
                        oauth_token_secret: args.auth.oauth_token_secret,
                    },
                    params: {
                        status: args.inputs.status.data,
                        trim_user: true,
                    },
                })

                return {
                    tweet: res.data,
                }
            },
        },
    ],
    triggers: [
        /*{
            id: 'new_mention',
            type: 'resthook',
            display: {
                label: 'New @mention',
            },
            deduplicationKey: '',
            outputPortSchema: {
                type: 'object',
                properties: {
                    outNum: { type: 'string' },
                },
            },
            subscribe: async (x, args) => [],
            unsubscribe: async (x, args) => [],
            transform: async (x, args) => [],
        },*/
    ],
}
