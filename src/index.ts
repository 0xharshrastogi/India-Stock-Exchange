import { IStockExchange } from "./interfaces/IStockExchange";
import { NationalStockExchange } from "./Markets/NSE";

export enum StockExchangeType {
	NSE = "NSE_INDIA",
}

export class StockMarketIndia {
	private static _marketCache = new Map<StockExchangeType, IStockExchange>();

	static getExchange(exchangeType: StockExchangeType): IStockExchange {
		const stockExchange = this._marketCache.get(exchangeType);
		if (stockExchange) return stockExchange;

		const exchange = StockMarketIndia.createStockExchange(exchangeType);
		this._marketCache.set(exchangeType, exchange);
		return exchange;
	}

	private static createStockExchange(market: StockExchangeType) {
		switch (market) {
			case StockExchangeType.NSE:
				return new NationalStockExchange();

			default:
				throw new Error(`Exchange not found for this StockExchangeType: ${market}`);
		}
	}
}
