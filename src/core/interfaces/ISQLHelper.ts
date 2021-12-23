export interface ISQLHelper {
    callFunction(name: string, args: any[]): Promise<any[]>
    callProcedureWithOutput(name: string, args: any[]): Promise<any[]>
    callProcedure(name: string, args: any[]): Promise<void>
}