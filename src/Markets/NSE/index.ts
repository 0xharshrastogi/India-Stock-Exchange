import type { IStockExchange, MarketIndex, MarketSector } from "./../../interfaces/IStockExchange";
import { StringUtils } from "./../../utils/StringUtils";
import * as MarketConstant from "./constants";
import { parseStockInfo } from "./ParseStockInfo";

type MarketStatusJsonResponse = { NormalMktStatus: "open" | "close" };

type MarketIndexResponse = {
	timeVal: string;
	indexName: string;
	previousClose: string;
	open: string;
	high: string;
	low: string;
	last: string;
	percChange: string;
	yearHigh: string;
	yearLow: string;
	indexOrder: string;
};

type MarketSectorsResponse = {
	[symbol: string]: {
		date: string;
		symbol: string;
		PE: string;
		sectorPE: string;
		sector: string;
	};
};

export type MarketGainerResponse = {
	symbol: string;
	series: string;
	openPrice: string;
	highPrice: string;
	lowPrice: string;
	ltp: string;
	previousPrice: string;
	netPrice: string;
	tradedQuantity: string;
	turnoverInLakhs: string;
	lastCorpAnnouncementDate: string;
	lastCorpAnnouncement: string;
};

export type StockInfo = {
	openPrice: number;
	highPrice: number;
	lowPrice: number;
	ltp: number;
	previousPrice: number;
	netPrice: number;
	tradedQuantity: number;
	turnoverInLakhs: number;
	symbol: string;
	series: string;
	lastCorpAnnouncementDate: Date;
	lastCorpAnnouncement: string;
};

export class NationalStockExchange implements IStockExchange {
	async fetchExchangeStatus(): Promise<"open" | "close"> {
		const response = await fetch(MarketConstant.MARKET_STATUS);

		if (!response.ok) {
			console.log(response.status);
		}

		const data: MarketStatusJsonResponse = await response.json();
		return data.NormalMktStatus;
	}

	async fetchMarketIndexes(): Promise<MarketIndex[]> {
		const response = await fetch(MarketConstant.MARKET_INDEXES);
		const { data: indexes } = <{ data: MarketIndexResponse[] }>await response.json();
		const convertToNumberFormat = (value: string) =>
			parseFloat(StringUtils.replaceAll(value, ",", ""));

		return indexes.map((index) => ({
			...index,
			timeVal: new Date(index.timeVal),
			previousClose: convertToNumberFormat(index.previousClose),
			open: convertToNumberFormat(index.open),
			high: convertToNumberFormat(index.high),
			low: convertToNumberFormat(index.low),
			last: convertToNumberFormat(index.last),
			percChange: convertToNumberFormat(index.percChange),
			yearHigh: convertToNumberFormat(index.yearHigh),
			yearLow: convertToNumberFormat(index.yearLow),
			indexOrder: convertToNumberFormat(index.indexOrder),
		}));
	}

	async fetchMarketSectors() {
		const response = await fetch(MarketConstant.MARKET_SECTORS);
		const data: MarketSectorsResponse = await response.json();

		return <MarketSector[]>Reflect.ownKeys(data)
			.filter((key) => typeof key === "string")
			.map((key: unknown) => {
				if (typeof key === "string") {
					const sectorData = data[key];
					return {
						date: new Date(sectorData.date),
						symbol: data[key].symbol,
						PE: parseFloat(sectorData.PE),
						sectorPE: parseFloat(sectorData.sectorPE),
						sector: sectorData.sector.trim(),
					};
				}
			});
	}

	// TODO: Method is incomplete
	async fetchQuotes(symbol: string) {
		const response = await fetch(MarketConstant.MARKET_QUOTE + symbol, {
			headers: {
				Referer: MarketConstant.MARKET_QUOTE + symbol,
				"X-Requested-With": "XMLHttpRequest",
			},
		});

		console.log(await response.text());
	}

	async fetchMarketGainer() {
		const response = await fetch(MarketConstant.MARKET_GAINERS);
		const { data: gainers }: { data: MarketGainerResponse[] } = await response.json();

		return gainers.map((gainer) => parseStockInfo(gainer));
	}

	async fetchMarketLosers() {
		const response = await fetch(MarketConstant.MARKET_LOSERS);
		const { data: losers }: { data: MarketGainerResponse[] } = await response.json();

		return losers.map((loser) => parseStockInfo(loser));
	}
}
