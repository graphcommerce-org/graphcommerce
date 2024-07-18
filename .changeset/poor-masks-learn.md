---
'@graphcommerce/react-hook-form': minor
---

Solve an issue where onBeforeSubmit and onComplete would become an 'stale closure' where variables inside wouldn't be updated. By wrapping onBeforeSubmit and onComplete in useEventCallback these functions are updated when outside values get changed.
