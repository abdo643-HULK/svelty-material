/// <reference types="vite/client" />
/// <reference types="@svelte-kit" />

type AppTouchEvent = TouchEvent;
var AppTouchEvent = TouchEvent;

interface Crypto {
	randomUUID: () => string;
}
