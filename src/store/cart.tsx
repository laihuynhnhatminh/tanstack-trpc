import { useContext, createContext, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { useTRPC } from "@/trpc/react";
import { useMutation, useQuery } from "@tanstack/react-query";

function useCartStore() {
  const { isSignedIn } = useUser();
  const trpc = useTRPC();

  const { data: cart, refetch } = useQuery({
    ...trpc.cart.get.queryOptions(),
    enabled: isSignedIn,
    initialData: { guitars: [] },
  });

  const { data: guitars } = useQuery({
    ...trpc.guitars.list.queryOptions(),
  });

  const { mutate: addToCartMutation } = useMutation({
    ...trpc.cart.add.mutationOptions(),
    onSuccess: () => {
      refetch();
    },
  });

  const addToCart = useCallback(
    (id: number) => {
      addToCartMutation({ id });
    },
    [addToCartMutation]
  );

  return {
    cart: cart?.guitars || [],
    guitars,
    addToCart,
  };
}

const CartStoreContext = createContext<ReturnType<typeof useCartStore> | null>(
  null
);

type CartStoreProviderProps = Readonly<{
  children: React.ReactNode;
}>;

export const CartStoreProvider = ({ children }: CartStoreProviderProps) => {
  return (
    <CartStoreContext.Provider value={useCartStore()}>
      {children}
    </CartStoreContext.Provider>
  );
};

export function useStore() {
  const context = useContext(CartStoreContext);
  if (!context) {
    throw new Error("useStore must be used within a CartStoreProvider");
  }
  return context;
}
