import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not defined in .env file");
}

type AppClerkProviderProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AppClerkProvider({ children }: AppClerkProviderProps) {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
      {children}
    </ClerkProvider>
  );
}
