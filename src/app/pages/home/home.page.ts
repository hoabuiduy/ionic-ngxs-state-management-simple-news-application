import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ArticleSourceModel } from 'src/app/core/models/article-source.model';
import { ArticleModel } from 'src/app/core/models/article.model';
import { GetListArticleHeadlineAction, LoadMoreArticleHeadlienAction } from 'src/app/core/states/article-headline/article-headline.actions';
import { ArticleHeadlineState } from 'src/app/core/states/article-headline/article-headline.state';
import { ArticleState } from 'src/app/core/states/articles/article.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private loadingEl: HTMLIonLoadingElement;
  private infiniteEl: IonInfiniteScroll;
  private refresher: HTMLIonRefresherElement;

  @Select(ArticleHeadlineState.articleHeadlines) articleHeadlines$: Observable<ArticleModel[]>;
  @Select(ArticleHeadlineState.status) artcleHeadlineStatus$: Observable<{ code, message?}>;

  constructor(
    private store: Store,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    this.artcleHeadlineStatus$.subscribe(async (data) => {
      switch (data?.code) {
        case 'loading':
          this.loadingEl = await this.loadingCtrl.create();
          await this.loadingEl?.present();
          break;
        case 'success':
        case 'error':
          this.loadingEl?.dismiss();
          this.infiniteEl?.complete();
          this.refresher?.complete();
          if (data?.code === 'error') {
            (await this.toastCtrl.create({
              message: data['message'],
              duration: 3000,
              color: 'danger'
            })).present();
          }
          break;
      }
    });
    this.getArticleHeadlines('loading');
  }

  viewDetail(article: ArticleModel) {
    this.navCtrl.navigateForward(['tabs', 'home', 'articleDetail'], {
      state: {
        article
      },
    });
  }

  goToSearch() {
    this.navCtrl.navigateForward(['tabs', 'search']);
  }
  loadMore(infinite: any) {
    this.infiniteEl = infinite.target;
    this.loadMoreArticleHeadlines();
  }
  doRefresh(refresher: any) {
    this.refresher = refresher?.target;
    this.getArticleHeadlines('initial');
  }
  getArticleHeadlines(loadingStatus: string) {
    this.store.dispatch(new GetListArticleHeadlineAction(loadingStatus));
  }

  loadMoreArticleHeadlines() {
    this.store.dispatch(new LoadMoreArticleHeadlienAction());
  }
}
