import path from 'path';
import fs from 'fs';
import Papa from 'papaparse';
import {
  filterValidEntries,
  normalizeHeaders,
  PayloadDataType,
} from '@/utils/payload';

export default async function getDataSource(file_name: string) {
  const paths = ['assets/data', 'assets/cache/source'];

  for (const p of paths) {
    // security: sanitize file_name (no directory traversal)
    const sanitized_file_name = path.basename(file_name);
    const file_path = path.join(process.cwd(), p, sanitized_file_name);

    if (!fs.existsSync(file_path)) {
      continue;
    }

    const file_data = fs.readFileSync(file_path, 'utf8');

    if (!file_data) {
      return false;
    }

    const ext = path.extname(sanitized_file_name).toLowerCase();

    if (ext === '.csv') {
      // remove comments from CSV data
      // comments start with # and are at the beginning of the line
      const cleaned_data = file_data
        .split('\n')
        .filter((line) => !line.trim().startsWith('#'))
        .join('\n');

      const result = Papa.parse(cleaned_data, { header: true, delimiter: ';' })
        .data as PayloadDataType[];
      const normalizedResult = normalizeHeaders(result);
      return filterValidEntries(normalizedResult);
    } else if (ext === '.json') {
      return JSON.parse(file_data);
    } 
  }

  return false;
}
