/// <reference types="vite/client" />
/// <reference types="@svelte-kit" />

type AppTouchEvent = TouchEvent;
var AppTouchEvent = TouchEvent;

interface Crypto {
	randomUUID: () => string;
}

type BaseLinePosition = ['first' | 'last', 'baseline'] | 'baseline';

type AlignItems =
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
