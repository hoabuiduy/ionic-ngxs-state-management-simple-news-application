import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ArticleSourceModel } from '../../models/article-source.model';
import { ArticleService } from '../../services/article.service';
import { GetArticleSourceListAction } from './article-source.actions';

export interface ArticleSourceStateModel {
  items: ArticleSourceModel[];
  status: { code: string, message?: string };
}



@State<ArticleSourceStateModel>({
  name: 'articleSource',
  defaults: {
    status: {
      code: 'initial'
    },
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
      status: {
        code: 'loading'
      }
    });
    try {
      const res = await this.articleService.getArticleSources();
      const sources = res['data']['sources'];
      const code = res['data']['status'];
      if (code === 'error') {
        throw res['data']['message'];
      }
      ctx.patchState({
        status: {
          code: 'success'
        },
        items: sources
      });
    } catch (ex) {
      ctx.patchState({
        status: {
          code: 'error',
          message: ex
        },
        items: []
      });
    }

  }
}
