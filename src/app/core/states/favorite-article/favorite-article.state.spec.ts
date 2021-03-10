import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { FavoriteArticleState } from './favorite-article.state';
import { FavoriteArticleAddAction } from './favorite-article.actions';

describe('FavoriteArticle actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([FavoriteArticleState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new FavoriteArticleAddAction({}));
    store.select(state => state.favoriteArticle.items).subscribe((items: string[]) => {
      expect(items).toEqual(jasmine.objectContaining(['item-1']));
    });
  });

});
