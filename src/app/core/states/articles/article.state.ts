import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ArticleModel } from '../../models/article.model';
import { ArticleFilterModel } from '../../models/filter.model';
import { ArticleService } from '../../services/article.service';
import { GetArticleListAction } from './article.actions';



export interface ArticleStateModel {
  items: ArticleModel[];
  status: string;
  filters: ArticleFilterModel;
}

@State<ArticleStateModel>({
  name: 'news',
  defaults: {
    status: '',
    items: [],
    filters: {
      q: '*',
      page: 1,
      pageSize: 10
    }
  }
})
@Injectable()
export class ArticleState {

  constructor(private newsService: ArticleService) {

  }



  @Selector()
  static listArticle(state: ArticleStateModel) {
    return state.items;
  }


  @Action(GetArticleListAction)
  async getArticleListAction(ctx: StateContext<ArticleStateModel>, action: GetArticleListAction) {
    const state = ctx.getState();
    ctx.patchState({
      status: 'loading'
    });
    try {
      const res = await this.newsService.getArticleList({
        ...state.filters,
        ...action.filters
      }).toPromise();
      ctx.patchState({
        status: 'success',
        items: res['articles']
      })
    } catch {
      ctx.patchState({
        status: 'error',
        items: []
      })
    }
  }
}
