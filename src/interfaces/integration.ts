import { IAction } from './action'
import { IAuthConfig } from './auth'
import { IIntegrationMethod } from './call'
import { IAfterResponse, IBeforeRequest } from './request'
import { ITrigger } from './trigger'

/**
 * Interface used to define an external integration
 */
export interface IIntegration {
    name: string

    display: {
        label: string
        iconUrl?: string
        getConnectionName: IIntegrationMethod<string>
    }

    auth: IAuthConfig
    schema: any
    triggers: ITrigger[]
    actions: IAction[]

    testUrl: IIntegrationMethod<any>

    /* Request intercaptors */
    beforeRequest?: IBeforeRequest[]
    afterResponse?: IAfterResponse[]
}
