module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://zacharyjameson@localhost/noteful-test",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://zacharyjameson@localhost/noteful",
};
