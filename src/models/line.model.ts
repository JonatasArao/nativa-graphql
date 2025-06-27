export interface Line {
	id: string | null;
	name: string | null;
	description: string | null;
	concept: string | null;
}

export interface LineFilterInput {
  query?: string;
}