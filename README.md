# Mycursor v0.0.3

It wouldn't be bad to use a few custom cursors, like [figma](https://figma.com) does.

## How to use?

To use it, it is enough to have basic CSS knowledge. here is a usage example:

```css

/* You can also include it in your project via cdn. */
@import url("https://cdn.jsdelivr.net/npm/mycursor@0.0.2/mycursor.min.css")

body {
    cursor: var(--cursor-default), default;
}

.pointer {
    cursor: var(--cursor-pointer), pointer;
}
```