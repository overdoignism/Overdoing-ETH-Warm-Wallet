/* Overdoing ETH Warm Wallet
 * It's an ETH warm wallet developed by overdoingism Lab.
 * ver 0.2
 * MIT License
 * The author does not have any warranty or responsibility.
 * 
 */

'use strict';
var http = require('http');
var url = require("url");

var Web3 = require('web3');
//const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

var port = process.env.PORT || 1337;

const web31 = new Web3(Web3.givenProvider);
var web3ver = web31.version;


var CM1 = '<strong>或是<a href="https://overdoingism.blogspot.com/p/blog-page_17.html">來看一下在下的小說</a></strong>'
var Warm = '<span style="color:#8888bb; font-style:italic; font-weight:bold; font-size:16px;"> 一定愛配溫開水!</span>'

const HtmlStart = '<!DOCTYPE html><head><meta charset="utf-8"><style>\
body{font-family: sans-serif;}\
.good{border: 1px outset black; width:700px; height: auto; background-color:#eeeeff; padding: 0 15px 15px 15px; margin:0px auto;}\
.step{color:#aa7aaa; font-style:italic; font-weight:bold;}\
.summdiv{border: 0px outset black; width: auto; height: auto; background-color:#ddddff; padding: 15px 15px 15px 15px; margin:0px auto; -webkit-font-smoothing: antialiased; color:#399539; font-smooth: always;}\
.summ{font-weight:bold;}\
.summ2{color:#888888; font-weight:bold;}\
.div2{color:#aa8833; border: 1px black outset; border-style:dashed; border-top-style: none; width:700px; height: auto; background-color:#ffeeee; padding: 15px 15px 15px 15px; margin:0px auto; font-size: 14px}\
.small{font-size:14px; color:#ba9a9a; font-weight:bold;}\
</style><html><body><br /><div class="good"><p><span style="font-size:24px"><strong>Overdoing ETH Warm Wallet v0.5'+ Warm+'</strong></span><br /><br /><br />';

var HtmlOver = ['</div><div class="div2">Developed by <a href="https://overdoingism.blogspot.com/p/blog-page.html">overdoingism Lab.</a>\
 &nbsp;Use MIT license. &nbsp; Current web3.js API version:' + web3ver + ' &nbsp; <br /><br />Welcome donate: 0x7cE987d1C417DBb86CfE6f9Ac6cfEDF7554853AF</div></body></html>\
', '</div><div class="div2">本錢包由<a href="https://overdoingism.blogspot.com/p/blog-page.html">做過頭主義實驗室</a>開發，使用 MIT 授權條款。 &nbsp; \
 &nbsp;當前 web3.js API 版本:' + web3ver + '<br /><br />歡迎捐贈: 0x7cE987d1C417DBb86CfE6f9Ac6cfEDF7554853AF &nbsp; ' + CM1 + '</div></body></html>'];

