## Hackfest Website

### Colors (Renamed)
- ~~primary~~ base
- ~~secondary~~ supporting
- tertiary
- ~~accent1~~ highlight1
- ~~accent2~~ highlight2

### Directory Structure

```bash
├── README.md
├── bun.lockb
├── next.config.js
├── package.json
├── postcss.config.js
├── prisma
│   └── schema.prisma
├── public
│   ├── buttons
│   │   ├── ...
│   ├── favicons
│   │   ├── ...
│   ├── images
│   │   ├── ...
│   └── logos
│       ├── ...
├── src
|   ├── middleware.ts
│   ├── app
│   │   ├── (admin)
│   │   │   ├── admin
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (routes)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── ...
│   │   ├── api
│   │   │   └── auth
│   │   │       └── [...nextauth]
│   │   │           └── route.ts
│   │   ├── globals.css
│   │   └── hooks
│   │       ├── ...
│   ├── components
│   │   ├── ...
│   ├── lib
│   │   ├── ...
│   │   ├── utils
│   │   │   ├── ...
│   │   └── zod-schema.ts
│   ├── server
│   │   ├── actions.ts
│   │   └── serverConfig.ts
│   └── types
│       └── index.d.ts
├── tailwind.config.ts
└── tsconfig.json
```

> [!NOTE]
>
> - `/public/favicon` - all favicon files
> - `/public/images` - all types of images except logos
> - `/src/middleware.ts` - currently empty, protecting routes is possible but db queries cannot be run until next-auth v5 stable release is made
> - `/src/(admin)` - route group containing routes only to be used by admin
> - `/src/(routes)` - route groups containing all routes except admin routes
> - `/src/hooks` - contains custom hooks
> - `/src/components` - folders with component names and main export from index.tsx in each
> - `/src/lib/utils` - helper functions, custom code
> - `/src/lib/zod-schema.ts` - zod schema for server action validations
> - `/src/server/actions.ts` - server actions
> - `/src/server/serverConfig.ts` - exports adminAction, publicAction & protectedAction (inspired by t3-stack)
> - `/src/types/index.d.ts` - all custom type definitions
