import { Link } from "@tanstack/react-router";

import TanchatHeader from "@/integrations/tanchat/header-user";
import HeaderUser from "@/integrations/clerk/header-user";
import { SignedIn } from "@clerk/clerk-react";

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between w-full">
      <nav className="flex gap-4 font-bold">
        <SignedIn>
          <Link to="/">Home</Link>
          <Link to="/demo/tanstack-query">TanStack Query</Link>
          <Link to="/demo/start/server-funcs">Start - Server Functions</Link>
          <Link to="/demo/start/api-request">Start - API Request</Link>
          <Link to="/example/chat">Chat</Link>
          <Link to="/example/guitars">Guitar Demo</Link>
          <Link to="/demo/store">Store</Link>
        </SignedIn>
      </nav>

      <div className="flex gap-4 self-end">
        <HeaderUser />
        <TanchatHeader />
      </div>
    </header>
  );
}