const string001 = ['Please select the cryptocurrency type and node you want to use.<br />', '請選擇您要使用的加密貨幣種類與節點。<br />'];
const string0011 = ['Notice: The wallet is not for ERC-20/ERC-721 token, Please confirm your purpose before sending.<br />', '注意：本錢包不支援 ERC-20/ERC-721 代幣，請在發送前確認您發送的貨幣為何。<br />'];
const string002 = ['Error: Please follow the steps. &nbsp;<a href="/"> Back to first page. </a>', '錯誤: 請按步驟進行。<a href="/"> 回到第一頁 </a>'];
const string003 = ['Step 1/5 - Fill sender&#39;s private key and receiver&#39;s wallet address.', '步驟 1/5 - 填寫發送者私鑰，與接收者地址'];
const string0031 = ['For browser saving as account name: (Optional, Leave blank if not use)', '用於瀏覽器以帳戶方式記憶: (選用，不使用請留空)'];
const string004 = ['Input sender&#39;s private key here:', '在此輸入發送者的私鑰:'];
const string005 = ['Input receiver&#39;s wallet address here:', '在此輸入接收者的地址:'];
const string006 = ['Next step', '下一步'];
const string007 = ['The Summary', '摘要'];
const string008 = ['This is not a valid private key. Please try again.', '這不是一個有效的私鑰，請重試。'];
const string009 = ['This is not a valid address. Please try again.', '這不是一個有效的地址，請重試。'];
const string010 = ['The cryptocurrency: ', '加密貨幣為: '];
const string011 = ['** RPC Server connecting...', '** RPC 伺服器連線中...'];
const string012 = [' (Sender&#39;s balance is ', ' (發送者帳戶餘額為 '];
const string013 = [' (By RPC report)', ' (依據 RPC 回報)'];
const string014 = [' (Current Gas price is ', ' (當前 Gas 價格為 '];
const string015 = [' (Current Chain ID is ', ' (當前鍊 ID 為 '];
const string016 = [' Done. **', ' 已完成。**'];
const string017 = [' Not connected. Please verify all the data before send out. **', ' 未能連線。請在送出資料前先自行確認內容。**'];
const string018 = ['Go back', '回前頁'];
const string019 = ['Step 2/5 - Fill sending informations.', '步驟 2/5 - 填寫發送資訊'];
const string020 = ['How much ', '有多少 '];
const string021 = [' to send: ', ' 要發送: '];
const string022 = ['Gas price (in Gwei):<br />', 'Gas 價格 (單位為 Gwei) : <br />'];
const string023 = ['What is the nonce used for: <br />', '使用的 nonce 值為: <br />'];
const string024 = ['Chain ID: <br />', '鍊 ID: <br />'];
const string025 = ['Gas fee: <br />21000 (fixed)<br /><br />', 'Gas 費: <br />21000 (定值)<br /><br />'];
const string026 = ['Sender&#39;s address: ', '發送者的地址: '];
const string027 = ['Receiver&#39;s address: ', '接收者的地址: '];
const string028 = ['Error: Sending ', '錯誤: 發送的 '];
const string029 = [' + Gas fee &gt; balance. Please correct it.', ' + Gas 費用 &gt; 帳戶結餘。請修正。'];
const string030 = ['Error: Gas price should be &gt; 0. Please correct it.', '錯誤: Gas 價格必須 &gt; 0。'];
const string031 = ['Step 3/5 - Verify sending informations.', '步驟 3/5 - 確認發送資訊'];
const string032 = ['If you confirmed, please go next. ', '確認後請繼續下一步。'];
const string033 = ['How much gas total needed: ', '總共要消耗多少 Gas: '];
const string034 = ['The balance after transaction done: ', '這次交易完成後的餘額: '];
const string035 = ['The nonce is: ', 'Nonce 值: '];
const string036 = ['The chain ID: ', '鍊 ID: '];
const string037 = ['Step 4/5 - Generate transaction signature. ', '步驟 4/5 - 產生交易簽名'];
const string038 = ['The full transaction signature content: ', '完整交易簽名內容: '];
const string039 = ['The main RLP signature: <strong>(For node broadcast)</strong> ', '主要RLP簽名內容: <strong>(用於節點廣播)</strong>'];
const string040 = ['Next step will broadcast by node, and it will need network connection.', '下一步將會由節點廣播，這需要網路連線。'];
const string041 = ['<br />Go next step if needed, else end here. ', '<br />如果需要，請進行下一步，或在這裡結束。 '];
const string042 = ['Step 5/5 - The transaction broadcast result. (Please don&#39;t reload this page)', '步驟 5/5 - 交易廣播結果 (請勿重新載入此頁)'];
const string043 = ['** Waiting transaction result (It may cost a long time)...', '** 等待交易結果 (這可能要花費很長時間)...'];
const string044 = ['done. **', '完成。 **'];
const string045 = ['Success.', '成功'];
const string046 = ['Reverted. (Maybe some settings are incorrect.)', '撤銷。 (可能有一些設定不正確)'];
const string047 = ['Result:', '結果:'];
const string048 = ['Block Number:', '區塊編號:'];
const string049 = ['Transaction Hash:', '交易雜湊:'];
const string050 = ['Transaction Index in block:', '交易在區塊中的索引:'];
const string051 = ['You can use <strong>&quot;Transaction Hash&quot;</strong> in block chain explorer for transaction tracing.', '您可以在區塊鍊瀏覽器中使用 <strong>「交易雜湊」</strong> 來追蹤該筆交易。'];
const string052 = ['Back to first page.', '回到第一頁'];
const string053 = ['The broadcast was failure. Maybe the network or RPC server is down, or you reloaded the page.<br /><br />You can go back to copy the signature for use.', '廣播失敗，可能是網路或RPC伺服器有故障，或是您重新載入了此頁面。<br /><br />您可以回上一頁去複製簽名使用。'];

