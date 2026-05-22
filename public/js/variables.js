/* ======================================================
   INVESTMENT SYSTEM — NexVault
   - $1,000 welcome bonus on signup
   - Base daily growth: 0.5%
   - Extra growth: +0.1% per $100 deposited (max 2.5%/day)
   - Withdrawal unlocked at $10,000
   - Min withdrawal: $10,000
====================================================== */

var WELCOME_BONUS    = 1000;
var GOAL_AMOUNT      = 10000;
var MIN_WITHDRAWAL   = 10000;
var BASE_DAILY_RATE  = 0.005;   // 0.5% per day

/* User state (in a real app, store in a backend database) */
var user = {
  name:        'User',
  balance:     WELCOME_BONUS,
  deposited:   0,
  joinedDate:  Date.now(),
  lastGrowth:  Date.now(),
  history:     [],
  bonusShown:  false
};