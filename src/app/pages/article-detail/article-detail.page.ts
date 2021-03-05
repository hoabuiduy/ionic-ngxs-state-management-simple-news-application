import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ArticleModel } from 'src/app/core/models/article.model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
})
export class ArticleDetailPage implements OnInit {

  article: ArticleModel;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.article = history.state?.article;
    if (!this.article) {
      this.navCtrl.back();
    }
  }

}
