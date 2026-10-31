# Carousel

Use `b-ui="carousel"` for a CDN-ready carousel component.

## CDN install requirements

Load the pinned Nodex UI CSS and JavaScript files; no extra dependency is required for this component.

## Nodex UI component

```js
import { Carousel, CarouselNext, CarouselPrevious, CarouselSlide } from "nodexui";
```

```base-ui
<div style="max-width: 20rem; width: 100%">
  <Carousel slideCount="5" defaultIndex="0">
    <CarouselSlide index="0">
      <Card className="'w-100'">
        <CardBody className="'d-flex align-items-center justify-content-center' + ' ratio ratio-1x1'">
          <span class="fs-1 fw-semibold">1</span>
        </CardBody>
      </Card>
    </CarouselSlide>
    <CarouselSlide index="1">
      <Card className="'w-100'">
        <CardBody className="'d-flex align-items-center justify-content-center' + ' ratio ratio-1x1'">
          <span class="fs-1 fw-semibold">2</span>
        </CardBody>
      </Card>
    </CarouselSlide>
    <CarouselSlide index="2">
      <Card className="'w-100'">
        <CardBody className="'d-flex align-items-center justify-content-center' + ' ratio ratio-1x1'">
          <span class="fs-1 fw-semibold">3</span>
        </CardBody>
      </Card>
    </CarouselSlide>
    <CarouselSlide index="3">
      <Card className="'w-100'">
        <CardBody className="'d-flex align-items-center justify-content-center' + ' ratio ratio-1x1'">
          <span class="fs-1 fw-semibold">4</span>
        </CardBody>
      </Card>
    </CarouselSlide>
    <CarouselSlide index="4">
      <Card className="'w-100'">
        <CardBody className="'d-flex align-items-center justify-content-center' + ' ratio ratio-1x1'">
          <span class="fs-1 fw-semibold">5</span>
        </CardBody>
      </Card>
    </CarouselSlide>
    <CarouselPrevious><Icon name="'arrow-left'"/></CarouselPrevious>
    <CarouselNext><Icon name="'arrow-right'"/></CarouselNext>
  </Carousel>
</div>
```

| Component | Prop | Type | Notes |
| --- | --- | --- | --- |
| `Carousel` | `slideCount` | `Number` | required |
| `Carousel` | `defaultIndex` | `Number` | optional |
| `Carousel` | `onChange` | `Function` | optional |
| `Carousel` | `className` | `String` | optional |
| `CarouselNext` | `className` | `String` | optional |
| `CarouselPrevious` | `className` | `String` | optional |
| `CarouselSlide` | `index` | `Number` | required |
| `CarouselSlide` | `className` | `String` | optional |

See [Nodex UI Component](/index.html#/docs/guide/owl-components) for how to load `nodexui` and `dist/nodexui.templates.xml`.

The whole group shares a single live `bootstrap.Carousel` instance, owned by the root `Carousel`/`b-ui="carousel"` element: the root always carries classes `carousel slide` and wraps its slides in a `.carousel-inner` container, each `CarouselSlide`/`b-carousel-slide` renders permanently as a `.carousel-item` (exactly one carrying `.active` at a time) — don't rely on node removal to detect the active slide. `CarouselPrevious`/`CarouselNext` (and the static `[b-carousel-prev]`/`[b-carousel-next]` buttons) call `.prev()`/`.next()` on that shared instance directly; the built-in `wrap: true` handles wrap-around at both ends and `interval: false` keeps autoplay off.

## Static component

```base-ui
<div b-ui="carousel">
  <section b-carousel-slide>Slide A</section>
  <section b-carousel-slide>Slide B</section>
  <button b-carousel-prev type="button">Prev</button>
  <button b-carousel-next type="button">Next</button>
</div>
```

The static adapter builds the `.carousel-inner`/`.carousel-item` wrapper structure at mount time from the flat authored `[b-carousel-slide]` markup (no wrapper needed in the HTML you author) and syncs `b-att-state` (`active`/`inactive`) on each slide from the built-in `slid.bs.carousel` event.

## Enhanced usage

Call `thebase.mount(element)` or rely on `thebase.mountAll()` after the script loads.

## Options and attributes

See `dist/nodexui.registry.json` for the supported attribute list.

## Methods

Use the global runtime methods: `thebase.mount()`, `thebase.mountAll()`, and `thebase.destroy()`.

## Events

Interactive components emit documented `nodexui:*` events from their root element. `nodexui:change` fires with `{ index }` off the real `slid.bs.carousel` event.

## CSS variables

The component inherits Nodex UI semantic tokens such as `--b-surface`, `--b-border`, `--b-primary`, and `--b-radius`.

## Accessibility behavior

The component preserves authored semantic HTML and adds ARIA roles or state attributes where enhancement is required.

## Examples

See `examples/index.html` for a working CDN-style page.

## Browser support

Nodex UI targets modern evergreen browsers that support ES modules, CSS variables.

## Test checklist

Verify light and dark themes, keyboard access for focusable controls, disabled or readonly states when applicable, and cleanup through `thebase.destroy()`.
