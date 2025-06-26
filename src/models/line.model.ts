export interface Line {
	id: string;
	name: string;
	description: string;
	concept: string;
}

export interface LineFilterInput {
  query?: string;
}