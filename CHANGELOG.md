# Svelty-Material

## 2.0.4

-   script and config changes

## 2.0.3

-   publishing batch

## 2.0.2

-   packaging batch

## 2.0.1

-   imports fixed

## 2.0.0

-   updated to newer sveltekit version, because of $app/env

## 1.2.5

-   modal action: transitionend bubbling fixed. Know if checks if target is the same as the node

## 1.2.4

-   Dialog: fix of the fix of the fix, We wait until the animation finishes to focus, should fix jumping behaviour

## 1.2.3

-   Dialog: fix of the real fix

## 1.2.2

-   Dialog: real fix

## 1.2.1

-   Dialog: fixed ESC when dialog opened but no element focused

## 1.2.0

-   Dialog: Removed svelte `on:` listeners because they don't get statically analyzed and removed if unused and with lots of components this can have a lot of performance overhead.

## 1.1.8

-   Dialog: divided into more components for more control
-   Dialog: added a lot of events for the "s-dialog" element
-   Dialog: fixed nested dialogs closing on escape

## 1.1.7

-   Dialog: removed js width variable and added better typing

## 1.1.6

-   Dialog: added forgotten css visibility

## 1.1.5

-   Dialog: added more classes for state

## 1.1.4

-   Dialog: fixed hiding container

## 1.1.3

-   Dialog: z-index added as var and added isolation

## 1.1.2

-   Dialog: real fix with visibility

## 1.1.1

-   Dialog: removed clickOutside import

## 1.1.0

-   breaking: dialog doesn't close automatically on overlay click anymore

## 1.0.62

-   forgot click outside

## 1.0.61

-   overlay click added to dialog

## 1.0.60

-   button/link hover now only shows for mouse input

## 1.0.59

-   textarea label position fixed and border of wraper fixed

## 1.0.58

-   changed ripple scale back

## 1.0.57

-   next try for checkbox and radio but safari still has problems.
-   added style and restprops for the chip component

## 1.0.56

-   radio and checkbox ripple fixed for keyboard

## 1.0.55

-   badge --s-badge-offset-x,--s-badge-offset-y unit fixed

## 1.0.54

-   badge direction fixed

## 1.0.53

-   Textcolor action fixed
-   ripple effect fixed on apple devices

## 1.0.52

-   Expansionpanel out transition made local because of routing

## 1.0.51

-   added `restProps` to the Card element

## 1.0.50

-   added `restProps` to the Button element

## 1.0.49

-   button: removed box-shadow on focus-visible

## 1.0.48

-   real fix of the last one

## 1.0.47

-   fixed: focus-visible without js

## 1.0.46

-   texfield not doesn't color invalid if placeholder still there

## 1.0.45

-   disbled styling added for attribute

## 1.0.44

-   custom property fixed
-   event types on dialog added

## 1.0.43

-   overflow changed to overflow-y

## 1.0.42

-   Dialog fixes layout shift by adding padding on windows and linux devices, who have a scrollbar

## 1.0.41

-   Dialog types fixed

## 1.0.40

-   removed pointer event from dialog

## 1.0.39

-   Overflow property added

## 1.0.38

-   Fixed Dialog Overflow

## 1.0.37

-   Previous fix didn't work. Now it's fixed for real

## 1.0.36

-   No layout shift anymore when opening a modal/dialog

## 1.0.35

-   Preserve top position

## 1.0.34

-   Publishing mistake

## 1.0.33

-   Dialog: On open doesn't hide the scrollbar, but locks it.
