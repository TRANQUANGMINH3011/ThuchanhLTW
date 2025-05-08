
export interface CostBreakdown {
  food: number;
  accommodation: number;
  transportation: number;
}

export interface DestinationType {
  id: string;
  name: string;
  type: 'sea' | 'mountain' | 'city';
  rating: number;
  image: string;
  description: string;
  visitDuration: number;
  costs: CostBreakdown;
}

export interface ItineraryItem extends DestinationType {
  date: string;
  order: number;
}

export interface BudgetSummary {
  total: number;
  breakdown: CostBreakdown;
  limit: number;
}
