import { Injectable } from '@nestjs/common';
import { read, utils } from 'xlsx';

import type { IFile } from '../../interfaces/IFile';

@Injectable()
export class FileService {
  public parseExcelFIle(file: IFile) {
    const workbook = read(file.buffer, { type: 'buffer', raw: true });
    const sheetNames = workbook.SheetNames;
    const xlsxData = utils.sheet_to_json<string[]>(
      workbook.Sheets[sheetNames[0]],
    );

    return xlsxData;
  }
}
