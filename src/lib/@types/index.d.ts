export interface Dataset {
	name: string;
	value: any;
}

export type BaseLinePosition = ['first' | 'last', 'baseline'] | 'baseline';

export type AlignItems =
	| 'normal'
	| 'stretch'
	| BaseLinePosition
	| 'center'
	| ['safe', 'center']
	| ['unsafe', 'center']
	| 'start'
	| ['safe', 'start']
	| ['unsafe', 'start']
	| 'end'
	| ['safe', 'end']
	| ['unsafe', 'end']
	| 'self-start'
	| ['safe', 'self-start']
	| ['unsafe', 'self-start']
	| 'self-end'
	| ['safe', 'self-end']
	| ['unsafe', 'self-end']
	| 'flex-start'
	| ['safe', 'flex-start']
	| ['unsafe', 'flex-start']
	| 'flex-end'
	| ['safe', 'flex-end']
	| ['unsafe', 'flex-end'];
