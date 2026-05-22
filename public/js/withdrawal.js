/* ======================================================
WITHDRAWAL SCREEN
====================================================== */
function goWithdraw(){ renderWithdraw(); go('withdrawScreen'); }
/* ── helpers ── */
function fmt(n){ return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,',' ); }
function fmtShort(n){ return Math.floor(n).toLocaleString(); }

async function renderWithdraw() {
    const bal = await fetch('/balance').then(res => res.json()).then(data => { return Number(data.balance);} );
    
    var WELCOME_BONUS    = 1000;
    var GOAL_AMOUNT      = 10000;
    var MIN_WITHDRAWAL   = 10000;
    var BASE_DAILY_RATE  = 0.005;   // 0.5% per day

    var locked = bal < GOAL_AMOUNT;
    var need = Math.max(0, GOAL_AMOUNT - bal);
    var pct = Math.min((bal / GOAL_AMOUNT) * 100, 100);

    var body = document.getElementById('withdrawBody');

    if (locked) {
        body.innerHTML =
            '<div style="background:rgba(245,158,11,.07);border:1px solid rgba(245,158,11,.2);border-radius:16px;padding:20px;margin-bottom:20px;text-align:center">'
            + '<div style="font-size:32px;margin-bottom:10px">🔒</div>'
            + '<div style="font-size:15px;font-weight:700;color:var(--yellow);margin-bottom:6px">Withdrawal Locked</div>'
            + '<div style="font-size:13px;color:var(--muted);line-height:1.7">Your balance must reach <strong style="color:var(--text)">$10,000</strong> before you can withdraw. Keep growing!</div>'
            + '</div>'

            + '<div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px;margin-bottom:16px">'
            + '<div style="display:flex;justify-content:space-between;margin-bottom:8px">'
            + '<span style="font-size:12px;color:var(--muted);font-weight:500">Your balance</span>'
            + '<span style="font-size:12px;font-weight:700;color:var(--accent)">$' + fmt(bal) + '</span></div>'
            + '<div style="background:rgba(255,255,255,.06);border-radius:99px;height:10px;overflow:hidden;margin-bottom:8px">'
            + '<div style="height:100%;border-radius:99px;background:linear-gradient(90deg,#f59e0b,#f97316);width:' + pct.toFixed(2) + '%"></div></div>'
            + '<div style="display:flex;justify-content:space-between">'
            + '<span style="font-size:11px;color:var(--muted)">$' + fmtShort(bal) + ' / $10,000</span>'
            + '<span style="font-size:11px;color:var(--yellow)">Need $' + fmt(need) + ' more</span></div></div>'

            + '<div style="background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px;margin-bottom:20px">'
            + '<div style="font-size:13px;font-weight:600;margin-bottom:12px">How to unlock faster</div>'
            + '<div style="display:flex;flex-direction:column;gap:10px">'
            + '<div style="display:flex;align-items:flex-start;gap:10px"><div style="width:24px;height:24px;border-radius:50%;background:rgba(0,212,170,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div><span style="font-size:13px;color:var(--muted);line-height:1.6">Your balance grows at <strong style="color:var(--text)">' + (getDailyRate() * 100).toFixed(2) + '% per day</strong> automatically</span></div>'
            + '<div style="display:flex;align-items:flex-start;gap:10px"><div style="width:24px;height:24px;border-radius:50%;background:rgba(59,130,246,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 5 5 12"/></svg></div><span style="font-size:13px;color:var(--muted);line-height:1.6">Make a <strong style="color:var(--text)">deposit</strong> to boost your daily rate up to 2.5%/day</span></div>'
            + '</div></div>'

            + '<button class="pbtn" onclick="goDeposit()">Make a deposit to grow faster</button>'
            + '<button class="gbtn" onclick="go(\'homeScreen\')">Back to portfolio</button>';

    } else {
        body.innerHTML =
            '<div style="background:rgba(0,212,170,.07);border:1px solid rgba(0,212,170,.2);border-radius:16px;padding:18px;margin-bottom:20px;text-align:center">'
            + '<div style="font-size:32px;margin-bottom:8px">🎉</div>'
            + '<div style="font-size:14px;font-weight:700;color:var(--accent);margin-bottom:4px">Withdrawal Unlocked!</div>'
            + '<div style="font-size:13px;color:var(--muted)">Your balance has reached the $10,000 goal</div></div>'

            + '<div class="field"><label class="flabel">Withdrawal amount</label>'
            + '<div class="fwrap"><svg class="ficon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>'
            + '<input class="finput" id="wdAmt" type="number" value="' + MIN_WITHDRAWAL + '" min="' + MIN_WITHDRAWAL + '" max="' + Math.floor(bal) + '" oninput="valWD()"></div>'
            + '<div class="ferror" id="wdErr">Minimum withdrawal is $' + MIN_WITHDRAWAL.toLocaleString() + '</div></div>'

            + '<div style="background:var(--card);border:1px solid var(--border);border-radius:13px;padding:15px;margin-bottom:16px">'
            + '<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:13px"><span style="color:var(--muted)">Available balance</span><span style="font-weight:600;color:var(--green)">$' + fmt(bal) + '</span></div>'
            + '<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:13px"><span style="color:var(--muted)">Minimum withdrawal</span><span style="font-weight:500">$' + MIN_WITHDRAWAL.toLocaleString() + '</span></div>'
            + '<div style="display:flex;justify-content:space-between;padding:5px 0;font-size:13px"><span style="color:var(--muted)">Processing time</span><span style="font-weight:500">1–3 business days</span></div></div>'

            + '<div class="field"><label class="flabel">Withdrawal wallet address</label>'
            + '<div class="fwrap"><svg class="ficon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>'
            + '<input class="finput" id="wdAddr" type="text" placeholder="Enter your wallet address"></div></div>'

            + '<div class="field"><label class="flabel">Select coin</label>'
            + '<div class="fwrap"><svg class="ficon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
            + '<select class="fselect" id="wdCoin"><option>BTC</option><option>ETH</option><option>XRP</option><option>SOL</option><option>BNB</option></select>'
            + '<svg class="sarrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></div></div>'

            + '<button class="pbtn" id="wdBtn" onclick="doWithdraw()">Request withdrawal</button>'
            + '<div style="font-size:12px;color:var(--muted);text-align:center;margin-bottom:28px;line-height:1.7">Withdrawal requests are reviewed within 1–3 business days. You will be notified by email.</div>';
    }
}