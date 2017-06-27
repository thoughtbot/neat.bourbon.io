[<img src="http://images.thoughtbot.com/bourbon/neat-logo-v2.svg" width="200" alt="Neat logo">][Neat website]

# Neat Website

This is the source code for the [Neat website]. It’s built with [Middleman].

You can find the [Neat Sass library source code here][library repo].

[Neat website]: http://neat.bourbon.io
[Middleman]: https://middlemanapp.com
[library repo]: https://github.com/thoughtbot/neat

## Setup

1. Get the code:

    ```
    git clone https://github.com/thoughtbot/neat.bourbon.io.git
    ```

1. Set up your machine:

    ```
    bin/setup
    ```

1. Run the app:

    ```
    bundle exec middleman
    ```

    ```
    open http://localhost:4567
    ```

## Generate Documentation

Neat uses [SassDoc] to document its source code. For this website, we use
Rake tasks to run SassDoc’s CLI, which parses documentation-specific comments
from [Neat’s source] and outputs them as versioned JSON files
(e.g. [`neat_2_0_0.json`]). We then use a [proxy] in Middleman to generate
unique pages for each version.

To generate documentation for the gem version specified in the `Gemfile`, run:

```
rake generate
```

You can also generate documentation for the gem version from GitHub by using the
`generate_for` command:

```
rake generate_for 2.0.0
```

[SassDoc]: http://sassdoc.com/
[Neat’s source]: https://github.com/thoughtbot/neat/
[`neat_2_0_0.json`]: data/neat_2_0_0.json
[proxy]: https://middlemanapp.com/advanced/dynamic_pages/

## Hosting & Deployment

The website is hosted on [Netlify], and is automatically built and deployed when
changes are pushed to the `master` branch. Credentials for Netlify can be found
in 1Password.

[Netlify]: https://www.netlify.com/

## Front-end Architecture

This project uses:

- Sass, with Bourbon
- [BEM]-style CSS class names
  - `library/`: Global variables, mixins and functions; all non-rendering Sass
  - `base/`: Unclassed HTML elements (e.g. `a {}`, `input {}`)
  - `patterns/`: Abstractions, highly reusable pieces of style that are used in
    any number of unrelated contexts (e.g. `.media {}`)
  - `components/`: Discrete, implementation-specific piece of UI
    (e.g. `.site-nav {}`)
  - `views/`: An object who's styles are modified by the view's body class
    (e.g. `.page-index {}`)
- Autoprefixer
- SCSS-Lint, with Hound ([configuration](.scss-lint.yml))
- A variety of CSS units:
  - `em` for typographical-related elements
  - `rem` for lengths related to components
  - `px` for borders, text shadows, etc.
  - `vw`/`vh` for lengths that should be relational to the viewport
- `modular-scale()` (which outputs `em` values) for font sizes

[BEM]: http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax
