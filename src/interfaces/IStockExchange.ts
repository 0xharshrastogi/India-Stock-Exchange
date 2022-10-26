export interface MarketIndex {
	timeVal: Date;
	indexName: string;
	previousClose: number;
	open: number;
	high: number;
	low: number;
	last: number;
	percChange: number;
	yearHigh: number;
	yearLow: number;
	indexOrder: number;
}

export type MarketSector = {
	date: Date;
	symbol: string;
	PE: number;
	sectorPE: number;
	sector: string;
};

export interface IStockExchange {
	fetchExchangeStatus(): Promise<"open" | "close">;

	fetchMarketIndexes(): Promise<MarketIndex[]>;
}
