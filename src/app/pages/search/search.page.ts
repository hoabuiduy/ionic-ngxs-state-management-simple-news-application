import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ArticleModel } from 'src/app/core/models/article.model';
import { GetArticleListAction } from 'src/app/core/states/articles/article.actions';
import { ArticleState } from 'src/app/core/states/articles/article.state';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public keywords = '';

  @Select(ArticleState.listArticle) listArticle$: Observable<ArticleModel[]>;

  constructor(private navCtrl: NavController, private store: Store) { }

  ngOnInit() {
    this.getListArticle();
  }

  viewDetail(article: ArticleModel) {
    this.navCtrl.navigateForward(['tabs', 'search', 'articleDetail'], {
      state: {
        article
      },
    });
  }

  search() {
    this.getListArticle(this.keywords);
  }

  getListArticle(keywords?) {
    this.store.dispatch(new GetArticleListAction({
      q: keywords
    }));
  }
}
