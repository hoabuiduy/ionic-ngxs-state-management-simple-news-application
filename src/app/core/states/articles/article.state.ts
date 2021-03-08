import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, Select } from '@ngxs/store';
import { append, patch } from '@ngxs/store/operators';
import { ArticleModel } from '../../models/article.model';
import { ArticleFilterModel } from '../../models/filter.model';
import { ArticleService } from '../../services/article.service';
import { GetArticleListAction, LoadMoreArticleListAction } from './article.actions';



export interface ArticleStateModel {
  items: ArticleModel[];
  status: { code: string, message?: string };
  filters: ArticleFilterModel;
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
        code: 'loading',
        message: ''
      }
    });
    try {
      const res = await this.newsService.getArticleList({
        ...state.filters,
        page: 1
      });
      const articles = res['data']['articles'];
      const code = res['data']['status'];
      const message = res['data']['message'];
      if (code === 'error') {
        throw message;
      }
      ctx.patchState({
        status: {
          code: 'success',
          message: ''
        },
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
        page: state.filters.page + 1
      });
      const articles = res['data']['articles'];
      if (articles.length < 10) {
        ctx.patchState({
          status: {
            code: 'empty'
          }
        });
      } else {
        ctx.patchState({
          status: {
            code: 'success'
          },
          filters: {
            ...state.filters,
            page: state.filters.page + 1
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
}
