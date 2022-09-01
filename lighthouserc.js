module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
      url: ['http://localhost:3000'],
      numberOfRuns: 2,
    },
    assert: {},
    upload: {
      target: 'temporary-public-storage',
    },
    server: {},
    wizard: {},
  },
};
