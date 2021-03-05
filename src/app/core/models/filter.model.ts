export interface ArticleHeadlineFilterModel {
    country?: string;
    category?: string;
    sources?: string;
    q?: string;
    pageSize?: number;
    page?: number;
}

export interface ArticleFilterModel {
    sources?: string;
    q?: string;
    pageSize?: number;
    page?: number;
}