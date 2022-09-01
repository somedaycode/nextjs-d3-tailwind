module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
      url: ['http://localhost:3000'],
      numberOfRuns: 2,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    server: {},
    wizard: {},
  },
};
