import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ArticleSourceModel } from '../../models/article-source.model';
import { ArticleService } from '../../services/article.service';
import { GetArticleSourceListAction } from './article-source.actions';

export interface ArticleSourceStateModel {
  items: ArticleSourceModel[];
  status: string;
}



@State<ArticleSourceStateModel>({
  name: 'articleSource',
  defaults: {
    status: '',
    items: []
  }
})
@Injectable()
export class ArticleSourceState {

  constructor(private articleService: ArticleService) {

  }

  @Selector()
  static articleSources(state: ArticleSourceStateModel) {
    return state.items;
  }

  @Selector()
  static status(state: ArticleSourceStateModel) {
    return state.status;
  }
  @Action(GetArticleSourceListAction)
  async getListArticleSource(ctx: StateContext<ArticleSourceStateModel>) {
    ctx.patchState({
      status: 'loading'
    });
    try {
      const res = await this.articleService.getArticleSources().toPromise();
      ctx.patchState({
        status: 'success',
        items: res['sources']
      });
    } catch {
      ctx.patchState({
        status: 'error',
        items: []
      });
    }

  }
}
