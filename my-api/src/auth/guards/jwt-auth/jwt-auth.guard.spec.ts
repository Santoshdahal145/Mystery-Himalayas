import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard(new Reflector());
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  // Optional: add tests for canActivate
  it('should allow access if route is public', () => {
    const context = {
      getHandler: () => {},
      getClass: () => {},
    } as any;

    // Mock the reflector to return true for public
    jest.spyOn(guard['reflector'], 'getAllAndOverride').mockReturnValue(true);

    expect(guard.canActivate(context)).toBe(true);
  });
});
