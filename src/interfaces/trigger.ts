import { IIntegrationMethod } from './call'

export interface ITrigger {
    id: string
    display: {
        label: string
        overloadLabel?: string
    }
    outputPortSchema?: any
    deduplicationKey: string | 'id'

    type: 'polling' | 'resthook'

    // For polling
    poll?: IIntegrationMethod<any[]>

    // For webhooks
    subscribe?: IIntegrationMethod<any[]>
    unsubscribe?: IIntegrationMethod<any[]>

    // Optional: add additional data to deduped entities
    transform?: IIntegrationMethod<any[]>
}
