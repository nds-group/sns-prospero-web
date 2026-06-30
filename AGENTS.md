## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Image Guidelines (Ecotech Sovereignty)

When adding stock images or photos (such as in the Hero or content cards), ensure they align with the PROSPERO "Ecotech Sovereignty" visual identity:

1.  **Themes**: Images should feature advanced 6G networking, clean/green energy data centers, AI automation (smart factories), or glassmorphism technology aesthetics.
2.  **Color Filtering**: To maintain harmony and ensure white text readability, apply a CSS color filter to raw stock images so they blend with the primary (`#0d564e`) and sovereign blue (`#0B2E59`) palettes.
    -   *Example Tailwind classes for hero images*: `mix-blend-multiply opacity-50` layered under a `bg-gradient-to-br from-primary to-sovereign-blue`.
    -   Alternatively, images can be manually tinted in an editor before uploading.
3.  **Generated Assets**: Some placeholder images have been generated and placed in `public/images/stock/`. These already follow the color and thematic guidelines.
