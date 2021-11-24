import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Product, Stock } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const productIndex = cart.findIndex(
        (product) => product.id === productId
      );

      if (productIndex < 0) {
        const response = await api.get<Product>(`products/${productId}`);

        const productInsert = { ...response.data, amount: 1 };

        setCart([...cart, productInsert]);
      } else {
        const responseStock = await api.get<Stock>(`stock/${productId}`);
        const amountStock = responseStock.data.amount;

        const amountCart = cart[productIndex].amount;

        const hasProductStock = amountStock > amountCart;

        if (hasProductStock) {
          const updatedCart = cart.map((product) => {
            if (product.id === productId) {
              product.amount += 1;
            }
            return product;
          });

          setCart(updatedCart);
        } else {
          toast.error("Quantidade solicitada fora de estoque");
        }
      }
    } catch {
      toast.error("Erro na adição do produto");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updateProductRemoved = cart.filter(
        (product) => product.id !== productId
      );

      setCart(updateProductRemoved);
    } catch {
      toast.error("Erro na remoção do produto");
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      const responseStock = await api.get(`stock/${productId}`);
      const amountStock = responseStock.data.amount;

      const amountCart = amount;

      const hasProductStock = amountStock >= amountCart;

      if (hasProductStock) {
        const UpdatedCart = cart.map((product) => {
          if (productId === product.id) {
            return { ...product, amount: amount };
          }

          return product;
        });
        setCart(UpdatedCart);
      } else {
        toast.error("Quantidade solicitada fora de estoque");
      }
    } catch {
      toast.error("Erro na adição do produto");
    }
  };

  useEffect(() => {
    localStorage.setItem("@RocketShoes:cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
