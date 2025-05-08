
import { useCallback, useState } from 'react';
import type { DestinationType } from '@/services/Travel/typing.d';

export default function useDestination() {
  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getDestinations = useCallback(async (params: any) => {
    setLoading(true);
    try {
      // API call will be implemented here
      const mockData: DestinationType[] = [
        {
          id: '1',
          name: 'Ha Long Bay',
          type: 'sea',
          rating: 4.8,
          image: 'https://example.com/halong.jpg',
          description: 'Beautiful bay with limestone islands',
          visitDuration: 480, // in minutes
          costs: {
            food: 500000,
            accommodation: 1200000,
            transportation: 400000
          }
        },
        // Add more mock data
      ];
      setDestinations(mockData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, []);

  return {
    destinations,
    loading,
    getDestinations,
  };
}
