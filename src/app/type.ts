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
    pb_id?: number
    is_host?: number
    is_resident?: number
}

export interface People_building {
    id?: number
    people_id?: number
    building_id?: number
    room_number?: string
    is_host?: number
    is_resident?: number
    insert_time?: string
}

export interface Room_status {
    id?: number
    building_id?: number
    room_number?: string
    result?: number
    result_message?: string
    type?: string
    insert_time?: string

}

export enum TableName {
    housing = "housing",
    building = "building",
    people = "people",
    people_building = "people_building"

}