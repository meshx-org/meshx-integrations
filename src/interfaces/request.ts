import { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface IBeforeRequest {
    onFulfilled?: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
    onRejected?: (error: any) => any
}

export interface IAfterResponse {
    onFulfilled?: (value: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>
    onRejected?: (error: any) => any
}
