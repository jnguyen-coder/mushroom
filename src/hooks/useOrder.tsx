import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  type ReactNode,
  type Dispatch,
} from 'react';

// ── Types ──────────────────────────────────────────────────────────────────

export type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export type CheckoutStep = 'shopping' | 'checkout' | 'confirmation';
export type FulfillmentMethod = 'pickup' | 'delivery';
export type PaymentMethod = 'square' | 'etransfer';

export type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
};

export type DeliveryAddress = {
  street: string;
  city: string;
  province: string;
  postalCode: string;
};

export type OrderState = {
  cart: Record<string, CartItem>;
  checkoutStep: CheckoutStep;
  customer: CustomerInfo;
  fulfillment: FulfillmentMethod;
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  specialInstructions: string;
  orderId: string | null;
};

// ── Actions ────────────────────────────────────────────────────────────────

type OrderAction =
  | { type: 'ADD_ITEM'; id: string; name: string; price: number }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'INCREMENT_ITEM'; id: string }
  | { type: 'DECREMENT_ITEM'; id: string }
  | { type: 'SET_CUSTOMER'; payload: Partial<CustomerInfo> }
  | { type: 'SET_FULFILLMENT'; payload: FulfillmentMethod }
  | { type: 'SET_DELIVERY_ADDRESS'; payload: Partial<DeliveryAddress> }
  | { type: 'SET_PAYMENT_METHOD'; payload: PaymentMethod }
  | { type: 'SET_SPECIAL_INSTRUCTIONS'; payload: string }
  | { type: 'GO_TO_CHECKOUT' }
  | { type: 'GO_TO_SHOPPING' }
  | { type: 'COMPLETE_ORDER'; orderId: string }
  | { type: 'RESET_ORDER' };

// ── Initial state ──────────────────────────────────────────────────────────

const initialState: OrderState = {
  cart: {},
  checkoutStep: 'shopping',
  customer: { name: '', email: '', phone: '' },
  fulfillment: 'pickup',
  deliveryAddress: { street: '', city: 'Vancouver', province: 'BC', postalCode: '' },
  paymentMethod: 'square',
  specialInstructions: '',
  orderId: null,
};

// ── Reducer ────────────────────────────────────────────────────────────────

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.cart[action.id];
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.id]: {
            id: action.id,
            name: action.name,
            quantity: (existing?.quantity ?? 0) + 1,
            price: action.price,
          },
        },
      };
    }
    case 'REMOVE_ITEM': {
      const { [action.id]: _, ...rest } = state.cart;
      return { ...state, cart: rest };
    }
    case 'INCREMENT_ITEM': {
      const item = state.cart[action.id];
      if (!item) return state;
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.id]: { ...item, quantity: item.quantity + 1 },
        },
      };
    }
    case 'DECREMENT_ITEM': {
      const item = state.cart[action.id];
      if (!item) return state;
      if (item.quantity <= 1) {
        const { [action.id]: _, ...rest } = state.cart;
        return { ...state, cart: rest };
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.id]: { ...item, quantity: item.quantity - 1 },
        },
      };
    }
    case 'SET_CUSTOMER':
      return { ...state, customer: { ...state.customer, ...action.payload } };
    case 'SET_FULFILLMENT':
      return { ...state, fulfillment: action.payload };
    case 'SET_DELIVERY_ADDRESS':
      return { ...state, deliveryAddress: { ...state.deliveryAddress, ...action.payload } };
    case 'SET_PAYMENT_METHOD':
      return { ...state, paymentMethod: action.payload };
    case 'SET_SPECIAL_INSTRUCTIONS':
      return { ...state, specialInstructions: action.payload };
    case 'GO_TO_CHECKOUT':
      return { ...state, checkoutStep: 'checkout' };
    case 'GO_TO_SHOPPING':
      return { ...state, checkoutStep: 'shopping' };
    case 'COMPLETE_ORDER':
      return { ...state, checkoutStep: 'confirmation', orderId: action.orderId };
    case 'RESET_ORDER':
      return { ...initialState };
    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────────────────────

