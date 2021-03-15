import { TestBed, async, inject } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { FavoriteArticleState } from './favorite-article.state';
import { FavoriteArticleAddAction, GetFavoriteArticleAction } from './favorite-article.actions';
import { Storage } from '@ionic/storage';
import { StorageMock } from 'src/app/shared/mocks';

describe('FavoriteArticle actions', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([FavoriteArticleState])],
      providers: [
        {
          provide: Storage,
          useClass: StorageMock
        }
      ]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('#addToFavoriteAction', () => {
    store.dispatch(new FavoriteArticleAddAction({
      author: 'abc'
    }));
    store.select(state => state.favoriteArticle.items).subscribe((items: string[]) => {
      expect(items).toContain(jasmine.objectContaining({
        author: 'abc',
        favorite: true
      }));
    });
  });

  it('#GetFavoriteArticleAction', inject([Storage], (storage) => {
    spyOn(storage, 'get').and.returnValue(['abc']);
    store.dispatch(new GetFavoriteArticleAction());
    expect(storage.get).toHaveBeenCalledWith('favoriteArticles');
    const favs = store.selectSnapshot(FavoriteArticleState.articleList);
    expect(favs).toEqual(['abc'] as any);
  }))
});
/**
 *  const favorites = await this.storage.get('favoriteArticles');
    ctx.patchState({
      items: favorites || []
    });
 */