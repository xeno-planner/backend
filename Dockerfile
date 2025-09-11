# Stage 1: Build the application
FROM node:20.9.0-alpine AS build
RUN apk add --no-cache openssl
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .
# 1.1: Sync database
RUN npx prisma generate
RUN yarn migrate:dev --name docker
# 1.2: Build the app
RUN yarn build

# Stage 2: Run the application
FROM node:20.9.0-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 4242
CMD ["node", "dist/main.js"]