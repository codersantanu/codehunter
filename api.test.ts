Sure, here's the proposed content for the file `/canteen-companion-backend/tests/api.test.ts`:

import request from 'supertest';
import app from '../src/app'; // Adjust the path as necessary

describe('API Endpoints', () => {
    it('should return a 200 response for the home route', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'testuser@example.com',
                password: 'password123'
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
    });

    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123'
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should fetch the menu', async () => {
        const response = await request(app).get('/api/menu');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should create a new order', async () => {
        const response = await request(app)
            .post('/api/orders')
            .send({
                userId: '1',
                menuItems: [{ id: '1', quantity: 2 }],
                totalAmount: 20.00
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('order');
    });

    it('should submit feedback', async () => {
        const response = await request(app)
            .post('/api/feedback')
            .send({
                userId: '1',
                comments: 'Great service!',
                rating: 5
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('feedback');
    });
});