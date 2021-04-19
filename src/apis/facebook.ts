import { IIntegration } from '../interfaces/integration'

const INTEGRATION_NAME = 'facebookPages@1.0'
const $schema = 'http://json-schema.org/draft/2019-09/schema#'

export const facebook: IIntegration = {
    name: INTEGRATION_NAME,
    display: {
        label: 'Facebook Pages',
        iconUrl: '/images/f_logo_RGB-Blue_100.png',
        getConnectionName: () => '',
    },
    testUrl: () => {
        return ''
    },
    auth: {
        type: 'system',
    },
    schema: {
        $schema,
        definitions: {},
    },
    actions: [
        {
            id: 'createPost',
            display: {
                label: 'Create Page Post',
                //overloadLabel: ''
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
