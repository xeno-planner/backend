npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel ../../prisma/schema.prisma \
  --script > ../../prisma/output.sql