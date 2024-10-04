
interface Good {
  id: string;
  imageUrl: string;
  name: string;
  qty: number;
}

interface Item {
  borrowId: string;
  good: Good;
  goodId: string;
  id: string;
  qty: number;
}

interface User {
  id: string;
  username: string;
  externalUserId: string;
  role: string;
  profilePhoto: string;
  // Definisikan properti-properit lainnya sesuai kebutuhan
}

interface Borrow {
  approved: boolean;
  imageUrl?: string;
  id: string;
  isReturned: boolean;
  item: Item[];
  limitDate: Date;
  reason: string | null;
  user: User;
  userId: string;
}

export interface BorrowsRelation extends Borrow {
  user: User;
  item: Item[];
}