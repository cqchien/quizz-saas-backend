import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isNil } from 'lodash';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  public getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  public getTimeZone(): string {
    return this.getString('TZ');
  }

  public getSendGridApiKey(): string {
    return this.getString('SEND_GRID_KEY');
  }

  get fallbackLanguage(): string {
    return this.getString('FALLBACK_LANGUAGE').toLowerCase();
  }

  get getDatabaseUrl(): string {
    return `mongodb+srv://${this.getString('DB_USER')}:${this.getString(
      'DB_PASSWORD',
    )}@devconnector.3mowt.mongodb.net/${this.getString(
      'DB_DATABASE',
    )}?retryWrites=true&w=majority`;
  }

  // get awsS3Config() {
  //   return {
  //     bucketRegion: this.getString('AWS_S3_BUCKET_REGION'),
  //     bucketApiVersion: this.getString('AWS_S3_API_VERSION'),
  //     bucketName: this.getString('AWS_S3_BUCKET_NAME'),
  //   };
  // }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION');
  }

  // get natsEnabled(): boolean {
  //   return this.getBoolean('NATS_ENABLED');
  // }

  // get natsConfig() {
  //   return {
  //     host: this.getString('NATS_HOST'),
  //     port: this.getNumber('NATS_PORT'),
  //   };
  // }

  get authConfig() {
    return {
      privateKey: this.getString('JWT_PRIVATE_KEY'),
      publicKey: this.getString('JWT_PUBLIC_KEY'),
      jwtExpirationTime: this.getNumber('JWT_EXPIRATION_TIME'),
    };
  }

  get mailOptionsConfig() {
    return {
      host: this.getString('MAIL_HOST'),
      port: this.getNumber('MAIL_PORT'),
      user: this.getString('MAIL_USERNAME'),
      pass: this.getString('MAIL_PASS'),
      defaultFrom: this.getString('MAIL_DEFAULT_FROM'),
    };
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }
}
