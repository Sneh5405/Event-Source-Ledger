import request from 'supertest';
import app from '../src/app';

describe('GET /health', () => {
  it('should return 200 and success details', async () => {
    const res = await request(app).get('/health');
    
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        success: true,
        message: 'Ledger core service is healthy.',
        data: expect.objectContaining({
          timestamp: expect.any(String),
          uptime: expect.any(Number),
        }),
        meta: {},
      })
    );
  });

  it('should return 404 for unmatched routes', async () => {
    const res = await request(app).get('/non-existent-route');
    
    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      success: false,
      message: 'The requested endpoint was not found.',
      data: {
        errors: [{ message: 'The requested endpoint was not found.' }],
      },
      meta: {},
    });
  });
});
