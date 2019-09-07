const Joi = require('@hapi/joi')
const TyrDB = require('tyrdb');
const adapters = require('tyrdb/adapters');

const internals = {
  optionsScheme: Joi.object({
    path: Joi.string().default('.db'),
    db: Joi.string().default('dbName'),
    adapter: Joi.string().default('MemoryAdapter'),
    order: Joi.number().default(511),
    uniques: Joi.array().optional(),
    exclude: Joi.array().optional(),
    autoConnect: Joi.boolean().optional(),
    autoInitialize: Joi.boolean().optional(),
  })
};

async function register(server, options) {
  const validateOptions = internals.optionsScheme.validate(options)
  const validatedOptions = Object.assign({}, validateOptions.value);
  const Adapter = adapters[validatedOptions.adapter];
  if(!Adapter){
    throw new Error(`Not supported adapter : ${validatedOptions.adapter}`)
  }
  delete validatedOptions.adapter;
  const adapter = new Adapter()

  return new Promise(((resolve, reject) => {
    const tyrdb = new TyrDB(Object.assign({}, adapter, validatedOptions));
    server.expose({ tyrdb });
    server.decorate('server', 'tyrdb', tyrdb);
    tyrdb.on('ready', async ()=>{
      const db = await tyrdb.db(validatedOptions.db);
      server.expose({ db });
      server.decorate('server', 'db', db);
      resolve(true);
    });
  }));
};


module.exports = register
