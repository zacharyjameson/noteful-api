module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgres://kyquqxermxrmhz:ed3d7b68c560635b917bf17fce9a22c87b49d6e1563e37a8a4b67330f46f8364@ec2-52-45-73-150.compute-1.amazonaws.com:5432/df64as3tcmtemb",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://dunder_mifflin@localhost/noteful-test",
};
