FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app

COPY package.json yarn.lock* ./
# yarn.lock package대로만 동일하게 설치 (최신버전 설치 x)
# --production == devDependency 노설치
RUN yarn --frozen-lockfile
# 먼저 캐쉬 삭제해서 경량화
RUN rm -rf ./.next/cache

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_KAKAO_LOGIN_URI
RUN touch .env.production
RUN echo "NEXT_PUBLIC_KAKAO_LOGIN_URI=${NEXT_PUBLIC_KAKAO_LOGIN_URI}" > .env.production
ENV NODE_ENV production

RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /usr/src/app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /usr/src/app/public ./public
# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
# standalone == nextjs에서 자동으로 배포에 필요한 파일들만 추출해서 독립 실행 가능하게 모아줌
# public , static 폴더는 standalone에 포함되지 않으므로 따로 복사
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]