let gCfg = require('./config.global');

let cfg = JSON.parse(JSON.stringify(gCfg));

cfg.debug = false;

export default cfg;