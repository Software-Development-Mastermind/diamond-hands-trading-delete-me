var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var express = require("express");
var axios = require("axios");
var app = express();
var PORT = 4321;
var cors = require('cors');
var path = require('path');
var jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(express.json());
app.listen(PORT, function () {
    console.log("listening on ".concat(PORT));
});
app.use(cors({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.get('/:route(Trade|Login|Portfolio)', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});
app.get('/api/stock/search/:stockSearchInput', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var stockSearchInput, response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                stockSearchInput = req.params.stockSearchInput;
                return [4 /*yield*/, axios.get("https://financialmodelingprep.com/api/v3/search?query=".concat(stockSearchInput, "&limit=10&exchange=NASDAQ&apikey=").concat(process.env.FMP_API_KEY))];
            case 1:
                response = _a.sent();
                data = response.data;
                res.json(data);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/stock/price/:stockSymbol', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var stockSymbol, response, data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                stockSymbol = req.params.stockSymbol;
                return [4 /*yield*/, axios.get("https://finnhub.io/api/v1/quote?symbol=".concat(stockSymbol, "&token=").concat(process.env.FINHUB_API_KEY))];
            case 1:
                response = _a.sent();
                data = response.data.c;
                res.json(data);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/marketNews', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var response, startIndex, endIndex, rangeData, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios.get("https://finnhub.io/api/v1/news?category=general&token=".concat(process.env.FINHUB_API_KEY))];
            case 1:
                response = _a.sent();
                startIndex = 0;
                endIndex = 4;
                rangeData = response.data.slice(startIndex, endIndex);
                res.json(rangeData);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
var Client = require('pg').Client;
var client = new Client({
    host: 'database-1-diamond-trading.czggh6d9nqaf.us-west-1.rds.amazonaws.com',
    user: 'postgres',
    port: 5432,
    database: 'postgres',
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();
app.post("/api/trade/:inSellState", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var inSellState, _a, company, symbol, user, cost_basis, shares, available_cash, selectAllStocks, insertRowDataQuery, updateCashQueryBuy, updateCashQuerySell, updateStockQueryBuy, updateCashQueryBuy, updateStockQuerySell, updateCashQuerySell, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                inSellState = req.params.inSellState;
                _a = req.body, company = _a.company, symbol = _a.symbol, user = _a.user, cost_basis = _a.cost_basis, shares = _a.shares, available_cash = _a.available_cash;
                return [4 /*yield*/, client.query("SELECT \"symbol\" FROM public.\"stock_portfolio\" WHERE user_id = $1 AND symbol = $2", [user, symbol])];
            case 1:
                selectAllStocks = _b.sent();
                if (selectAllStocks.rows.length === 0) {
                    insertRowDataQuery = "\n        INSERT INTO public.\"stock_portfolio\" ( \"company\",\"symbol\", \"user_id\", \"cost_basis\", \"shares\") VALUES ($1, $2, $3, $4, $5)\n          RETURNING *";
                    client.query(insertRowDataQuery, [
                        company,
                        symbol,
                        user,
                        cost_basis,
                        shares,
                    ]);
                    if (inSellState === 'false') {
                        updateCashQueryBuy = "UPDATE public.\"cash_transactions\" SET \"available_cash\" = \"available_cash\" - $1 WHERE user_id = $2";
                        client.query(updateCashQueryBuy, [cost_basis, user]);
                    }
                    if (inSellState === 'true') {
                        updateCashQuerySell = "UPDATE public.\"cash_transactions\" SET \"available_cash\" = \"available_cash\" + $1 WHERE user_id = $2";
                        client.query(updateCashQuerySell, [cost_basis, user]);
                    }
                }
                if (selectAllStocks.rows.length > 0 && inSellState === 'false') {
                    updateStockQueryBuy = "UPDATE public.\"stock_portfolio\" SET \"shares\" = \"shares\" + $1, \"cost_basis\" = \"cost_basis\" + $2 WHERE symbol = $3 AND user_id = $4";
                    updateCashQueryBuy = "UPDATE public.\"cash_transactions\" SET \"available_cash\" = \"available_cash\" - $1 WHERE user_id = $2";
                    client.query(updateCashQueryBuy, [cost_basis, user]);
                    client.query(updateStockQueryBuy, [shares, cost_basis, symbol, user]);
                }
                if (selectAllStocks.rows.length > 0 && inSellState === 'true') {
                    updateStockQuerySell = "UPDATE public.\"stock_portfolio\" SET \"shares\" = \"shares\" - $1, \"cost_basis\" = \"cost_basis\" - $2 WHERE symbol = $3 AND user_id = $4";
                    updateCashQuerySell = "UPDATE public.\"cash_transactions\" SET \"available_cash\" = \"available_cash\" + $1 WHERE user_id = $2";
                    client.query(updateCashQuerySell, [cost_basis, user]);
                    client.query(updateStockQuerySell, [shares, cost_basis, symbol, user]);
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                console.error('Error inserting data:', err_1);
                res.status(500).json({ error: 'Error inserting data' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/api/signup', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, user_email, user_password, signupQuery, databaseRes, selectUser, InsertCashQuery, selectedUserID, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                _a = req.body, user_email = _a.user_email, user_password = _a.user_password;
                signupQuery = "INSERT INTO public.\"user_data\" ( \"user_email\",\"user_password\") VALUES ($1, $2)";
                return [4 /*yield*/, client.query("SELECT \"user_email\" FROM public.\"user_data\" WHERE \"user_email\" = $1", [user_email])];
            case 1:
                databaseRes = _b.sent();
                selectUser = "SELECT \"user_id\" FROM public.\"user_data\" WHERE \"user_email\" = $1";
                InsertCashQuery = "\n    INSERT INTO public.\"cash_transactions\" ( \"user_id\",\"available_cash\") VALUES ($1, $2)\n      RETURNING *";
                if (!(databaseRes.rows.length > 0)) return [3 /*break*/, 2];
                res.status(501).json({ error: 'User already exists' });
                return [3 /*break*/, 6];
            case 2:
                res.status(201).json({ message: 'Successfully Registered' });
                return [4 /*yield*/, client.query(signupQuery, [user_email, user_password])];
            case 3:
                _b.sent();
                return [4 /*yield*/, client.query(selectUser, [user_email])];
            case 4:
                selectedUserID = _b.sent();
                return [4 /*yield*/, client.query(InsertCashQuery, [
                        selectedUserID.rows[0].user_id,
                        100000,
                    ])];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_2 = _b.sent();
                console.log(err_2);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
app.post('/api/login', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, user_email, user_password, databaseRes, userEmail, userID, token, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, user_email = _a.user_email, user_password = _a.user_password;
                return [4 /*yield*/, client.query("SELECT * FROM public.\"user_data\" \n        WHERE \"user_email\" = $1 AND \"user_password\" = $2 ", [user_email, user_password])];
            case 1:
                databaseRes = _b.sent();
                if (databaseRes.rows.length === 0) {
                    res.status(501).json({ error: 'user does NOT exist' });
                }
                else {
                    userEmail = databaseRes.rows[0].user_email;
                    userID = databaseRes.rows[0].user_id;
                    token = jwt.sign({ userEmail: userEmail, userID: userID }, process.env.ACCESS_TOKEN);
                    return [2 /*return*/, res.json({ token: token })];
                }
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                console.log(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/api/get_cash/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var userId, getCashQuery, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.body.userId;
                return [4 /*yield*/, client.query("SELECT \"available_cash\" FROM public.\"cash_transactions\" WHERE user_id = $1", [userId])];
            case 1:
                getCashQuery = _a.sent();
                if (getCashQuery.rows) {
                    res.json(getCashQuery);
                }
                else {
                    return [2 /*return*/, res.json(100000)];
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.error('Error getting data:', err_4);
                res.status(500).json({ error: 'Error getting data' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/api/stock_data/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var userId, getPortfolioData, portfolioData, totalStockValue, _i, _a, arr, symbol, numberShares, stockPrices, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.body.userId;
                console.log('user_id', userId);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                return [4 /*yield*/, client.query("SELECT * FROM public.\"stock_portfolio\" WHERE user_id = $1", [userId])];
            case 2:
                getPortfolioData = _b.sent();
                portfolioData = {
                    tableData: {
                        portfolioData: getPortfolioData.rows,
                    },
                    sumData: {
                        totalValue: 0,
                        stockSymbol: [],
                        stockValue: [],
                    },
                };
                totalStockValue = void 0;
                _i = 0, _a = getPortfolioData.rows;
                _b.label = 3;
            case 3:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                arr = _a[_i];
                symbol = arr.symbol;
                numberShares = arr.shares;
                return [4 /*yield*/, axios.get("https://finnhub.io/api/v1/quote?symbol=".concat(symbol, "&token=").concat(process.env.FINHUB_API_KEY))];
            case 4:
                stockPrices = _b.sent();
                totalStockValue = stockPrices.data.c * numberShares;
                portfolioData.sumData.stockSymbol.push(symbol);
                portfolioData.sumData.stockValue.push(totalStockValue);
                portfolioData.sumData.totalValue += totalStockValue;
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                if (getPortfolioData.rows === 0) {
                    res.status(501).json({ error: 'error loading data' });
                }
                console.log('data', getPortfolioData.rows);
                res.json(portfolioData);
                return [3 /*break*/, 8];
            case 7:
                err_5 = _b.sent();
                console.error('Error getting data:', err_5);
                res.status(500).json({ error: 'Error getting data' });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
