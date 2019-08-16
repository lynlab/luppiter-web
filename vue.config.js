const sassData = `
@import "@/resources/colors.scss";
@import "@/resources/views.scss";

@import '~pretty-checkbox/src/pretty-checkbox.scss';
`;

module.exports = {
  css: {
    loaderOptions: {
      sass: { data: sassData },
    },
  },
};
