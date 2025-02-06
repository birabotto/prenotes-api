"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseXls = void 0;
const XLSX = __importStar(require("xlsx"));
const HFB_1 = __importDefault(require("./HFB"));
const formatNumber_1 = __importDefault(require("./formatNumber"));
const parseXls = (fileBuffer) => {
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    let data = XLSX.utils.sheet_to_json(sheet);
    data = data.map((row) => {
        const transformedRow = {};
        for (const key in row) {
            const newKey = key.replace(/\s/g, "");
            transformedRow[newKey] = row[key];
        }
        return transformedRow;
    });
    return data.map((row) => {
        const HFBCode = row.HFB;
        const department = HFB_1.default.get(HFBCode) || 1;
        return {
            name: row.ARTNAME_UNICODE,
            item: (0, formatNumber_1.default)(row.Item),
            location: row.SLID_H,
            order_qty: row.OrderQty,
            assq: row.ASSQ,
            mpq: row.MPQ,
            palq: row.PALQ,
            qty_in_sales: row.QTYINSALES,
            department: department,
        };
    });
};
exports.parseXls = parseXls;
