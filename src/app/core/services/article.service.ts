import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from 'src/app/shared/constants';
import { ArticleSourceModel } from '../models/article-source.model';
import { ArticleModel } from '../models/article.model';
import { ArticleFilterModel } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticleSources() {
    return this.http.get<ArticleSourceModel[]>(API_PATH.SOURCES);
  }

  getArticleTopHeadlines(filters?: ArticleFilterModel) {
    const params = new HttpParams({
      fromObject: filters as any
    });

    return this.http.get<ArticleModel[]>(`${API_PATH.TOP_HEADLINES}`, {
      params
    });
  }

  getArticleList(filters: ArticleFilterModel) {
    const params = new HttpParams({
      fromObject: filters as any
    });
    return this.http.get<ArticleModel[]>(`${API_PATH.EVERYTHING}`, {
      params
    });
  }
}
