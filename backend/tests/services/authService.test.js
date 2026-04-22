// src/services/auth.service.test.js
const authService = require('../../src/service/auth.service.js');

describe('AuthService', () => {

  // ✅ TEST 1: Signup crée user et retourne token
  test('signup crée user et retourne token', async () => {
    const result = await authService.register({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecurePass123!',
    });

    // ✅ Assertions (c'est ça qui teste!)
    expect(result).toBeDefined();
    expect(result.token).toBeDefined();
    expect(result.user).toBeDefined();
    expect(result.user.email).toBe('john@example.com');
  });

  // ✅ TEST 2: Signup échoue si email existe
  test('signup échoue email duplicate', async () => {
    // Setup: créer un user d'abord
    await authService.register({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'Password123!',
    });

    // Essayer de créer le même email
    expect(async () => {
      await authService.register({
        name: 'Alice2',
        email: 'alice@example.com',  // ← Même email!
        password: 'Password456!',
      });
    }).rejects.toThrow('Email already exists');
  });

  // ✅ TEST 3: Login échoue password mauvais
  test('login échoue password mauvais', async () => {
    // Setup: créer un user
    await authService.register({
      name: 'Bob',
      email: 'bob@example.com',
      password: 'CorrectPass123!',
    });

    // Essayer login avec mauvais password
    expect(async () => {
      await authService.login({
        email: 'bob@example.com',
        password: 'WrongPassword',  // ← Mauvais!
      });
    }).rejects.toThrow('Invalid credentials');
  });

});