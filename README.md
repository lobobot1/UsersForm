# UsersForms

This project works with [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/router-handlers) feature of [NextJS](https://nextjs.org/docs) and [Prisma.io](https://www.prisma.io/docs/getting-started) as ORM.

## First needs clone this repositorie

```bash
git clone https://github.com/lobobot1/UsersForm.git
```

or

```bash
gh repo clone lobobot1/UsersForm
```

by default does not work without setting up an env file like `.env.local` or `.env` in the root directory with all variables declared inside `.env.example`.

It is also necessary to pay attention to the scripts inside `package.json` like `win:seed:prod` or any other.

With this in the `prisma/seed.js` file the `NODE_ENV` variable is used which has three possible values `"production" | "development" | "test"` depending on this variable the file takes a different behavior.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Getting Started with Docker compose

First create the .env file from the .env.example file. Where we can configure the hostname, the base url and the database url from where this application works.
After that run the following command:

```bash
# from the UsersForm project directory
docker compose up
```

This builds the production image from the repository and configures all the initial parameters, with this if we have any updates we only need to add the `--build` flag to rebuild the image with the updates.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

_For code inquiries or performance problems contact with us_
