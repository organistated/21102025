export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFuture: boolean;
}

export interface Photo {
  id: number;
  url: string;
  size: 'small' | 'medium' | 'large';
  caption: string;
}