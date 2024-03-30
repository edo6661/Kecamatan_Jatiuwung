export interface ChildrenType {
  children: Readonly<React.ReactNode>;
}

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  img?:string;
}