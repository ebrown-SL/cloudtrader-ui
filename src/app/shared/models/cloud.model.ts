export interface CloudStock {
  mineId: string
  stock: number
}

export interface CloudStockResponseModel {
  cloudStock: CloudStock[]
}