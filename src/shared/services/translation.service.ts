import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import type { translateOptions } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class TranslationService {
  constructor(private readonly i18n: I18nService) {}

  async translate(
    key: string,
    options: translateOptions = {},
  ): Promise<string> {
    return this.i18n.translate(`translations.${key}`, options);
  }

  translateNecessaryKeys<T>(dto: T) {
    return dto;
  }
}
