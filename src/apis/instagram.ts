import { IIntegration } from '../interfaces/integration'

const INTEGRATION_NAME = 'instagram@1.0'
const $schema = 'http://json-schema.org/draft/2019-09/schema#'

export const instagram: IIntegration = {
    name: INTEGRATION_NAME,
    display: {
        label: 'Instagram',
        iconUrl: '/images/600px-Instagram_icon.png',
        getConnectionName: () => 'Insta',
    },
    auth: {
        type: 'system',
    },
    testUrl: async () => {
        return ''
    },
    schema: {
        $schema,
        definitions: {},
    },
    actions: [
        {
            id: 'publishPhoto',
            display: {
                label: 'Publish Photo',
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
                    status: {
                        title: 'Status Text',
                        type: 'string',
                    },
                },
            },
            async action() {
                console.log('TODO')
            },
        },
    ],
    triggers: [],
}
