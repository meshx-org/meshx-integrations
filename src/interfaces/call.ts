import { AxiosInstance } from 'axios'

export interface IArgs {
    [key: string]: any
}

export interface IXObject {
    request: AxiosInstance
}

export interface IIntegrationMethod<T> {
    (x: IXObject, args: IArgs): T | Promise<T>
}

export interface IIntegrationCall {
    <T>(integrationFn: IIntegrationMethod<T>, args: IArgs): T | Promise<T>
}
