let gulp = require("gulp"),
  { src, dest } = require("gulp"),
  file_include = require("gulp-file-include"),
  project_folder = require("path").basename(__dirname),
  // project_folder = "dist",
  source_folder = "app",
  sass = require("gulp-sass"),
  browser_Sync = require("browser-sync").create(),
  uglify = require("gulp-uglify-es").default,
  concat = require("gulp-concat"),
  rename = require("gulp-rename"),
  group_media = require("gulp-group-css-media-queries"),
  imagemin = require("gulp-imagemin"),
  webp = require("gulp-webp"),
  webp_html = require("gulp-webp-html"),
  webpcss = require("gulp-webpcss"),
  del = require("del"),
  ttf2woff = require("gulp-ttf2woff"),
  ttf2woff2 = require("gulp-ttf2woff2"),
  fonter = require("gulp-fonter"),
  fs = require("fs");
let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
  },
  src: {
    html: [source_folder + "/*.html", `!${source_folder}/_*.html`],
    css: [source_folder + "/scss/*.scss", `!${source_folder}/_*.scss`],
    js: source_folder + "/js/main.js",
    img: source_folder + "/img/*.*",
    fonts: source_folder + "/fonts/*.*",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.*",
  },
  clean: `./${project_folder}/`,
};

function browserSync(params) {
  browser_Sync.init({
    server: {
      baseDir: `./${project_folder}/`,
    },
    port: 3000,
    notify: false,
  });
}

function html() {
  return src(path.src.html)
    .pipe(file_include())
    .pipe(webp_html())
    .pipe(dest(path.build.html))
    .pipe(browser_Sync.stream());
}
function jsLibrery() {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/slick-carousel/slick/slick.js",
      // "node_modules/slick-carousel/slick/slick.js",
      // "node_modules/gsap/dist/gsap.min.js",
      // "node_modules/magnific-popup/dist/jquery.magnific-popup.js",
    ])
    .pipe(concat("_libs.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/js/"))
    .pipe(browser_Sync.stream());
}
function js() {
  return (
    src(path.src.js)
      .pipe(file_include())
      // .pipe(concat("main.js"))
      .pipe(dest(path.build.js))
      .pipe(uglify())
      .pipe(rename({ suffix: ".min" }))
      .pipe(dest(path.build.js))
      .pipe(browser_Sync.stream())
  );
}
function cssLibs() {
  return src([
    "node_modules/normalize.css/normalize.css",
    "node_modules/slick-carousel/slick/slick.css",
    // "node_modules/magnific-popup/dist/magnific-popup.css",
  ])
    .pipe(concat("_libs.scss"))
    .pipe(gulp.dest("app/scss"))
    .pipe(browser_Sync.stream());
}
function scss() {
  return src(path.src.css)
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(group_media())
    .pipe(
      webpcss({
        baseClass: ".webp1",
        replace_from: /\.(png|jpg|jpeg)/,
        replace_to: ".webp",
      })
    )
    .pipe(gulp.dest(path.build.css))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest(path.build.css))
    .pipe(browser_Sync.stream());
}
function fonts() {
  src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));
  return src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
}
gulp.task("otf2ttf", function () {
  return src([source_folder + "/fonts/*.otf"])
    .pipe(fonter({ formats: ["ttf"] }))
    .pipe(dest(source_folder + "/fonts/"));
});

function images() {
  return src(path.src.img)
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 3,
        svgoPlugins: [
          {
            removeViewBox: false,
          },
        ],
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browser_Sync.stream());
}
function fontsStyle() {
  let file_content = fs.readFileSync(source_folder + "/scss/_fonts.scss");
  if (file_content == "") {
    fs.writeFile(source_folder + "/scss/_fonts.scss", "", cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (let i = 0; i < items.length; i++) {
          let fontname = items[i].split(".");
          fontname = fontname[0];
          if (c_fontname != fontname[0]) {
            fs.appendFile(
              source_folder + "/scss/_fonts.scss",
              '@include font("' +
                fontname +
                '", "' +
                fontname +
                '", "400", "normal");\r\n',
              cb
            );
          }
          c_fontname = fontname;
        }
      }
    });
  }
}
function cb() {}
function clean() {
  return del(path.clean);
}

function watchFile() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], scss);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}
let build = gulp.series(
  clean,
  cssLibs,
  jsLibrery,
  scss,
  gulp.parallel(js, html, images, fonts),
  fontsStyle
);
let watch = gulp.parallel(watchFile, build, browserSync);

exports.html = html;
exports.fonts = fonts;
exports.fontsStyle = fontsStyle;
exports.scss = scss;
exports.cssLibs = cssLibs;
exports.js = js;
exports.jsLibrery = jsLibrery;
exports.images = images;
exports.build = build;
exports.watch = watch;
exports.default = watch;
