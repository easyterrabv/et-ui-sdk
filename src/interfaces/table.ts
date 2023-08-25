import { EtModel } from "../models/Model";

type filterSingles = string | number | boolean;
export type filter = filterSingles | filterSingles[] | IFiltering;
export type sortDirections = "ASC" | "DESC" | null;

export type DataGettingReturnType = [EtModel[], number];
export type DataGetterCallback = (
    criteria: ICriteria
) => Promise<DataGettingReturnType>;

export interface ISorting {
    [key: string]: sortDirections;
}

export interface IFiltering {
    [key: string]: filter;
}

export interface IPagination {
    limit?: number;
    offset?: number;
    page?: number;
    cursor?: number;
}

export interface IPaginationResponse {
    currentPage: number;
    lastPage: number;
    perPage: number;
    from: number;
    to: number;
    total: number;
}

export interface IPaginationRequest {
    page: IPagination | IPaginationResponse;
}

export interface ISortable {
    sorting?: ISorting;
}

export interface ICriteria extends ISortable, IPaginationRequest {
    filters?: IFiltering;
}
