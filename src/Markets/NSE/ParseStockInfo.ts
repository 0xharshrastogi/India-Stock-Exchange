import { StringUtils } from "./../../utils/StringUtils";
import { MarketGainerResponse, StockInfo } from "./index";

export function parseStockInfo(gainer: MarketGainerResponse): StockInfo {
	return {
		...gainer,
		openPrice: parseFloat(StringUtils.replaceAll(gainer.openPrice, ",", "")),
		highPrice: parseFloat(StringUtils.replaceAll(gainer.highPrice, ",", "")),
		lowPrice: parseFloat(StringUtils.replaceAll(gainer.lowPrice, ",", "")),
		ltp: parseFloat(StringUtils.replaceAll(gainer.ltp, ",", "")),
		previousPrice: parseFloat(StringUtils.replaceAll(gainer.previousPrice, ",", "")),
		netPrice: parseFloat(StringUtils.replaceAll(gainer.netPrice, ",", "")),
		tradedQuantity: parseFloat(StringUtils.replaceAll(gainer.tradedQuantity, ",", "")),
		turnoverInLakhs: parseFloat(StringUtils.replaceAll(gainer.turnoverInLakhs, ",", "")),
		lastCorpAnnouncementDate: new Date(gainer.lastCorpAnnouncementDate),
	};
}
