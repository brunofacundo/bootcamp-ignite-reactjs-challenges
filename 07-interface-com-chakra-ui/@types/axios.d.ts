import 'axios';

declare module 'axios' {
    export interface AxiosInstance {
        post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
        get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
        put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
        delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    }
}
