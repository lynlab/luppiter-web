const sassData = `
@import "@/resources/colors.scss";
@import "@/resources/views.scss";
`;

module.exports = {
  css: {
    loaderOptions: {
      sass: { data: sassData },
    },
  },
};