const BN = web31.utils.BN;
const ETHtoWei = new BN('1000000000000000000');
const GweitoWei = new BN('1000000000');

Main();

function Main() {

	http.createServer(

		function (req, res) {

			var FullPathname = url.parse(req.url).pathname;

			var post = "";
			req.on('data', function (chunk) {
				post += chunk;
			});

			req.on('end', async function () {

				if (FullPathname != '/favicon.ico') {

					res.writeHead(200, { 'Content-Type': 'text/html' });
					res.write(HtmlStart);

					var TheSender;

					let params = new URLSearchParams(post);
					var CC_Type = params.get("CC_TYPE");
					var RPC_Path = params.get("RPC_PATH");
					var CC_Name = params.get("CC_NAME");
					var ChainID = params.get("C_ID");
					var Private_Key = params.get("S_PKEY");
					var Reciver_Addr = params.get("R_ADDR");
					var Sender_Addr = params.get("S_ADDR");
					var Sender_Balance = params.get("S_BALA")
					var Sender_nonce = params.get("S_NONC");
					var SendETH = params.get("S_ETH");
					var GasPrice = params.get("G_PRIC");
					var NetConnect = params.get("CHK_NET");
					var HiddenStep = params.get("H_STEP");
					var TransactionSign = params.get("MTR_SIGN");
					var PathWorker;
					var LangIdx;
					var pathname;

					var TrueSendETH = params.get("TRU_SND");
					var TrueSendGas = params.get("TRU_GASP");

					if (FullPathname != "/") {
						PathWorker = FullPathname.split('/');
						if (PathWorker.length == 3) {
							pathname = PathWorker[1];
							LangIdx = PathWorker[2];
						} else {
							pathname = "err";
						}
						if (LangIdx >> 2) {
							pathname = "err";
						}
					} else {
						pathname = "/";
                    }

					switch (pathname) {

						default: {
							res.write("Please use correct URL path.");
							res.end(HtmlOver[LangIdx]);
							break;
                        }

						case '/': {
							res.write('<p style="text-align:center;"><strong><span style="font-size:24px"><a href="/step0/0">English</a></h1><br /><br />');
							res.write('<a href="/step0/1">正體中文</a></strong></span></p><br />');
							res.end(HtmlOver[0]);
							break;
						}

						case 'step0': {
							res.write(string001[LangIdx]);
							res.write('<form method="post" action = "/step1/' + LangIdx + '"><p><select name="CC_TYPE" required="required">\
							<option selected="selected" value="ETH,1,https://rpc.ankr.com/eth">ETH: Ethereum Mainnet (Ankr)</option>\
							<option value="ETH,1,https://cloudflare-eth.com">ETH: Ethereum Mainnet (Cloudflare)</option>\
							<option value="ETH,1,https://main-rpc.linkpool.io">ETH: Ethereum Mainnet (LinkPool)</option>\
							<option value="AVAX,43114,https://rpc.ankr.com/avalanche">AVAX: Avalanche C-Chain (Ankr)</option>\
							<option value="BNB,56,https://rpc.ankr.com/bsc">BNB: Binance Smart Chain Mainnet (Ankr)</option>\
							<option value="ETC,61,https://www.ethercluster.com/etc">ETC: Ethereum Classic Mainnet</option>\
							<option value="MATIC,137,https://polygon-rpc.com">MATIC: Polygon Mainnet</option>\
							<option value="OKT,66,https://exchainrpc.okex.org">OKT: OKXChain Mainnet</option>\
							<option value="GOR,5,https://rpc.goerli.mudit.blog/">GOR: Gorli Ethereum Testnet</option>\
							<option value="RIN,4,https://eth-rinkeby.alchemyapi.io/v2/tIpqyDIzj4FBPZksDO_thmnhoBg_RxT_">RIN: Rinkeby Ethereum Testnet</option>\
							</select><input type="hidden" name="H_STEP" value="0"> &nbsp; <input name="GOSTEP1" type="submit" value="'+ string006[LangIdx] + '" />\</p></form>')
							res.write(string0011[LangIdx]);
							res.end(HtmlOver[LangIdx]);
							break;
                        }
						case 'step1': {

							if (HiddenStep != 0) {
								res.write(string002[LangIdx]);
								res.end(HtmlOver[LangIdx]);
								break;
							}

							var TmpArray = CC_Type.split(",");

							res.write('<span class="step">' + string003[LangIdx] + '</span><br />');
							res.write('<form method="post" action="/step2/' + LangIdx + '">');
							res.write(string0031[LangIdx] + '<br /><input maxlength="69" name="uname" required="required" size="73" type="text" />\
							<br /><br />'+ string004[LangIdx] +'<br />\
							<input maxlength="69" name="S_PKEY" required="required" size="73" type="password" /><br /><br />'+ string005[LangIdx] +'<br />\
							<input maxlength="69" name="R_ADDR" required="required" size="73" type="text" /><br /><br />\
							<input name="GOSTEP2" type="submit" value="'+ string006[LangIdx] + '" />\
							<input type="hidden" name="H_STEP" value="1">\
							<input type="hidden" name="CC_NAME" value="' + TmpArray[0] + '">\
							<input type="hidden" name="C_ID" value="' + TmpArray[1] + '">\
							<input type="hidden" name="RPC_PATH" value="' + TmpArray[2] + '">\
							</form>');
							res.write('<br /><br /><div class="summdiv"><span class="summ">' + string007[LangIdx] + '</span><hr>\
							<span class="summ2">'+ string010[LangIdx] + '</span>' + TmpArray[0] + '</div>');
							res.end(HtmlOver[LangIdx]);
							break;
						}

						case 'step2': {

							if (HiddenStep != 1) {
								res.write(string002[LangIdx]);
								res.end(HtmlOver[LangIdx]);
								break;
							}

							Reciver_Addr = Reciver_Addr.trim();
							Private_Key = Private_Key.trim();

							var Step2Err = false;
							var Step2ErrStr = "";
							var web3 = new Web3(RPC_Path);

							try {
								TheSender = web3.eth.accounts.privateKeyToAccount(Private_Key);
								Sender_Addr = TheSender.address;
							} catch (exception) {
								Step2Err = true;
								Step2ErrStr = string008[LangIdx];
							}

							if (!web3.utils.isAddress(Reciver_Addr)) {
								Step2Err = true;
								Step2ErrStr = string009[LangIdx];
							}

							if (!Step2Err) {

								res.write('<span class="small">' + string011[LangIdx]);

								var TheNonceStr = "";
								var TheGasStr = "";
								var TheGasGweiStr = "";
								var TheBalanceStr = "";
								var TheCIDStr = "";
								var web3 = new Web3(RPC_Path);

								try {
									Sender_Balance = await web3.eth.getBalance(Sender_Addr);
									TheBalanceStr = Cut_Zero(Get_from_Wei(Sender_Balance.toString(), 18).toString());
									TheBalanceStr = string012[LangIdx] + TheBalanceStr + " " + CC_Name + " )";
									NetConnect = 1;
								} catch (exception) {
									Sender_Balance = 0;
									NetConnect = 0;
								}

								if (NetConnect == 1) {
									try {
										Sender_nonce = await web3.eth.getTransactionCount(Sender_Addr);
										TheNonceStr = string013[LangIdx];
										NetConnect = 1;
									} catch (exception) {
										Sender_nonce = 0;
										TheNonceStr = ""
										NetConnect = 0;
									}

									try {
										GasPrice = await web3.eth.getGasPrice();
										//TheGasGweiStr = (GasPrice / 1000000000).toFixed(1);
										TheGasGweiStr = Cut_Zero(Get_from_Wei(GasPrice.toString(), 9).toString());

										TheGasStr = string014[LangIdx] + TheGasGweiStr + " Gwei)";
										NetConnect = 1;
									} catch (exception) {
										NetConnect = 0;
									}

									try {
										ChainID = await web3.eth.getChainId();
										TheCIDStr = string015[LangIdx] + ChainID + " )";
										NetConnect = 1;
									} catch (exception) {
										NetConnect = 0;
									}
								}
								else {
									Sender_nonce = 0;
									GasPrice = 0;
								}

								if (NetConnect == 1) {
									res.write(string016[LangIdx] + '</span><br /><br />');
								}
								else {
									res.write(string017[LangIdx] + '</span><br /><br />');
								}

								res.write('<span class="step">' + string019[LangIdx] + '</span><br />');
								res.write('<form method="post" action = "/step3/' + LangIdx + '">');
								res.write(string020[LangIdx] + CC_Name + string021[LangIdx] + '<br />');					
								res.write('<input maxlength="40" name="S_ETH" required="required" size="40" style="text-align:right;" type="number" step="any" min="0"/> &nbsp;' + TheBalanceStr + '<br /><br />');
								res.write(string022[LangIdx]);
								res.write('<input maxlength="40" name="G_PRIC" required="required" size="40" style="text-align:right;" type="number" min="0" step="any" value="' + TheGasGweiStr + '"/> &nbsp;' + TheGasStr + '<br /><br />');
								res.write(string023[LangIdx]);
								res.write('<input maxlength="40" name="S_NONC" required="required" size="40" style="text-align:right;" type="number" min="0" step="1" value="' + Sender_nonce + '"/> &nbsp;' + TheNonceStr + '<br /><br />');
								res.write(string024[LangIdx]);
								res.write('<input maxlength="40" name="C_ID" required="required" size="40" style="text-align:right;" type="number" min="0" step="1" value="' + ChainID + '"/> &nbsp;' + TheCIDStr + '<br /><br />');
								res.write(string025[LangIdx]);
								res.write('<input type="hidden" name="S_PKEY" value="' + Private_Key + '" >\
								<input type="hidden" name="S_ADDR" value="' + Sender_Addr + '">\
								<input type="hidden" name="R_ADDR" value="' + Reciver_Addr + '">\
								<input type="hidden" name="S_BALA" value="' + Sender_Balance + '">\
								<input type="hidden" name="CC_NAME" value="' + CC_Name + '">\
								<input type="hidden" name="C_ID" value="' + ChainID + '">\
								<input type="hidden" name="RPC_PATH" value="' + RPC_Path + '">\
								<input type="hidden" name="CHK_NET" value="' + NetConnect + '">\
								<input type="hidden" name="H_STEP" value="2">\
								<input name="GOSTEP3" type="submit" value="'+ string006[LangIdx] + '" /></form>');

								res.write('<br /><br /><div class="summdiv"><span class="summ">' + string007[LangIdx] +'</span><hr>\
								<span class="summ2">' + string010[LangIdx] + '</span> ' + CC_Name + '<br /><br />\
								<span class="summ2">' + string026[LangIdx] + '</span>' + Sender_Addr + ' <br />\
								<span class="summ2">'+ string027[LangIdx] + '</span>' + Reciver_Addr + '<br /></div>');
							}
							else {
								res.write(Step2ErrStr);
								res.write(' <button onclick="history.back()">' + string018[LangIdx] + '</button>');
							}
							res.end(HtmlOver[LangIdx]);

							break;
						}

						case 'step3': {

							if (HiddenStep != 2) {
								res.write(string002[LangIdx]);
								res.end(HtmlOver[LangIdx]);
								break;
							}

							var ErrChk = false;
							var ErrStr;

							var GasBN2Back = new BN(GasPrice.toString().replace(".", ""));
							GasBN2Back = GasBN2Back.mul(GweitoWei);
							GasBN2Back = GasBN2Back.div(new BN(GetMulWhat(GasPrice)));
							TrueSendGas = GasBN2Back.toString();

							var SETHBN2Back = new BN(SendETH.toString().replace(".", ""));
							SETHBN2Back = SETHBN2Back.mul(ETHtoWei);
							SETHBN2Back = SETHBN2Back.div(new BN(GetMulWhat(SendETH)));
							TrueSendETH = SETHBN2Back.toString();

							var ShowBalance; //If connected check balance > 0
							if (NetConnect == 1) {

								var GasTotBN2Back = new BN(GasPrice.toString().replace(".", ""));
								GasTotBN2Back = GasTotBN2Back.mul(GweitoWei);
								GasTotBN2Back = GasTotBN2Back.mul(new BN('21000'));
								GasTotBN2Back = GasTotBN2Back.div(new BN(GetMulWhat(GasPrice)));
								var TrueGasTotal = Cut_Zero(Get_from_Wei(GasTotBN2Back.toString(), 18));

								var Sender_BalanceBN = new BN(Sender_Balance.toString());
								Sender_BalanceBN = Sender_BalanceBN.sub(GasTotBN2Back);
								Sender_BalanceBN = Sender_BalanceBN.sub(SETHBN2Back);

								if (Sender_BalanceBN.isNeg()) {
									ErrStr = string028[LangIdx] + CC_Name + string029[LangIdx];
									ErrChk = true;
								} else {
									ShowBalance = Cut_Zero(Get_from_Wei(Sender_BalanceBN.toString(), 18));
								}
                            }

							if (GasPrice <= 0) {
								ErrStr = string030[LangIdx];
								ErrChk = true;
							}
							
							if (!ErrChk) {

								res.write('<span class="step">' + string031[LangIdx] + '</span><br />');
								res.write('<form method="post" action = "/step4/' + LangIdx + '">');
								res.write(string032[LangIdx]);
								res.write('<input name="GOSTEP4" type="submit" value="' + string006[LangIdx] + '" />\
								<input type="hidden" name="S_ETH" value="' + SendETH + '" >\
								<input type="hidden" name="S_PKEY" value="' + Private_Key + '" >\
								<input type="hidden" name="S_ADDR" value="' + Sender_Addr + '">\
								<input type="hidden" name="R_ADDR" value="' + Reciver_Addr + '">\
								<input type="hidden" name="S_BALA" value="' + Sender_Balance + '">\
								<input type="hidden" name="G_PRIC" value="' + GasPrice + '">\
								<input type="hidden" name="CC_NAME" value="' + CC_Name + '">\
								<input type="hidden" name="C_ID" value="' + ChainID + '">\
								<input type="hidden" name="S_NONC" value="' + Sender_nonce + '">\
								<input type="hidden" name="RPC_PATH" value="' + RPC_Path + '">\
								<input type="hidden" name="CHK_NET" value="' + NetConnect + '">\
								<input type="hidden" name="TRU_GASP" value="' + TrueSendGas + '">\
								<input type="hidden" name="TRU_SND" value="' + TrueSendETH + '">\
								<input type="hidden" name="H_STEP" value="3"><br /><br />');

								res.write('<br /><div class="summdiv"><span class="summ">' + string007[LangIdx] +'</span><hr>\
								<span class="summ2">'+ string010[LangIdx] + '</span>' + CC_Name + '<br /><br />\
								<span class="summ2">'+ string026[LangIdx] + '</span>' + Sender_Addr + '<br />\
								<span class="summ2">'+ string027[LangIdx] + '</span>' + Reciver_Addr + '<br /><br />\
								<span class="summ2">'+ string020[LangIdx] + CC_Name + string021[LangIdx] + '</span>' + SendETH + '<br />\
								<span class="summ2">'+ string033[LangIdx] + '</span> 21000 x ' + GasPrice + ' (Gwei) = ' + TrueGasTotal + ' ' + CC_Name + '<br />');
								if (NetConnect == 1) { res.write('<span class="summ2">' + string034[LangIdx] + '</span>' + ShowBalance + ' ' + CC_Name + '<br />'); }
								res.write('<br /><span class="summ2">' + string035[LangIdx] + '</span>' + Sender_nonce + '<br /><span class="summ2">' + string036[LangIdx] + '</span>' + ChainID + '<br/></div>');

							}
							else {
								res.write(ErrStr);
								res.write(' <button onclick="history.back()">' + string018[LangIdx] + '</button>');
							}
							res.end(HtmlOver[LangIdx]);
							break;
						}

						case 'step4': {

							if (HiddenStep != 3) {
								res.write(string002[LangIdx]);
								res.end(HtmlOver[LangIdx]);
								break;
							}

							var web3 = new Web3(RPC_Path);

							if (!ErrChk) {

								var transaction = {
									to: Reciver_Addr,
									value: TrueSendETH.toString(),
									gas: 21000,
									gasPrice: TrueSendGas.toString(),
									nonce: Sender_nonce,
									chainId: ChainID,
									//maxFeePerGas: 50,
									//maxPriorityFeePerGas: 50,
								};

								res.write('<span class="step">' + string037[LangIdx] + '</span><br /><br />');

								var TR_SIGN_OBJ;
								var TR_SIGN;

								try {
									TR_SIGN_OBJ = await web3.eth.accounts.signTransaction(transaction, Private_Key);
									TR_SIGN = JSON.stringify(TR_SIGN_OBJ);
								} catch (exception) {
									res.write(exception.message);
									res.write(' <button onclick="history.back()">' + string018[LangIdx] + '</button>');
									res.end(HtmlOver[LangIdx]);
									break;
								}

								res.write('<form method="post" action = "/step5/' + LangIdx + '"><p>' + string038[LangIdx] + '<br />\
								<textarea readonly cols="80" name="TR_SIGN" rows="8">' + TR_SIGN + '</textarea></p>');
								res.write('<p>' + string039[LangIdx] + '<br /><textarea readonly cols="80" name="MTR_SIGN" rows="4">' + TR_SIGN_OBJ.rawTransaction + '</textarea></p><br />');
								res.write(string040[LangIdx] + string041[LangIdx] );
								res.write('&nbsp; <input name="GOSTEP4" type="submit" value="'+ string006[LangIdx] + '" />\
								<input type="hidden" name="CC_NAME" value="' + CC_Name + '">\
								<input type="hidden" name="RPC_PATH" value="' + RPC_Path + '">\
								<input type="hidden" name="H_STEP" value="4">\
								</form > ');
							}
							else {
								res.write(ErrStr);
								res.write(' <button onclick="history.back()">' + string018[LangIdx] + '</button>');
							}
							res.end(HtmlOver[LangIdx]);
							break;
						}

						case 'step5': {

							if (HiddenStep != 4) {
								res.write(string002[LangIdx]);
								res.end(HtmlOver[LangIdx]);
								break;
							}

							var web3 = new Web3(RPC_Path);

							if (!ErrChk) {

								try {

									res.write('<span class="step">' + string042[LangIdx] + '</span><br /><br />');
									res.write('<span class="small">' + string043[LangIdx]);
									var getTransactionReceipt = await web3.eth.sendSignedTransaction(TransactionSign);
									res.write(string044[LangIdx] + '</span><br /><br />');

									var TS_status;
									if (getTransactionReceipt.status) { TS_status = string045[LangIdx] } else { TS_status = string046[LangIdx] };
									res.write('<br /><strong>' + string047[LangIdx] + '</strong><br />' + TS_status + '<br />');
									res.write('<br /><strong>' + string048[LangIdx] + '</strong><br />' + getTransactionReceipt.blockNumber + '<br />');
									res.write('<br /><strong>' + string049[LangIdx] + '</strong><br />');
									res.write('<input readonly name="tHash" size="73" type="text" value="' + getTransactionReceipt.transactionHash + '"/><br />');
									res.write('<br /><strong>' + string050[LangIdx] + '</strong><br />' + getTransactionReceipt.transactionIndex + '<br />');
									//res.write('<br />From: ' + getTransactionReceipt.from + '<br />');
									//res.write('<br />To: ' + getTransactionReceipt.to + '<br />');
									/*res.write('-cumulativeGasUsed: ' + getTransactionReceipt.cumulativeGasUsed + '<br />');
									res.write('-gasUsed: ' + getTransactionReceipt.gasUsed + '<br />');
									res.write('-logs: ' + getTransactionReceipt.logs + '<br />');
									res.write('-effectiveGasPrice: ' + getTransactionReceipt.effectiveGasPrice + '<br />');*/
									res.write('<br />' + string051[LangIdx] + '<br /><br /><a href="/">' + string052[LangIdx] + '</a>');

								} catch (exception) {
									res.write(exception + " **</span><br /><br />");
									res.write(string053[LangIdx]);
									res.write(' &nbsp;<button onclick="history.back()">' + string018[LangIdx] + '</button>');
								}

							}
							else {
								res.write(ErrStr);
								res.write(' <button onclick="history.back()">' + string018[LangIdx] + '</button>');
							}
							res.end(HtmlOver[LangIdx]);
							break;
                        }
					}
				}
				else {
					res.end('');
				}
			});
		}).listen(port);
}



