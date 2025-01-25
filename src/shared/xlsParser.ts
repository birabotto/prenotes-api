import * as XLSX from "xlsx";
import HFB from "./HFB";
import formatNumber from "./formatNumber";
export const parseXls = (fileBuffer: Buffer) => {
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  let data = XLSX.utils.sheet_to_json(sheet);

  data = data.map((row: any) => {
    const transformedRow: { [key: string]: any } = {};

    for (const key in row) {
      const newKey = key.replace(/\s/g, "");
      transformedRow[newKey] = row[key];
    }

    return transformedRow;
  });

  return data.map((row: any) => {
    const HFBCode = row.HFB;

    const department = HFB.get(HFBCode) || 1;
    return {
      name: row.ARTNAME_UNICODE,
      item: formatNumber(row.Item),
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
