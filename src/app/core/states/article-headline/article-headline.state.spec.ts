import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ArticleHeadlineState } from './article-headline.state';
import { GetListArticleHeadlineAction } from './article-headline.actions';

describe('ArticleHeadline actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ArticleHeadlineState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new GetListArticleHeadlineAction('item-1'));
    store.select(state => state.articleHeadline.items).subscribe((items: string[]) => {
      expect(items).toEqual(jasmine.objectContaining(['item-1']));
    });
  });

});
