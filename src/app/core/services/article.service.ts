import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_HOST, API_PATH } from 'src/app/shared/constants';
import { ArticleSourceModel } from '../models/article-source.model';
import { ArticleModel } from '../models/article.model';
import { ArticleFilterModel, ArticleHeadlineFilterModel } from '../models/filter.model';
import '@capacitor-community/http';

import { Plugins } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticleSources() {
    const { Http } = Plugins;

    return Http.request({
      method: 'GET',
      url: this.buildUrl(API_PATH.SOURCES),
      headers: this.buildHeaders()
    })
  }

  getArticleTopHeadlines(filters?: ArticleHeadlineFilterModel) {
    const { Http } = Plugins;

    return Http.request({
      method: 'GET',
      url: this.buildUrl(API_PATH.TOP_HEADLINES),
      headers: this.buildHeaders(),
      params: {
        ...(filters as any)
      }
    })
  }

  getArticleList(filters: ArticleFilterModel) {
    const { Http } = Plugins;

    return Http.request({
      method: 'GET',
      url: this.buildUrl(API_PATH.EVERYTHING),
      headers: this.buildHeaders(),
      params: {
        ...(filters as any)
      }
    })
  }

  private buildHeaders() {
    return {
      'X-Api-Key': 'b9583ce538434795b480ed47375d275d' //'b9583ce538434795b480ed47375d275d' ; 2e0829a3a8cc48e2bd12bc85a2477252
    }
  }
  private buildUrl(path: string) {
    return `${API_HOST}${path}`;
  }
}
