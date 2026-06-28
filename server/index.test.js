import request from 'supertest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import app from './index.js';

describe('Express Server Routes', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it('GET /data should return data', async () => {
    mock.onGet('https://www.swiggy.com/dapi/restaurants/list/v5').reply(200, {
      data: {
        cards: [
          {
            card: {
              card: {
                id: 'restaurant_grid_listing',
                gridElements: {
                  infoWithStyle: { restaurants: [{ info: { name: 'Res 1' } }] },
                },
              },
            },
          },
        ],
      },
    });
    const res = await request(app).get(
      '/data?lat=12&lng=34&page_type=DESKTOP_WEB_LISTING'
    );
    expect(res.status).toBe(200);
    expect(res.body.restaurant_grid_listing[0].name).toBe('Res 1');
  });

  it('POST /update should return updated data', async () => {
    mock
      .onPost('https://www.swiggy.com/dapi/restaurants/list/update')
      .reply(200, {
        data: {
          cards: [
            {
              card: {
                card: {
                  gridElements: {
                    infoWithStyle: {
                      restaurants: [{ info: { update: true } }],
                    },
                  },
                },
              },
            },
          ],
        },
      });
    const res = await request(app)
      .post('/update')
      .send({ lat: '12', lng: '34' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ update: true }]);
  });

  it('GET /restaurantmenu should return menu data', async () => {
    mock.onGet('https://www.swiggy.com/dapi/menu/pl').reply(200, {
      data: {
        cards: [
          {
            card: {
              relevance: { sectionId: 'POP_UP_CROUTON_MENU' },
              card: { info: { name: 'Res Details' } },
            },
          },
          { groupedCard: { cardGroupMap: { REGULAR: { cards: [] } } } },
        ],
      },
    });
    const res = await request(app).get('/restaurantmenu?lat=12&lng=34&id=123');
    expect(res.status).toBe(200);
    expect(res.body.resDetails.name).toBe('Res Details');
  });
});
