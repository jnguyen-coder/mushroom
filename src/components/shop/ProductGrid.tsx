import { useState, lazy, Suspense } from 'react';
import { MUSHROOMS, type Mushroom } from '../../lib/mushrooms';
import { useOrder } from '../../hooks/useOrder';
import ProductCard from './ProductCard';

const ProductCarousel = lazy(() => import('./ProductCarousel'));

export default function ProductGrid() {
  const { cart, addItem, removeItem, incrementItem, decrementItem } = useOrder();
  const [selectedMushroom, setSelectedMushroom] = useState<Mushroom | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {MUSHROOMS.map((mushroom) => {
          const cartItem = cart[mushroom.id];
          const quantity = cartItem?.quantity ?? 0;

          return (
            <ProductCard
              key={mushroom.id}
              mushroom={mushroom}
              quantity={quantity}
              onAdd={() => addItem(mushroom.id, mushroom.name, mushroom.price)}
              onIncrement={() => incrementItem(mushroom.id)}
              onDecrement={() => decrementItem(mushroom.id)}
              onImageClick={() => setSelectedMushroom(mushroom)}
            />
          );
        })}
      </div>

      {selectedMushroom && (
        <Suspense fallback={null}>
          <ProductCarousel
            mushroom={selectedMushroom}
            onClose={() => setSelectedMushroom(null)}
          />
        </Suspense>
      )}
    </>
  );
}
