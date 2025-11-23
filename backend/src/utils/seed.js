const { sequelize, Produto, Embalagem, UnidadeProducao, Cliente, Campanha, CampanhaProduto } = require('../models');

async function run() {
  await sequelize.sync({ force: true });

  const [lata350, garrafa600, pet15] = await Embalagem.bulkCreate([
    { nome: 'Lata', material: 'alumínio', custo: 0.8, volume: 350, unidadeVolume: 'ml' },
    { nome: 'Garrafa', material: 'vidro', custo: 1.2, volume: 600, unidadeVolume: 'ml' },
    { nome: 'Garrafa PET', material: 'plástico', custo: 1.5, volume: 1.5, unidadeVolume: 'L' },
  ]);

  const [bahia, es] = await UnidadeProducao.bulkCreate([
    { nome: 'Bahia', endereco: 'BA, Brasil', cnpj: '12.345.678/0001-00', areaConstruida: 12000, telefone: '(71) 3333-3333' },
    { nome: 'Espírito Santo', endereco: 'ES, Brasil', cnpj: '98.765.432/0001-00', areaConstruida: 9000, telefone: '(27) 2222-2222' },
  ]);

  const [cervejaBranca, cervejaEscura, guaranaNormal, guaranaLight, aguaComGas, aguaSemGas] = await Produto.bulkCreate([
    { nome: 'Cerveja Branca', quantidadeEstoque: 5000, preco: 7.9, percentualComissao: 5, formulaProducao: 'Malte claro, lúpulo, água' },
    { nome: 'Cerveja Escura', quantidadeEstoque: 4000, preco: 8.9, percentualComissao: 6, formulaProducao: 'Malte escuro, lúpulo, água' },
    { nome: 'Guaraná Normal', quantidadeEstoque: 8000, preco: 5.5, percentualComissao: 4, formulaProducao: 'Extrato de guaraná, água, açúcar' },
    { nome: 'Guaraná Light', quantidadeEstoque: 6000, preco: 5.9, percentualComissao: 4, formulaProducao: 'Extrato de guaraná, água, adoçante' },
    { nome: 'Água mineral com gás', quantidadeEstoque: 9000, preco: 3.2, percentualComissao: 3, formulaProducao: 'Água mineral gaseificada' },
    { nome: 'Água mineral sem gás', quantidadeEstoque: 10000, preco: 2.8, percentualComissao: 3, formulaProducao: 'Água mineral' },
  ]);
  const [heineken, stella, corona, jwBlack, jwGold, chivas12, jackDaniels, absolut, ciroc, greyGoose, tanqueray, bombay, joseCuervoGold, patronSilver, baileys, redBull250, redBull473, monsterEnergy, vibeEnergy, cocaCola] = await Produto.bulkCreate([
    { nome: 'Heineken', quantidadeEstoque: 7000, preco: 9.5, percentualComissao: 5, formulaProducao: 'Cerveja puro malte' },
    { nome: 'Stella Artois', quantidadeEstoque: 6000, preco: 10.5, percentualComissao: 5, formulaProducao: 'Cerveja lager' },
    { nome: 'Corona', quantidadeEstoque: 5500, preco: 10.9, percentualComissao: 5, formulaProducao: 'Cerveja lager' },
    { nome: 'Johnnie Walker Black Label', quantidadeEstoque: 1200, preco: 169.9, percentualComissao: 8, formulaProducao: 'Blended Scotch Whisky' },
    { nome: 'Johnnie Walker Gold Label', quantidadeEstoque: 800, preco: 239.9, percentualComissao: 8, formulaProducao: 'Blended Scotch Whisky' },
    { nome: 'Chivas Regal 12 anos', quantidadeEstoque: 1500, preco: 149.9, percentualComissao: 8, formulaProducao: 'Blended Scotch Whisky' },
    { nome: 'Jack Daniel\'s', quantidadeEstoque: 2000, preco: 159.9, percentualComissao: 8, formulaProducao: 'Tennessee Whiskey' },
    { nome: 'Absolut', quantidadeEstoque: 3000, preco: 99.9, percentualComissao: 6, formulaProducao: 'Vodka' },
    { nome: 'Cîroc', quantidadeEstoque: 900, preco: 239.9, percentualComissao: 8, formulaProducao: 'Vodka' },
    { nome: 'Grey Goose', quantidadeEstoque: 1100, preco: 219.9, percentualComissao: 8, formulaProducao: 'Vodka' },
    { nome: 'Gin Tanqueray', quantidadeEstoque: 2200, preco: 129.9, percentualComissao: 6, formulaProducao: 'Gin' },
    { nome: 'Gin Bombay Sapphire', quantidadeEstoque: 1800, preco: 139.9, percentualComissao: 6, formulaProducao: 'Gin' },
    { nome: 'Tequila José Cuervo Gold', quantidadeEstoque: 1600, preco: 119.9, percentualComissao: 6, formulaProducao: 'Tequila' },
    { nome: 'Tequila Patrón Silver', quantidadeEstoque: 700, preco: 299.9, percentualComissao: 8, formulaProducao: 'Tequila' },
    { nome: 'Baileys', quantidadeEstoque: 1900, preco: 99.9, percentualComissao: 6, formulaProducao: 'Irish Cream Liqueur' },
    { nome: 'Red Bull 250ml', quantidadeEstoque: 10000, preco: 8.9, percentualComissao: 4, formulaProducao: 'Energy drink' },
    { nome: 'Red Bull 473ml', quantidadeEstoque: 7000, preco: 12.9, percentualComissao: 4, formulaProducao: 'Energy drink' },
    { nome: 'Monster Energy', quantidadeEstoque: 8000, preco: 10.9, percentualComissao: 4, formulaProducao: 'Energy drink' },
    { nome: 'Vibe Energy Drink', quantidadeEstoque: 5000, preco: 6.9, percentualComissao: 4, formulaProducao: 'Energy drink' },
    { nome: 'Coca-Cola', quantidadeEstoque: 20000, preco: 6.5, percentualComissao: 4, formulaProducao: 'Refrigerante' },
  ]);

  await cervejaBranca.setUnidadesProducao([bahia.id, es.id]);
  await cervejaEscura.setUnidadesProducao([bahia.id]);
  await guaranaNormal.setUnidadesProducao([es.id]);
  await guaranaLight.setUnidadesProducao([es.id]);
  await aguaComGas.setUnidadesProducao([es.id]);
  await aguaSemGas.setUnidadesProducao([es.id]);
  await heineken.setUnidadesProducao([bahia.id]);
  await stella.setUnidadesProducao([bahia.id]);
  await corona.setUnidadesProducao([es.id]);
  await jwBlack.setUnidadesProducao([es.id]);
  await jwGold.setUnidadesProducao([es.id]);
  await chivas12.setUnidadesProducao([es.id]);
  await jackDaniels.setUnidadesProducao([es.id]);
  await absolut.setUnidadesProducao([es.id]);
  await ciroc.setUnidadesProducao([es.id]);
  await greyGoose.setUnidadesProducao([es.id]);
  await tanqueray.setUnidadesProducao([es.id]);
  await bombay.setUnidadesProducao([es.id]);
  await joseCuervoGold.setUnidadesProducao([es.id]);
  await patronSilver.setUnidadesProducao([es.id]);
  await baileys.setUnidadesProducao([es.id]);
  await redBull250.setUnidadesProducao([bahia.id, es.id]);
  await redBull473.setUnidadesProducao([bahia.id, es.id]);
  await monsterEnergy.setUnidadesProducao([bahia.id, es.id]);
  await vibeEnergy.setUnidadesProducao([bahia.id, es.id]);
  await cocaCola.setUnidadesProducao([bahia.id, es.id]);

  await cervejaBranca.setEmbalagens([lata350.id, garrafa600.id]);
  await cervejaEscura.setEmbalagens([lata350.id, garrafa600.id]);
  await guaranaNormal.setEmbalagens([lata350.id, pet15.id]);
  await guaranaLight.setEmbalagens([lata350.id, pet15.id]);
  await aguaComGas.setEmbalagens([garrafa600.id, pet15.id]);
  await aguaSemGas.setEmbalagens([garrafa600.id, pet15.id]);
  await heineken.setEmbalagens([lata350.id, garrafa600.id]);
  await stella.setEmbalagens([lata350.id, garrafa600.id]);
  await corona.setEmbalagens([lata350.id, garrafa600.id]);
  await jwBlack.setEmbalagens([garrafa600.id]);
  await jwGold.setEmbalagens([garrafa600.id]);
  await chivas12.setEmbalagens([garrafa600.id]);
  await jackDaniels.setEmbalagens([garrafa600.id]);
  await absolut.setEmbalagens([garrafa600.id]);
  await ciroc.setEmbalagens([garrafa600.id]);
  await greyGoose.setEmbalagens([garrafa600.id]);
  await tanqueray.setEmbalagens([garrafa600.id]);
  await bombay.setEmbalagens([garrafa600.id]);
  await joseCuervoGold.setEmbalagens([garrafa600.id]);
  await patronSilver.setEmbalagens([garrafa600.id]);
  await baileys.setEmbalagens([garrafa600.id]);
  await redBull250.setEmbalagens([lata350.id]);
  await redBull473.setEmbalagens([garrafa600.id]);
  await monsterEnergy.setEmbalagens([lata350.id]);
  await vibeEnergy.setEmbalagens([lata350.id]);
  await cocaCola.setEmbalagens([lata350.id, garrafa600.id, pet15.id]);

  await Cliente.bulkCreate([
    { razaoSocial: 'Supermercados Vitória LTDA', cnpj: '11.111.111/0001-11', endereco: 'Av. Central, 100', telefone: '(27) 99999-0001', contato: 'Mariana' },
    { razaoSocial: 'Distribuidora Bahia BEBIDAS', cnpj: '22.222.222/0001-22', endereco: 'Rua das Flores, 50', telefone: '(71) 98888-0002', contato: 'Carlos' },
  ]);

  const verao = await Campanha.create({ nome: 'Verão Refrescante', descricao: 'Refresque seu verão com BeboSim', inicio: new Date(), fim: new Date(Date.now() + 1000*60*60*24*30), garotoPropaganda: 'Neymar' });
  const classicos = await Campanha.create({ nome: 'Clássicos BeboSim', descricao: 'Os sabores tradicionais que você ama', inicio: new Date(), fim: new Date(Date.now() + 1000*60*60*24*15), garotoPropaganda: 'Guga' });

  await CampanhaProduto.bulkCreate([
    { campanhaId: verao.id, produtoId: aguaComGas.id, precoPromocional: 2.9 },
    { campanhaId: verao.id, produtoId: aguaSemGas.id, precoPromocional: 2.5 },
    { campanhaId: verao.id, produtoId: guaranaNormal.id, precoPromocional: 4.9 },
    { campanhaId: classicos.id, produtoId: heineken.id, precoPromocional: 8.9 },
    { campanhaId: classicos.id, produtoId: stella.id, precoPromocional: 9.8 },
    { campanhaId: classicos.id, produtoId: corona.id, precoPromocional: 9.9 },
    { campanhaId: verao.id, produtoId: redBull250.id, precoPromocional: 7.9 },
    { campanhaId: verao.id, produtoId: monsterEnergy.id, precoPromocional: 9.9 },
    { campanhaId: verao.id, produtoId: cocaCola.id, precoPromocional: 5.9 },
  ]);
}

run().then(() => {
  console.log('Seed concluído.');
  process.exit(0);
}).catch((e) => { console.error(e); process.exit(1); });
