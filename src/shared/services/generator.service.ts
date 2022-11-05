import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { v1 as uuid } from 'uuid';

@Injectable()
export class GeneratorService {
  public uuid(): string {
    return uuid();
  }

  public fileName(ext: string): string {
    return this.uuid() + '.' + ext;
  }

  public generatePassword(length: number) {
    const wishlist =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$';

    return [...crypto.randomFillSync(new Uint32Array(length))]
      .map((x) => wishlist[x % wishlist.length])
      .join('');
  }
}
