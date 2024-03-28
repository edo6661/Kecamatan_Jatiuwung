import {create} from 'zustand'

type GlobalState = {
  borrowGoods: any[],
  deleteSameGoodId: (id: string) => void,
  setBorrowGoods: (data: { qty: any, goodId: string }) => void,
}

export const useGlobalState = create<GlobalState>((set) => ({
  borrowGoods: [],
  deleteSameGoodId: (goodId) => set((state) => ({
    borrowGoods: state.borrowGoods.filter((item) => item.goodId !== goodId)
  })),
  setBorrowGoods: (data) => set((state) => ({
    borrowGoods: [...state.borrowGoods, data]
  })),
}))