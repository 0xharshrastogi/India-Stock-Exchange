# Stock Exchange Library

[Under Development]

Provide Apis To Access Various Stock Information Of Various Exchanges

## Exchanges Added

1. National Stock Exchange (NSE)

## Examples

All of information is based on exchange basis. For example you want to access stock information of NSE exchange you need to NSE object to access various Api

```typescript
const exchange = StockMarketIndia.getExchange(StockExchangeType.NSE);
```

Use this object to access data

```typescript
const status = await exchange.fetchExchangeStatus();
```
