function renderDep(){
  setDepSteps();

  var b = document.getElementById('depBody');
  
  if(depStep===1){
    var h = '<label class="flabel" style="display:block;margin-bottom:10px">Choose coin to deposit</label><div class="coingrid">';
    depCoins.forEach(function(c){
      h += '<div class="coinopt'+(depCoin===c.sym?' on':'')+'" onclick="depPickCoin(&quot;'+c.sym+'&quot;)"><span class="csym '+c.cls+'">'+c.sym+'</span><span class="cnsm">'+c.name+'</span></div>';
    });
    h += '</div><div style="background:rgba(0,212,170,.07);border:1px solid rgba(0,212,170,.2);border-radius:12px;padding:13px;display:flex;gap:9px;margin-bottom:20px"><svg style="flex-shrink:0;margin-top:1px" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span style="font-size:12px;color:#6ee7da;line-height:1.7">Deposits increase your daily growth rate. Every $100 deposited adds +0.1%/day to your rate, up to 2.5%/day.</span></div>';
    h += '<div class="navrow"><button class="nxbtn" id="dn1" onclick="depNext()" '+(depCoin?'':'disabled')+'>Continue \u2192</button></div>';
    b.innerHTML = h;
  } else if(depStep===2){
    var nets = depNets[depCoin] || [];
    var h = '<label class="flabel" style="display:block;margin-bottom:10px">Select network for '+depCoin+'</label><div class="netlist">';
    nets.forEach(function(n){
      var sel = depNet===n.id;
      h += '<div class="netopt'+(sel?' on':'')+'" onclick="depPickNet(&quot;'+n.id+'&quot;)"><div class="netico" style="background:'+n.col+'22;color:'+n.col+'">'+n.abbr+'</div><div style="flex:1"><div class="netnm">'+n.name+'</div><div class="netsub">'+n.sub+'</div></div><div style="text-align:right"><div class="netfee">'+n.fee+'</div><div class="radio'+(sel?' on':'')+'"></div></div></div>';
    });
    h += '</div><div class="navrow"><button class="nbtn" onclick="depBack()">\u2190 Back</button><button class="nxbtn" id="dn2" onclick="depNext()" '+(depNet?'':'disabled')+'>Continue \u2192</button></div>';
    b.innerHTML = h;
  } else {
    var addr = WALLET_ADDRESSES[depCoin] || '';
    b.innerHTML = '<div style="background:rgba(0,212,170,.06);border:1px solid rgba(0,212,170,.15);border-radius:13px;padding:13px;display:flex;align-items:center;gap:10px;margin-bottom:16px"><svg style="flex-shrink:0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" stroke-width="1.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg><span style="font-size:12px;color:#6ee7da;line-height:1.6">After sending, your deposit will be confirmed and your daily growth rate will increase automatically.</span></div>'
      + '<div class="addrcard"><div class="qrwrap"><div class="qrbox" id="qrCanvas"></div></div>'
      + '<span class="addrlabel">Your '+depCoin+' deposit address</span>'
      + '<div class="addrbox"><span class="addrtxt">'+addr+'</span>'
      + '<button class="copybtn" onclick="doCopy(\''+addr+'\',this)">Copy</button></div></div>'
      + '<div class="warnbox"><svg style="flex-shrink:0;margin-top:2px" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><span class="warntxt">Only send <strong>'+depCoin+'</strong> on the selected network. Wrong asset or network = permanent loss of funds.</span></div>'
      + '<div class="sharerow"><button class="sharebtn">\uD83D\uDCE4 Share</button><button class="sharebtn">\uD83D\uDCF7 Save QR</button></div>'
      + '<div class="navrow"><button class="nbtn" onclick="depBack()">\u2190 Back</button><button class="nxbtn" onclick="go(\'homeScreen\')">Done</button></div>';
    setTimeout(function(){
      var el = document.getElementById('qrCanvas');
      if(el && addr){
        new QRCode(el, { text: addr, width: 140, height: 140, colorDark: '#000000', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M });
      }
    }, 60);
  }
}



