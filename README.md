# OneQode Website

This is the previous version of the OneQode website, built in the [Eleventy](https://www.11ty.dev/) static site generator and hosted with [Netlify](https://www.netlify.com/).

![Screenshot of OneQode Website](https://gu.api.ocs.oneqode.com:6780/swift/v1/AUTH_0f61efa50b30415cad2fe1a17d003a06/OneQode/oq-2023-website.jpg)

To get started,

```npm install```

then

```npx @11ty/eleventy --serve --quiet```

This will launch a local version of the site at https://localhost:8080/.

If you change and save a file, the build process will instantly rerun, and your browser will refresh right away.

Once you’re happy with your changes, update the main branch and push to Github. Netlify will then rebuild the live site and it will be updated within 1 minute.

Any questions, ask me (Joe).

# Bash Alias Recommendations

```nano ~/.bashrc```

```
alias 11ty='npx @11ty/eleventy --serve --quiet'
alias 11tyb='npx @11ty/eleventy'
```
