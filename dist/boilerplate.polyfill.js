"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const lodash_1 = require("lodash");
const typeorm_1 = require("typeorm");
const DriverUtils_1 = require("typeorm/driver/DriverUtils");
const page_dto_1 = require("./common/dto/page.dto");
const page_meta_dto_1 = require("./common/dto/page-meta.dto");
const decorators_1 = require("./decorators");
function groupRows(rawResults, alias, driver) {
    const raws = new Map();
    const keys = [];
    if (alias.metadata.tableType === 'view') {
        keys.push(...alias.metadata.columns.map((column) => DriverUtils_1.DriverUtils.buildAlias(driver, alias.name, column.databaseName)));
    }
    else {
        keys.push(...alias.metadata.primaryColumns.map((column) => DriverUtils_1.DriverUtils.buildAlias(driver, alias.name, column.databaseName)));
    }
    for (const rawResult of rawResults) {
        const id = keys
            .map((key) => {
            const keyValue = rawResult[key];
            if (Buffer.isBuffer(keyValue)) {
                return keyValue.toString('hex');
            }
            if (typeof keyValue === 'object') {
                return JSON.stringify(keyValue);
            }
            return keyValue;
        })
            .join('_');
        const items = raws.get(id);
        if (!items) {
            raws.set(id, [rawResult]);
        }
        else {
            items.push(rawResult);
        }
    }
    return raws;
}
Array.prototype.toDtos = function (options) {
    return (0, lodash_1.compact)((0, lodash_1.map)(this, (item) => item.toDto(options)));
};
Array.prototype.toPageDto = function (pageMetaDto, options) {
    return new page_dto_1.PageDto(this.toDtos(options), pageMetaDto);
};
typeorm_1.QueryBuilder.prototype.searchByString = function (q, columnNames) {
    if (!q) {
        return this;
    }
    this.andWhere(new typeorm_1.Brackets((qb) => {
        for (const item of columnNames) {
            qb.orWhere(`${item} ILIKE :q`);
        }
    }));
    this.setParameter('q', `%${q}%`);
    return this;
};
typeorm_1.SelectQueryBuilder.prototype.paginate = async function (pageOptionsDto, options) {
    var _a, _b;
    if (!(options === null || options === void 0 ? void 0 : options.takeAll)) {
        this.skip(pageOptionsDto.skip).take(pageOptionsDto.take);
    }
    const itemCount = await this.getCount();
    const { entities, raw } = await this.getRawAndEntities();
    const alias = this.expressionMap.mainAlias;
    const group = groupRows(raw, alias, this.connection.driver);
    const keys = alias.metadata.primaryColumns.map((column) => DriverUtils_1.DriverUtils.buildAlias(this.connection.driver, alias.name, column.databaseName));
    for (const rawValue of raw) {
        const id = keys
            .map((key) => {
            const keyValue = rawValue[key];
            if (Buffer.isBuffer(keyValue)) {
                return keyValue.toString('hex');
            }
            if (typeof keyValue === 'object') {
                return JSON.stringify(keyValue);
            }
            return keyValue;
        })
            .join('_');
        const entity = entities.find((item) => item.id === id);
        const metaInfo = (_a = Reflect.getMetadata(decorators_1.VIRTUAL_COLUMN_KEY, entity)) !== null && _a !== void 0 ? _a : {};
        for (const [propertyKey, name] of Object.entries(metaInfo)) {
            const items = group.get(id);
            if (items) {
                for (const item of items) {
                    (_b = entity[propertyKey]) !== null && _b !== void 0 ? _b : (entity[propertyKey] = item[name]);
                }
            }
        }
    }
    const pageMetaDto = new page_meta_dto_1.PageMetaDto(pageOptionsDto, itemCount);
    return [entities, pageMetaDto];
};
//# sourceMappingURL=boilerplate.polyfill.js.map