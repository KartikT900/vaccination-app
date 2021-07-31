import { rest } from 'msw';
import { setupServer } from 'msw/node';
import * as utils from 'utils';

const server = (mockedResponseData) =>
  setupServer(
    rest.get('/test/new', (req, res, ctx) => {
      return res(ctx.json(mockedResponseData));
    })
  );

describe('netcall', () => {
  it.each([
    ['invalid', ''],
    ['not a string', 123]
  ])(
    'exists early with console error when url is %s',
    async (text, url) => {
      // This is to prevent too many console warnings in tests
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockReturnValue('');

      const result = await utils.netCall('', url, { method: 'GET' });

      expect(consoleErrorSpy).toBeCalledWith(
        `Expected url to be a string. Instead received ${typeof url}`
      );
      expect(result).toBeNull();
    }
  );

  it('returns JSON response', async () => {
    const data = { test: '123' };
    const mockedServer = server(data);

    mockedServer.listen();

    const response = await utils.netCall('/test', '/new', {
      method: 'GET'
    });

    expect(response).toEqual(data);

    mockedServer.close();
  });
});
