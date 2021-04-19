import { IIntegration } from '../interfaces/integration'

const INTEGRATION_NAME = 'slack@1.0.0'

// Auth move to config
const SLACK_OAUTH2_AUTH_URL = ''
const SLACK_OAUTH2_CLIENT_ID = ''
const SLACK_OAUTH2_CLIENT_SECRET = ''
const SLACK_OAUTH2_SCOPE = ''
const SLACK_OAUTH2_TOKEN_URL = ''

export const slack: IIntegration = {
    name: INTEGRATION_NAME,
    display: {
        label: 'Slack',
        async getConnectionName(x, args) {
            const { data } = await x.request({
                url: 'https://slack.com/api/users.info',
                params: {
                    token: args.token.access_token,
                    user: args.token.authed_user.id,
                },
            })

            return `${slack.display.label} @${data.user.name} (${args.token.team.name})`
        },
    },
    async testUrl(x, args) {
        const res = await x.request({
            method: 'POST',
            url: 'https://slack.com/api/auth.test',
            params: {
                token: args.auth.accessToken,
            },
        })

        return res.data
    },
    auth: {
        type: 'oauth2',
        oauth2: {
            authorizeUrl: {
                method: 'GET',
                url: SLACK_OAUTH2_AUTH_URL,
                params: {
                    client_id: SLACK_OAUTH2_CLIENT_ID,
                    state: {},
                    redirect_uri: 'http://localhost:3001/connections/token',
                    scope: SLACK_OAUTH2_SCOPE,
                    response_type: 'code',
                },
            },
            async getAccessToken(x, args) {
                const res = await x.request({
                    method: 'POST',
                    url: SLACK_OAUTH2_TOKEN_URL,
                    params: {
                        code: args.code,
                        client_id: SLACK_OAUTH2_CLIENT_ID,
                        client_secret: SLACK_OAUTH2_CLIENT_SECRET,
                        redirect_uri: 'http://localhost:3001/connections/token',
                        grant_type: 'authorization_code',
                    },
                })

                return res.data
            },
        },
    },
    triggers: [],
    actions: [],
    schema: {},
}
