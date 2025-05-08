import { useState } from 'react';
import type { ItineraryItem } from '@/services/Travel/typing.d';

export default function useItinerary() {
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addItem = (item: ItineraryItem) => {
    setItineraryItems([...itineraryItems, item]);
  };

  const removeItem = (itemId: string) => {
    setItineraryItems(itineraryItems.filter(item => item.id !== itemId));
  };

  const reorderItems = (startIndex: number, endIndex: number) => {
    const items = [...itineraryItems];
    const [removed] = items.splice(startIndex, 1);
    items.splice(endIndex, 0, removed);
    setItineraryItems(items);
  };

  return {
    itineraryItems,
    loading,
    addItem,
    removeItem,
    reorderItems,
  };
}