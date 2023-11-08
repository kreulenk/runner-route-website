export type AWSDataPoint = {
    latitude: number,
    longitude: number,
    username: string,
    heartRate: number
}

export type UserData = {
    lineColor: string,
    dataToPlot: PlottableData[],
    username: string
}

export type PlottableData = {
    latitude: number,
    longitude: number,
    heartRate: number
}

export type UserDataCollection = {
    [key: string]: UserData
}