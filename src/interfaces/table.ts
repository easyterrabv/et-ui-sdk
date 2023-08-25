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

export interface ISortable {
    sorting?: ISorting;
    limit?: number;
    offset?: number;
    page?: number;
    cursor?: number;
}

export interface ICriteria extends ISortable {
    filters?: IFiltering;
}

export interface IPagination {
    currentPage: number;
    lastPage: number;
    perPage: number;
    from: number;
    to: number;
    total: number;
}
