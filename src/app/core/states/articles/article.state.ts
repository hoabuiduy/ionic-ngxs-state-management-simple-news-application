import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, Select } from '@ngxs/store';
import { append, patch } from '@ngxs/store/operators';
import { PAGE_SIZE } from 'src/app/shared/constants';
import { ArticleSourceModel } from '../../models/article-source.model';
import { ArticleModel } from '../../models/article.model';
import { ArticleFilterModel } from '../../models/filter.model';
import { ArticleService } from '../../services/article.service';
import { GetArticleListAction, LoadMoreArticleListAction, SetArticleSourceAction } from './article.actions';

export interface ArticleStateModel {
  items: ArticleModel[];
  status: { code: string, message?: string };
  filters: ArticleFilterModel;
  source?: ArticleSourceModel;
}

@State<ArticleStateModel>({
  name: 'news',
  defaults: {
    status: {
      code: '',
      message: ''
    },
    items: [],
    filters: {
      q: '*',
      page: 1,
      pageSize: PAGE_SIZE
    },
    source: null
  }
})
@Injectable()
export class ArticleState {

  constructor(private newsService: ArticleService) {

  }


  @Selector()
  static source(state: ArticleStateModel) {
    return state.source;
  }

  @Selector()
  static listArticle(state: ArticleStateModel) {
    return state.items;
  }

  @Selector()
  static filters(state: ArticleStateModel) {
    return state.filters;
  }

  @Selector()
  static status(state: ArticleStateModel) {
    return state.status;
  }

  @Action(GetArticleListAction)
  async getArticleListAction(ctx: StateContext<ArticleStateModel>, action: GetArticleListAction) {
    const state = ctx.getState();
    ctx.patchState({
      status: {
        code: action.status || 'loading',
        message: ''
      }
    });
    try {
      const res = await this.newsService.getArticleList({
        ...state.filters,
        ...action.filters,
        page: 1
      });
      const articles = res['data']['articles'];
      const code = res['data']['status'];
      const message = res['data']['message'];
      if (code === 'error') {
        throw message;
      }
      if (articles.length === 0) {
        ctx.patchState({
          status: {
            code: 'empty',
            message: 'No data available'
          }
        })
      } else {
        ctx.patchState({
          status: {
            code: 'success'
          }
        })
      }
      ctx.patchState({
        items: articles,
        filters: {
          ...state.filters,
          ...action.filters
        }
      })
    } catch (ex) {
      ctx.patchState({
        status: {
          code: 'error',
          message: ex
        },
        items: []
      })
    }
  }



  @Action(LoadMoreArticleListAction)
  async loadMoreArticleList(ctx: StateContext<ArticleStateModel>, action: GetArticleListAction) {
    const state = ctx.getState();
    ctx.patchState({
      status: {
        code: 'loadmore'
      }
    });
    try {
      const res = await this.newsService.getArticleList({
        ...state.filters,
        ...action.filters
      });
      const articles = res['data']['articles'];
      if (articles.length === 0) {
        ctx.patchState({
          status: {
            code: 'nomore'
          }
        });
      } else {
        ctx.patchState({
          status: {
            code: 'success'
          },
          filters: {
            ...state.filters,
            ...action.filters
          }
        })
        ctx.setState(patch({
          items: append(articles)
        }))
      }
    } catch {
      ctx.patchState({
        status: {
          code: 'error',
          message: ''
        },
        items: []
      })
    }
  }


  @Action(SetArticleSourceAction)
  setArticleSource(ctx: StateContext<ArticleStateModel>, action: SetArticleSourceAction) {
    ctx.patchState({
      source: action.source
    });
  }
}
