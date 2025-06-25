import lineList from '@/data/lineList.json';
import { Line } from "@/models/line.model";

export class LineService {
  static getAll() : Line[] {
    return lineList;
  }

  static getById(id : string) : Line | undefined {
    return (lineList as Line[]).find(l => l.id === id);;
  }
}