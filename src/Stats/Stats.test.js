import { it } from 'vitest';
import { describe } from 'vitest';
import BookAdderTestHarness from '../TestTools/BookAdderTestHarness';
import StatsPresenter from './StatsPresenter';
import { expect } from 'vitest';

describe('Book Stats', () => {
  it('should show last added book', async () => {
    let lastAddedViewModel = null;
    const bookAdderTestHarness = new BookAdderTestHarness();
    await bookAdderTestHarness.addBook({ name: 'nextjs', author: 'vercel' });

    const statsPresenter = new StatsPresenter();
    await statsPresenter.load((viewStatsModel) => {
      lastAddedViewModel = viewStatsModel;
    });

    expect(lastAddedViewModel).toBe('nextjs');
  });
});
