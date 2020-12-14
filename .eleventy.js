const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const CleanCSS = require("clean-css");
module.exports = function(eleventyConfig) {
	// Copy following paths across
	eleventyConfig.addPassthroughCopy("js");
	eleventyConfig.addPassthroughCopy("css");
	eleventyConfig.addPassthroughCopy("img");
	// Set template types
	eleventyConfig.setTemplateFormats([
		"liquid",
		"png",
		"svg",
		"njk",
		"md",
		"ics"
	]);
	// Set data format
	eleventyConfig.addFilter("readableDate", dateObj => {
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
	});
	// RSS Plugin
	eleventyConfig.addPlugin(pluginRss);
	// CSS Minification
	eleventyConfig.addFilter("cssmin", function(code) {
		return new CleanCSS({}).minify(code).styles;
	});
}