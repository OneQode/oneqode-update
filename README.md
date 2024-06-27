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

# Credits: Resources Used

|                                                              | TYPE            | WHERE USED             | FUNCTIONALITY         | LICENSE                                                     |
| :----------------------------------------------------------- | :-------------- | :--------------------- | :-------------------- | :---------------------------------------------------------- |
| [**Eleventy**](https://11ty.dev/)                            | NodeJS          | Development            | Static Site Generator | [MIT](https://opensource.org/licenses/MIT)                  |
| [**Swiper**](https://swiperjs.com/)                          | Javascript, CSS | Website                | Sliders               | [MIT](https://opensource.org/licenses/MIT)                  |
| [**Lazy-Loading   Video**](https://web.dev/lazy-loading-video/) | Javascript      | Website                | Performance           | [Apache   2.0](https://www.apache.org/licenses/LICENSE-2.0) |
| [**Pulse Effect**](https://www.florin-pop.com/blog/2019/03/css-pulse-effect/) | CSS             | Website - Maps         | Style                 | Unknown                                                     |
| [**Scrollbar Style**](https://codepen.io/devstreak/pen/dMYgeO?editors=0100) | CSS             | Website - Cloud Page   | Style                 | Unknown                                                     |
| [**Bootstrap   Icons**](https://icons.getbootstrap.com/)     | SVG             | Website - All Pages    | Graphics              | [MIT](https://opensource.org/licenses/MIT)                  |
| [**Hero Patterns**](https://heropatterns.com/)               | CSS             | Website - Qode Page    | Graphics              | [CC BY   4.0](https://creativecommons.org/licenses/by/4.0/) |
| [**Hack**](https://sourcefoundry.org/hack/)                  | Font            | Website                | Style                 | [MIT](https://opensource.org/licenses/MIT)                  |
| [**Fittext   JS**](https://github.com/adactio/FitText.js)    | Javascript      | Website - About Page   | Style                 | [WTFPL](http://www.wtfpl.net/)                              |
| [**intl-tel-input**](https://github.com/jackocnr/intl-tel-input) | Javascript      | Website - Cloud Signup | Validation            | [MIT](https://opensource.org/licenses/MIT)                  |
