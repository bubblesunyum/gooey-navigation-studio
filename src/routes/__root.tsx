import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LiquidBackground } from "@/components/LiquidBackground";
import { MorphNav } from "@/components/MorphNav";
import { GooFilter } from "@/components/GooFilter";
import { NavProvider } from "@/lib/nav-context";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-8 text-center">
        <h1 className="text-6xl">404</h1>
        <p className="mt-3 text-muted-foreground">this page drifted off into the bokeh.</p>
        <div className="mt-6">
          <Link to="/" className="rounded-full bg-foreground px-5 py-2 text-primary-foreground">
            back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md rounded-3xl p-8 text-center">
        <h1 className="text-2xl">something popped.</h1>
        <p className="mt-2 text-sm text-muted-foreground">try again, or head home.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-foreground px-4 py-2 text-sm text-primary-foreground"
          >try again</button>
          <a href="/" className="rounded-full border border-white/20 px-4 py-2 text-sm">home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "bubbles — ux/ui/product designer" },
      { name: "description", content: "i design delightful things for good causes." },
      { property: "og:title", content: "bubbles — ux/ui/product designer" },
      { property: "og:description", content: "i design delightful things for good causes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,700;1,9..144,900&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Caveat:wght@500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <NavProvider>
        <LiquidBackground />
        <GooFilter />
        <div className="mx-auto w-full max-w-[1920px]">
          <Outlet />
        </div>
        <MorphNav />
      </NavProvider>
    </QueryClientProvider>
  );
}
