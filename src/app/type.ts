export interface Housing {
    id?: number
    station?: string
    community?: string
    housing_name?: string
}

export interface Building {
    id?: number
    housing_id?: number
    building_number?: string
    floor?: number
    unit_home?: any
}
export interface People {
    id?: number
    name?: string
    pid?: string
    tel?: string
    gender?: number
    photo_url?: string
}

export enum TableName {
    housing = "housing",
    building = "building",
    people = "people"

}