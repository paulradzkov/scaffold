# Scaffold

Experiment with project file-structure and documentation. With static sites in mind.

## What I want to build

It is a template for a site with components documentation.

## Gulp tasks

`gulp cleanpublic` — delete `public` folder.  
`gulp cleansrc` — removes `*.map` files srom `src/ui` folder.

`gulp renderless` — compiles `*.less` to `*.css`.  
`gulp renderscss` — compiles `*.scss` to `*.css`.  
`gulp csspost` — postcss processing.  
`gulp lintcss` — lint style sources.

`gulp watcher` — watch changes and recompile.
`gulp build` — clean and build project.  
`gulp dev` — clean, build and watch.  
`gulp` — same as build.
