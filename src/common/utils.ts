import bcrypt from 'bcrypt';
import _ from 'lodash';

import type { Optional } from '../types';

export class DtoService {
  public static toDto<T, E>(model: new (schema: E) => T, schema: E): T;

  public static toDto<T, E>(model: new (schema: E) => T, schema: E[]): T[];

  public static toDto<T, E>(
    model: new (schema: E) => T,
    schema: E | E[],
  ): T | T[] {
    if (_.isArray(schema)) {
      return schema.map((u) => new model(u));
    }

    return new model(schema);
  }
}

/**
 * generate hash from password or string
 * @param {string} password
 * @returns {string}
 */
export function generateHash(password: string): string {
  return bcrypt.hashSync(password, 10);
}

/**
 * validate text with hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export function validateHash(
  password: Optional<string>,
  hash: Optional<string>,
): Promise<boolean> {
  if (!password || !hash) {
    return Promise.resolve(false);
  }

  return bcrypt.compare(password, hash);
}

export function getVariableName<TResult>(getVar: () => TResult): string {
  const m = /\(\)=>(.*)/.exec(
    getVar.toString().replace(/(\r\n|\n|\r|\s)/gm, ''),
  );

  if (!m) {
    throw new Error(
      "The function does not contain a statement matching 'return variableName;'",
    );
  }

  const fullMemberName = m[1];

  const memberParts = fullMemberName.split('.');

  return memberParts[memberParts.length - 1];
}
