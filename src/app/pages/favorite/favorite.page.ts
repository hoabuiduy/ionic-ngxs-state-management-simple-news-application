import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ArticleModel } from 'src/app/core/models/article.model';
import { GetFavoriteArticleAction } from 'src/app/core/states/favorite-article/favorite-article.actions';
import { FavoriteArticleState } from 'src/app/core/states/favorite-article/favorite-article.state';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {


  @Select(FavoriteArticleState.articleList) favoriteArticles$: Observable<ArticleModel[]>;


  constructor(
    public store: Store,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getFavoriteArticleList();
  }

  getFavoriteArticleList() {
    this.store.dispatch(new GetFavoriteArticleAction());
  }

  viewDetail(article: ArticleModel) {
    this.navCtrl.navigateForward(['tabs', 'favorite', 'articleDetail'], {
      state: {
        article
      }
    });
  }

}
