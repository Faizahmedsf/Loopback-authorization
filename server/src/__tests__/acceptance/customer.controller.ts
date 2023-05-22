import {Client, expect} from '@loopback/testlab';
import {ServerApplication} from '../..';
import {setupApplication} from './test-helper';

describe('Customer Application', () => {
  let app: ServerApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /customer', async () => {
    const res = await client.get('/customer').expect(200);
    expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
  });
});