function GetMulWhat(TestTarget) {
	var TestArray = TestTarget.toString().split(".");

	if (TestArray.length != 2) {
		return 1;
	} else {
		return '1' + '0'.repeat(TestArray[1].length);
	}
}


function Get_from_Wei(InputETH, weiwei) {

	var TmpWorker01;
	var TmpWorker02 = InputETH.toString();

	if (InputETH == '0') {
		return '0';
	}

	if (TmpWorker02.length <= weiwei) {
		TmpWorker01 = '0'.repeat(weiwei - TmpWorker02.length);
		TmpWorker01 = '0.' + TmpWorker01 + TmpWorker02;
	} else {
		TmpWorker01 = TmpWorker02.slice(0, TmpWorker02.length - weiwei);
		TmpWorker01 = TmpWorker01 + '.' + TmpWorker02.slice(TmpWorker02.length - weiwei);
	}

	return TmpWorker01;
}


function Cut_Zero(WhatToCut) {

	var TmpWorker01;
	var TmpWorker02;
	var i;

	if ((WhatToCut == '0') || (WhatToCut.length == 0)) {
		return '0.0';
	} else {
		for (i = (WhatToCut.length - 1); i >= 0; i--) {
			TmpWorker02 = WhatToCut.charAt(i);
			if (TmpWorker02 != '0') {
				TmpWorker01 = WhatToCut.slice(0, i + 1);
				break;
			}
		}
		return TmpWorker01;
	}
}