# txt.less — responsive alignment classnames

[![npm version](https://badge.fury.io/js/txt.less.svg)](http://badge.fury.io/js/txt.less)
[![bower version](https://badge.fury.io/bo/txt.less.svg)](http://badge.fury.io/bo/txt.less)

Responsive classnames generator for text styles depending on media breakpoints.

## Installation

**Compiled from CDN**
[`https://unpkg.com/txt.less@0.0.2/txt.css`](https://unpkg.com/txt.less@0.0.2/txt.css)
[`https://unpkg.com/txt.less@0.0.2/txt.min.css`](https://unpkg.com/txt.less@0.0.2/txt.min.css)
[`https://unpkg.com/txt.less@0.0.2/txt.min.css.map`](https://unpkg.com/txt.less@0.0.2/txt.min.css.map)

**NPM**
`npm install txt.less --save-dev`

**Bower**
`bower install txt.less --save`

## How it works

### `.txt-left:*`, `.txt-right:*`, `.txt-center:*`, `.txt-justify:*`

Alignment classes for selected breakpoint and on larger screens. Example as rendered in CSS:

```css
@media (min-width: 576px) {
  .txt-left\:sm {
    text-align: left;
  }
}
```

| text-align        | **xs**  | **sm**    | **md**    | **lg**     | **xl**   |
| ----------------- | ------- | --------- | --------- | ---------- | -------- |
|                   | 0—575px | 576—767px | 768—991px | 992—1199px | 1200—∞px |
| `.txt-left`       | left    | left      | left      | left       | left     |
| `.txt-left:xs`    | left    | left      | left      | left       | left     |
| `.txt-left:sm`    |         | left      | left      | left       | left     |
| `.txt-left:md`    |         |           | left      | left       | left     |
| `.txt-left:lg`    |         |           |           | left       | left     |
| `.txt-left:xl`    |         |           |           |            | left     |

### `.txt-nowrap`, `.txt-ellipsis`

Those two doesn't have responsive suffixes and just renders with no media queries.

```css
.txt-nowrap { 
    white-space: nowrap;
}
.txt-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

## Usage in HTML

Link compiled `txt.css` from CDN and apply classes to any HTML element.

## Usage in LESS

Install library with `npm install txt.less --save-dev` and include its main file inside your project less file:

```less
@import (less) "./node_modules/txt.less/txt.less";
```

That is enough to run library with default parameters.

### Default parameters

Parameters stored in mixin:

```less
.txt-settings() {
    // media breakpoints
    @breakpoints:
        576px,
        768px,
        992px,
        1200px;

    // names for breakpoint suffixes
    @suffixes: xs, sm, md, lg, xl;

    // IMPORTANT: suffixes count should be bigger than breakpoints count by 1
    // suffixes-count = breakpoints-count + 1
}
```

### Redefining parameters

To change any (or every) parameter add setting mixin after import inside your .less file:

```less
@import (less) "./node_modules/txt.less/txt.less";

.txt-settings() {
    // media breakpoints
    @breakpoints:
        768px,
        1024px,
        1440px;

    // names for breakpoint suffixes
    @suffixes: small, medium, large, huge;

    // IMPORTANT: suffixes count should be bigger than breakpoints count by 1
    // suffixes-count = breakpoints-count + 1
}
```

In that example was redefined breakpoints and suffix names.
