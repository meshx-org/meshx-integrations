import { IIntegrationMethod } from './call'

export interface IAction {
    id: string
    display: {
        label: string
        overloadLabel?: string
    }
    inputPortsSchema?: any
    outputPortsSchema?: any
    action: IIntegrationMethod<Record<string, any>>
}
