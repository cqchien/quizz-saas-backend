module.exports = {
  lang: 'en-US',
  title: 'Quizz Saas',
  description: 'Quizz Saas',
  base: process.env.DEPLOY_ENV ??  '/',
  themeConfig: {
    sidebar: [
      ['/', 'Introduction'],
      '/docs/development',
      '/docs/architecture',
      '/docs/naming-cheatsheet',
      // '/docs/routing',
      // '/docs/state',
      '/docs/linting',
      // '/docs/editors',
      // '/docs/production',
      // '/docs/troubleshooting',
    ],
  },
};
