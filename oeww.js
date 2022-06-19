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

const HtmlStart = '<!DOCTYPE html><head><style>body {font-family: Arial, sans-serif;}\
.good{border: 1px outset black; width:700px; height: auto; background-color:#eeeeff; padding: 0 15px 15px 15px; margin:0px auto; -webkit-font-smoothing: antialiased;}\
.step{color:#aa7aaa; font-style:italic; font-weight:bold;}\
.summdiv{border: 0px outset black; width: auto; height: auto; background-color:#ddddff; padding: 15px 15px 15px 15px; margin:0px auto; -webkit-font-smoothing: antialiased; color:#399539;}\
.summ{font-weight:bold;}\
.summ2{color:#888888; font-weight:bold;}\
.small{font-size:14px; color:#ba9a9a; font-weight:bold;}\
</style><html><body><div class="good"><p><span style="font-size:24px"><strong>Overdoing ETH Warm Wallet v0.2.</strong></span><br /> \
<strong>Developed by <a href="https://overdoingism.blogspot.com/p/blog-page.html">overdoingism Lab.</a> web3.js API version:' + web3ver + '</strong><br /><br />';

const HtmlOver = '</div></body></html>';

Main();

function Main() {

	http.createServer(

		function (req, res) {

			var pathname = url.parse(req.url).pathname;

			var post = "";
			req.on('data', function (chunk) {
				post += chunk;
			});

			req.on('end', async function () {

				if (pathname != '/favicon.ico') {

					var TheSender;
					res.writeHead(200, { 'Content-Type': 'text/html' });
					res.write(HtmlStart);

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

					switch (pathname) {

						case '/': {
							res.write('Please select the cryptocurrency type and node you want to use.<br />');
							res.write('<form method="post" action = "/step1"><p><select name="CC_TYPE" required="required">\
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
							</select><input type="hidden" name="H_STEP" value="0"><br /><br /><input name="GOSTEP1" type="submit" value="Next step" />\</p></form>')
							res.end(HtmlOver);
							break;
                        }
						case '/step1': {

							if (HiddenStep != 0) {
								res.write('Error: Please follow the steps. &nbsp;<a href="/"> Back to first page. </a>');
								res.end(HtmlOver);
								break;
							}

							var TmpArray = CC_Type.split(",");

							res.write('<span class="step">Step 1/5 - Fill sender&#39;s private key and receiver&#39;s wallet address.</span><br />');
							res.write('<form method="post" action = "/step2">Input sender&#39;s private key here:<br /><input maxlength="69" name="S_PKEY" required="required" size="73" type="password" /><br /><br />\
							Input receiver&#39;s wallet address here:<br />\
							<input maxlength="69" name="R_ADDR" required="required" size="73" type="text" /><br /><br />\
							<input name="GOSTEP2" type="submit" value="Next step" />\
							<input type="hidden" name="H_STEP" value="1">\
							<input type="hidden" name="CC_NAME" value="' + TmpArray[0] + '">\
							<input type="hidden" name="C_ID" value="' + TmpArray[1] + '">\
							<input type="hidden" name="RPC_PATH" value="' + TmpArray[2] + '">\
							</form>');
							res.write('<br /><br /><div class="summdiv"><span class="summ">The Summary</span><hr>\
							<span class="summ2">The cryptocurrency: </span>' + TmpArray[0] + '</div>');
							res.end(HtmlOver);
							break;
						}

						case '/step2': {

							if (HiddenStep != 1) {
								res.write('Error: Please follow the steps. &nbsp;<a href="/"> Back to first page. </a>');
								res.end(HtmlOver);
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
								Step2ErrStr = "This is not a valid private key. Please try again."
							}

							if (!web3.utils.isAddress(Reciver_Addr)) {
								Step2Err = true;
								Step2ErrStr = "This is not a valid address. Please try again.";
							}

							if (!Step2Err) {

								res.write('<span class="small">** Network connection detecting....');

								var TheNonceStr = "";
								var TheGasStr = "";
								var TheGasGweiStr = "";
								var TheBalanceStr = "";
								var TheCIDStr = "";
								var web3 = new Web3(RPC_Path);

								try {
									Sender_Balance = await web3.eth.getBalance(Sender_Addr);
									TheBalanceStr = "(Sender&#39;s balance is " + (Sender_Balance / 1000000000000000000).toFixed(8) + " )";
									NetConnect = 1;
								} catch (exception) {
									Sender_Balance = 0;
									NetConnect = 0;
								}

								if (NetConnect == 1) {
									try {
										Sender_nonce = await web3.eth.getTransactionCount(Sender_Addr);
										TheNonceStr = " (Auto detected)";
										NetConnect = 1;
									} catch (exception) {
										Sender_nonce = 0;
										TheNonceStr = ""
										NetConnect = 0;
									}

									try {
										GasPrice = await web3.eth.getGasPrice();
										TheGasGweiStr = (GasPrice / 1000000000).toFixed(1);
										TheGasStr = " (Current Gas price is " + TheGasGweiStr + " Gwei)";
										NetConnect = 1;
									} catch (exception) {
										NetConnect = 0;
									}

									try {
										ChainID = await web3.eth.getChainId();
										TheCIDStr = " (Current Chain ID is " + ChainID + " )";
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
									res.write(' Detected. **</span><br /><br />');
								}
								else {
									res.write(' Not detected. Please verify all the data before send out. **</span><br /><br />');
								}

								res.write('<span class="step">Step 2/5 - Fill sending informations. </span><br />');

								res.write('<form method="post" action = "/step3">\
								How much ' + CC_Name + ' to send:<br />\
								<input maxlength="40" name="S_ETH" required="required" size="40" style="text-align:right;" type="number" step="any" min="0"/> &nbsp;'+ TheBalanceStr + '<br /><br />\
								Gas price (in Gwei) :<br />\
								<input maxlength="40" name="G_PRIC" required="required" size="40" style="text-align:right;" type="number" min="0" step="any" value="'+ TheGasGweiStr + '"/> &nbsp;' + TheGasStr + '<br /><br />\
								What is the nonce used for:<br />\
								<input maxlength="40" name="S_NONC" required="required" size="40" style="text-align:right;" type="number" min="0" step="1" value="'+ Sender_nonce + '"/> &nbsp;' + TheNonceStr + '<br /><br />\
								Chain ID:<br />\
								<input maxlength="40" name="C_ID" required="required" size="40" style="text-align:right;" type="number" min="0" step="1" value="'+ ChainID + '"/> &nbsp;' + TheCIDStr + '<br /><br />\
								Gas fee:<br />21000 (fixed)<br /><br />\
								<input type="hidden" name="S_PKEY" value="' + Private_Key + '" >\
								<input type="hidden" name="S_ADDR" value="' + Sender_Addr + '">\
								<input type="hidden" name="R_ADDR" value="' + Reciver_Addr + '">\
								<input type="hidden" name="S_BALA" value="' + Sender_Balance + '">\
								<input type="hidden" name="CC_NAME" value="' + CC_Name + '">\
								<input type="hidden" name="C_ID" value="' + ChainID + '">\
								<input type="hidden" name="RPC_PATH" value="' + RPC_Path + '">\
								<input type="hidden" name="CHK_NET" value="' + NetConnect + '">\
								<input type="hidden" name="H_STEP" value="2">\
								<input name="GOSTEP3" type="submit" value="Next step" /></form>');

								res.write('<br /><br /><div class="summdiv"><span class="summ">The Summary</span><hr>\
								<span class="summ2">The cryptocurrency: </span> ' + CC_Name + '<br /><br />\
								<span class="summ2">Sender &#39;s address: </span>' + Sender_Addr + ' <br />\
								<span class="summ2">Receiver&#39;s address: </span>' + Reciver_Addr + '<br /><br /></div>');
							}
							else {
								res.write(Step2ErrStr);
								res.write(' <button onclick="history.back()">Go Back</button>');
							}
							res.end(HtmlOver);

							break;
						}

						case '/step3': {

							if (HiddenStep != 2) {
								res.write('Error: Please follow the steps. &nbsp;<a href="/"> Back to first page. </a>');
								res.end(HtmlOver);
								break;
							}

							var TmpVal1;
							var TmpVal2;
							var TmpVal3;
							var ErrChk = false;
							var ErrStr;
							
							TmpVal2 = GasPrice * 21000;

							if (NetConnect == 1) {
								TmpVal1 = Sender_Balance - (TmpVal2 * 1000000000);
								TmpVal1 = TmpVal1 - (SendETH * 1000000000000000000);
								if (TmpVal1 < 0) {
									ErrStr = "Error: Sending " + CC_Name + " + Gas fee &gt; balance. Please correct it.";
									ErrChk = true;
								}
							}

							if (GasPrice <= 0) {
								ErrStr = "Error: Gas price should be &gt; 0. Please correct it.";
								ErrChk = true;
							}
						

							if (!ErrChk) {

								res.write('<span class="step">Step 3/5 - Verify sending informations. </span><br />');

								res.write('<form method="post" action = "/step4">\
								If you confirmed, please go next. <input name="GOSTEP4" type="submit" value="Next step" />\
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
								<input type="hidden" name="H_STEP" value="3"><br /><br />');

								TmpVal3 = TmpVal2 / 1000000000;
								res.write('<br /><br /><div class="summdiv"><span class="summ">The Summary</span><hr>\
								<span class="summ2">The cryptocurrency: </span>' + CC_Name + '<br /><br />\
								<span class="summ2">Sender&#39;s address: </span>' + Sender_Addr + '<br />\
								<span class="summ2">Receiver&#39;s address: </span>' + Reciver_Addr + '<br /><br />\
								<span class="summ2">How much ' + CC_Name + ' to send: </span>' + SendETH + '<br />\
								<span class="summ2">How much gas total needed: </span> 21000 x ' + GasPrice + ' (Gwei) = ' + TmpVal3.toFixed(8) + ' ' + CC_Name + '<br />');

								if (NetConnect == 1) {
									res.write('<span class="summ2">The balance after withdrawal: </span>' + (TmpVal1 / 1000000000000000000).toFixed(8) + ' ' + CC_Name + '<br />'); }

								res.write('<br /><span class="summ2">The nonce is: </span>' + Sender_nonce + '<br /><span class="summ2">The chain ID: </span>' + ChainID + '<br/></div>');

							}
							else {
								res.write(ErrStr);
								res.write(' <button onclick="history.back()">Go Back</button>');
							}
							res.end(HtmlOver);
							break;

						}

						case '/step4': {

							if (HiddenStep != 3) {
								res.write('Error: Please follow the steps. &nbsp;<a href="/"> Back to first page. </a>');
								res.end(HtmlOver);
								break;
							}

							var web3 = new Web3(RPC_Path);

							if (!ErrChk) {

								var TrueSendETH = SendETH * 1000000000000000000;
								var TrueSendGas = GasPrice * 1000000000;

								var transaction = {
									to: Reciver_Addr,
									value: TrueSendETH,
									gas: 21000,
									gasPrice: TrueSendGas,
									nonce: Sender_nonce,
									chainId: ChainID,
									//maxFeePerGas: 50,
									//maxPriorityFeePerGas: 50,
								};

								res.write('<span class="step">Step 4/5 - Generate transaction signature. </span><br /><br />');

								var TR_SIGN_OBJ;
								var TR_SIGN;

								try {
									TR_SIGN_OBJ = await web3.eth.accounts.signTransaction(transaction, Private_Key);
									TR_SIGN = JSON.stringify(TR_SIGN_OBJ);
								} catch (exception) {
									TR_SIGN = "Error: " + exception;
								}

								res.write('<form method="post" action = "/step5"><p>The full transaction content:<br /><textarea readonly cols="80" name="TR_SIGN" rows="8">' + TR_SIGN + '</textarea></p>');
								res.write('<p>The main signature:<br /><textarea readonly cols="80" name="MTR_SIGN" rows="4">' + TR_SIGN_OBJ.rawTransaction + '</textarea></p><br />');
								res.write('Next step will broadcast to network,\
								and it will need network connection. &nbsp;<input name="GOSTEP4" type="submit" value="Next step" />\
								<input type="hidden" name="CC_NAME" value="' + CC_Name + '">\
								<input type="hidden" name="C_ID" value="' + ChainID + '">\
								<input type="hidden" name="RPC_PATH" value="' + RPC_Path + '">\
								<input type="hidden" name="H_STEP" value="4">\
								</form > ');
							}
							else {
								res.write(ErrStr);
								res.write(' <button onclick="history.back()">Go Back</button>');
							}
							res.end(HtmlOver);
							break;
						}

						case '/step5': {

							if (HiddenStep != 4) {
								res.write('Error: Please follow the steps. &nbsp;<a href="/"> Back to first page. </a>');
								res.end(HtmlOver);
								break;
							}

							var web3 = new Web3(RPC_Path);

							if (!ErrChk) {

								try {

									res.write('<span class="step">Step 5/5 - The broadcast result. </span><br /><br />');
									res.write('<span class="small">** Waiting transaction result (It may cost a long time)...');
									var getTransactionReceipt = await web3.eth.sendSignedTransaction(TransactionSign);
									res.write('done. **</span><br /><br />');

									var TS_status;
									if (getTransactionReceipt.status) { TS_status = 'Success.<br />' } else { TS_status = 'Reverted. (Maybe some setting is incorrect.) <br />' }
									res.write('<strong>Result:</strong><br />' + TS_status);
									res.write('<br /><strong>Block Number:</strong><br />' + getTransactionReceipt.blockNumber + '<br />');
									res.write('<br /><strong>Transaction Hash:</strong><br />' + getTransactionReceipt.transactionHash + ' <br />');
									res.write('<br /><strong>Transaction Index in block:</strong><br />' + getTransactionReceipt.transactionIndex + '<br />');
									//res.write('<br />From: ' + getTransactionReceipt.from + '<br />');
									//res.write('<br />To: ' + getTransactionReceipt.to + '<br />');
									/*res.write('-cumulativeGasUsed: ' + getTransactionReceipt.cumulativeGasUsed + '<br />');
									res.write('-gasUsed: ' + getTransactionReceipt.gasUsed + '<br />');
									res.write('-logs: ' + getTransactionReceipt.logs + '<br />');
									res.write('-effectiveGasPrice: ' + getTransactionReceipt.effectiveGasPrice + '<br />');*/
									res.write('<br /> You can use &quot;Transaction Hash&quot; in block chain explorer for tracing transaction.<br /><br />\
									<a href="/"> Back to first page. </a>');

								} catch (exception) {
									res.write(exception + " **</span><br />");
									res.write("<br />The broadcast was failure. Maybe the network or RPC server is down.<br />You can go back to copy the signature for use.");
									res.write(' &nbsp;<button onclick="history.back()">Go Back</button>');
								}

							}
							else {
								res.write(ErrStr);
								res.write(' <button onclick="history.back()">Go Back</button>');
							}
							res.end(HtmlOver);
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


