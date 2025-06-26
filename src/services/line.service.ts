import lineList from '@/data/lineList.json';
import { Line, LineFilterInput } from "@/models/line.model";
import { normalizeString } from '@/utils/string';

export class LineService {
  private static getAll() : Line[] {
    return (lineList as Line[])
          .filter((l): l is Line => l !== null);;
  }

  private static toSearchableText(line: Line): string {
    return [
      line.id,
      line.name,
      line.concept,
      line.description
    ].join(' ');
  }

  private static filterByQueryText(lines : Line[], query : string) : Line[] {
    const normalizedQuery = normalizeString(query);
    const filteredLines = lines.filter(line => {
      const searchableLineText = this.toSearchableText(line);
      return normalizeString(searchableLineText).includes(normalizedQuery);
    })
    return filteredLines;
  }

  static getLine(id : string) : Line | undefined {
    return (lineList as Line[]).find(l => l.id === id);
  }

  static getLines(filter? : LineFilterInput) : Line[] {
    const { query } = filter || {}

    let lines = this.getAll();
    if (query) {
      lines = this.filterByQueryText(lines, query);
    }
    return lines  
  }
}