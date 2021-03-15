import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { NgxsModule } from '@ngxs/store';
import { ArticleModel } from 'src/app/core/models/article.model';
import { GetFavoriteArticleAction } from 'src/app/core/states/favorite-article/favorite-article.actions';
import { NavMock } from 'src/app/shared/mocks';

import { FavoritePage } from './favorite.page';

describe('FavoritePage', () => {
  let component: FavoritePage;
  let fixture: ComponentFixture<FavoritePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritePage],
      imports: [
        IonicModule.forRoot(),
        NgxsModule.forRoot(),
        IonicStorageModule.forRoot()
      ],
      providers: [
        {
          provide: NavController,
          useClass: NavMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit', () => {
    spyOn(component, 'getFavoriteArticleList');
    component.getFavoriteArticleList();
    expect(component.getFavoriteArticleList).toHaveBeenCalled();
  })

  it('#getFavoriteArticleList', () => {
    spyOn(component.store, 'dispatch');
    component.getFavoriteArticleList();
    expect(component.store.dispatch).toHaveBeenCalledWith(new GetFavoriteArticleAction());
  })

  it('#viewDetail', () => {
    const article: ArticleModel = {
      title: 'abc'
    }
    spyOn(component.navCtrl, 'navigateForward');
    component.viewDetail(article);
    expect(component.navCtrl.navigateForward).toHaveBeenCalledWith(['tabs', 'favorite', 'articleDetail'], {
      state: {
        article
      }
    })
  })
});