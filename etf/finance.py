import yfinance as yf

def analyzeETF(name):
    dat = yf.Ticker(name)
    df = dat.history('1mo')
    print(df[['Open', 'High', 'Low', 'Close', 'Volume']])