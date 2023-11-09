export type AWSDataPoint = {
    timestamp: number,
    latitude: number,
    longitude: number,
    username: string,
    heartRate: number,
    workoutId: string
}

export type WorkoutData = {
    lineColor: string,
    dataToPlot: PlottableData[],
    workoutId: string,
    username: string
}

export type PlottableData = {
    latitude: number,
    longitude: number,
    heartRate: number,
    username: string
}

export type WorkoutCollection = {
    [key: string]: WorkoutData
}