import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_HOST, API_PATH } from 'src/app/shared/constants';
import { ArticleFilterModel, ArticleHeadlineFilterModel } from '../models/filter.model';
import '@capacitor-community/http';

import { Plugins } from '@capacitor/core';
const { Http } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor() { }

  getArticleSources() {

    return Http.request({
      method: 'GET',
      url: this.buildUrl(API_PATH.SOURCES),
      headers: this.buildHeaders()
    })
  }

  getArticleTopHeadlines(filters?: ArticleHeadlineFilterModel) {
    const params = this.buildParams(filters);
    return Http.request({
      method: 'GET',
      url: this.buildUrl(API_PATH.TOP_HEADLINES),
      headers: this.buildHeaders(),
      params
    })
  }

  getArticleList(filters: ArticleFilterModel) {
    const params = this.buildParams(filters);
    delete params['keyword'];
    return Http.request({
      method: 'GET',
      url: this.buildUrl(API_PATH.EVERYTHING),
      headers: this.buildHeaders(),
      params
    })
  }

  private buildHeaders() {
    return {
      'X-Api-Key': '32a56f101b17410c9539c2edb01d28ab' //'b9583ce538434795b480ed47375d275d' ; 2e0829a3a8cc48e2bd12bc85a2477252 ; 32a56f101b17410c9539c2edb01d28ab
    }
  }
  private buildUrl(path: string) {
    return `${API_HOST}${path}`;
  }

  private buildParams(filters: any) {
    const p = new HttpParams({
      fromObject: filters as any
    });
    const params = {};
    p.keys().map(k => {
      params[k] = p.get(k).toString();
    })

    return params;

  }
}
