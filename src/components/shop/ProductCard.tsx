import { type Mushroom, PRICE_PER_LB } from '../../lib/mushrooms';
import QuantitySelector from '../ui/QuantitySelector';

interface ProductCardProps {
  mushroom: Mushroom;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onImageClick: () => void;
}

export default function ProductCard({
  mushroom,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
  onImageClick,
}: ProductCardProps) {
  const hasItems = quantity > 0;

  return (
    <div
      className={`flex items-center p-3 md:p-4 rounded-xl border transition-all card-hover ${
        hasItems
          ? 'border-accent/20 bg-ivory/50'
          : 'border-bone/60 bg-white'
      }`}
    >
      {/* Product image */}
      <div
        className="w-20 h-20 md:w-28 md:h-28 rounded-xl shrink-0 cursor-pointer overflow-hidden bg-cream"
        onClick={onImageClick}
      >
        <img
          src={mushroom.image}
          alt={mushroom.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).parentElement!.classList.add('img-placeholder');
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 pl-3 md:pl-4">
        <h3 className="font-semibold text-sm md:text-base text-text-primary">
          {mushroom.name}
        </h3>
        <p className="text-xs md:text-sm text-text-secondary line-clamp-1 md:line-clamp-2 mt-0.5">
          {mushroom.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-semibold text-accent">
            ${PRICE_PER_LB}/lb
          </span>
          <QuantitySelector
            quantity={quantity}
            onIncrement={quantity === 0 ? onAdd : onIncrement}
            onDecrement={onDecrement}
            productName={mushroom.name}
          />
        </div>
      </div>
    </div>
  );
}
