import { Line, LineFilterInput } from "@/models/line.model";
import { LineRepository } from '@/repositories/line.repository';
import { normalizeString } from '@/utils/string';

export class LineService {
  private lineRepository: LineRepository;

  constructor(lineRepository: LineRepository) {
    this.lineRepository = lineRepository;
  }

  async getLine(id : string): Promise<Line | null> {
    return await this.lineRepository.findById(id);
  }

  async getLines(filter?: LineFilterInput): Promise<Line[] | null> {
    const { query } = filter || {};
    const normalizedQuery = normalizeString(query || '');

    return await this.lineRepository.findMany({ query: normalizedQuery });
  }
}
