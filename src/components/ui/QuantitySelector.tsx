type QuantitySelectorProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  productName: string;
};

export default function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
  productName,
}: QuantitySelectorProps) {
  if (quantity === 0) {
    return (
      <button
        onClick={onIncrement}
        aria-label={`Add ${productName}`}
        className="bg-text-primary text-white rounded-full px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
      >
        Add
      </button>
    );
  }

  return (
    <div className="inline-flex items-center gap-1 bg-cream/60 rounded-full px-1 py-1">
      <button
        onClick={onDecrement}
        aria-label={`Remove one pound of ${productName}`}
        className="w-7 h-7 rounded-full border border-bone flex items-center justify-center text-text-primary hover:bg-bone text-sm transition-colors"
      >
        -
      </button>
      <span className="text-sm font-semibold min-w-[3rem] text-center">
        {quantity} lb
      </span>
      <button
        onClick={onIncrement}
        aria-label={`Add one pound of ${productName}`}
        className="w-7 h-7 rounded-full border border-bone flex items-center justify-center text-text-primary hover:bg-bone text-sm transition-colors"
      >
        +
      </button>
    </div>
  );
}
