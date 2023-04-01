import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { Auth} from 'src/auth/auth.entity';


const userSeeds = [{email:"test@seed.com",password:"test@123"}]

@Injectable()
export class SeedingService {
  constructor(
    private readonly entityManager: EntityManager,
  ) {}

  async seed(): Promise<void> {

    // Replace with your own seeds
    await Promise.all([
      this.entityManager.save(Auth, userSeeds),
    ]);

  }
}