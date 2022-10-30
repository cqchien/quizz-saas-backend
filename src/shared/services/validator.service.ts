import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidatorService {
  public isImage(mimeType: string): boolean {
    const imageMimeTypes = ['image/jpeg', 'image/png'];

    return imageMimeTypes.includes(mimeType);
  }

  public isExcel(mimeType: string): boolean {
    const exelMimeTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    return exelMimeTypes.includes(mimeType);
  }
}
