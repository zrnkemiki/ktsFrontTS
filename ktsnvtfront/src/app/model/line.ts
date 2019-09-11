import { Stop } from './stop';
import { Departure } from './departure';

export interface Line {
	id: string;
	broj: string;
    naziv: string;
    stajalista: Array<Stop>;
    polasci: Array<Departure>;
    tip: string;
}