type OrderContextValue = {
  state: OrderState;
  dispatch: Dispatch<OrderAction>;
  // Convenience accessors (mirror state fields)
  cart: Record<string, CartItem>;
  checkoutStep: CheckoutStep;
  customer: CustomerInfo;
  fulfillment: FulfillmentMethod;
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  specialInstructions: string;
  orderId: string | null;
  // Derived
  items: CartItem[];
  itemCount: number;
  totalPounds: number;
  subtotal: number;
  isEmpty: boolean;
  // Action helpers
  addItem: (id: string, name: string, price: number) => void;
  removeItem: (id: string) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  setCustomer: (info: Partial<CustomerInfo>) => void;
  setFulfillment: (method: FulfillmentMethod) => void;
  setDeliveryAddress: (address: Partial<DeliveryAddress>) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setSpecialInstructions: (instructions: string) => void;
  goToCheckout: () => void;
  goToShopping: () => void;
  completeOrder: (orderId: string) => void;
  resetOrder: () => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);

// ── Provider ───────────────────────────────────────────────────────────────

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const items = useMemo(() => Object.values(state.cart), [state.cart]);
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalPounds = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity * i.price, 0),
    [items],
  );
  const isEmpty = useMemo(() => items.length === 0, [items]);

  const addItem = useCallback(
    (id: string, name: string, price: number) => dispatch({ type: 'ADD_ITEM', id, name, price }),
    [],
  );
  const removeItem = useCallback((id: string) => dispatch({ type: 'REMOVE_ITEM', id }), []);
  const incrementItem = useCallback((id: string) => dispatch({ type: 'INCREMENT_ITEM', id }), []);
  const decrementItem = useCallback((id: string) => dispatch({ type: 'DECREMENT_ITEM', id }), []);
  const setCustomer = useCallback(
    (payload: Partial<CustomerInfo>) => dispatch({ type: 'SET_CUSTOMER', payload }),
    [],
  );
  const setFulfillment = useCallback(
    (payload: FulfillmentMethod) => dispatch({ type: 'SET_FULFILLMENT', payload }),
    [],
  );
  const setDeliveryAddress = useCallback(
    (payload: Partial<DeliveryAddress>) => dispatch({ type: 'SET_DELIVERY_ADDRESS', payload }),
    [],
  );
  const setPaymentMethod = useCallback(
    (payload: PaymentMethod) => dispatch({ type: 'SET_PAYMENT_METHOD', payload }),
    [],
  );
  const setSpecialInstructions = useCallback(
    (payload: string) => dispatch({ type: 'SET_SPECIAL_INSTRUCTIONS', payload }),
    [],
  );
  const goToCheckout = useCallback(() => dispatch({ type: 'GO_TO_CHECKOUT' }), []);
  const goToShopping = useCallback(() => dispatch({ type: 'GO_TO_SHOPPING' }), []);
  const completeOrder = useCallback(
    (orderId: string) => dispatch({ type: 'COMPLETE_ORDER', orderId }),
    [],
  );
  const resetOrder = useCallback(() => dispatch({ type: 'RESET_ORDER' }), []);

  const value = useMemo<OrderContextValue>(
    () => ({
      state,
      dispatch,
      cart: state.cart,
      checkoutStep: state.checkoutStep,
      customer: state.customer,
      fulfillment: state.fulfillment,
      deliveryAddress: state.deliveryAddress,
      paymentMethod: state.paymentMethod,
      specialInstructions: state.specialInstructions,
      orderId: state.orderId,
      items,
      itemCount,
      totalPounds,
      subtotal,
      isEmpty,
      addItem,
      removeItem,
      incrementItem,
      decrementItem,
      setCustomer,
      setFulfillment,
      setDeliveryAddress,
      setPaymentMethod,
      setSpecialInstructions,
      goToCheckout,
      goToShopping,
      completeOrder,
      resetOrder,
    }),
    [state, items, itemCount, totalPounds, subtotal, isEmpty],
  );

  return <OrderContext value={value}>{children}</OrderContext>;
}

// ── Hook ───────────────────────────────────────────────────────────────────

export function useOrder(): OrderContextValue {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return ctx;
}
