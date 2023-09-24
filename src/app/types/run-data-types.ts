export type AWSDataPoint = {
    latitude: number,
    longitude: number,
    username: string,
    heartRate: number
}

export type UserData = {
    initialLatitude: number,
    initialLongitude: number,
    lineColor: string,
    dataToPlot: PlottableData[],
    username: string
}

export type PlottableData = {
    adjustedLatitude: number,
    adjustedLongitude: number,
    heartRate: number
}

export type UserDataCollection = {
    [key: string]: UserData
}