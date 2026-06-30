import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.processResource.deleteMany();
  await prisma.process.deleteMany();
  console.log('Cleared existing processes');

  console.log('Seeding resources...');

  const resources = await Promise.all([
    // POWDER
    prisma.resource.upsert({
      where: { slug: 'po-ori' },
      update: {},
      create: {
        name: 'Poeira de Ori',
        slug: 'po-ori',
        category: 'POWDER',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'pl' },
      update: {},
      create: {
        name: 'Poeira de Lactolerium',
        slug: 'pl',
        category: 'POWDER',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'lac-100' },
      update: {},
      create: {
        name: 'Lactolerium 100%',
        slug: 'lac-100',
        category: 'POWDER',
        mobile: true,
      },
    }),

    // CRYSTAL
    prisma.resource.upsert({
      where: { slug: 'crystal-bahamut' },
      update: {},
      create: {
        name: 'Crystal Bahamut',
        slug: 'crystal-bahamut',
        category: 'CRYSTAL',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'crystal-amunra' },
      update: {},
      create: {
        name: 'Crystal Amunra',
        slug: 'crystal-amunra',
        category: 'CRYSTAL',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'anubis-crystal' },
      update: {},
      create: {
        name: 'Anubis Crystal',
        slug: 'anubis-crystal',
        category: 'CRYSTAL',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'loki-crystal' },
      update: {},
      create: {
        name: 'Loki Crystal (Amunra)',
        slug: 'loki-crystal',
        category: 'CRYSTAL',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'primordial-crystal' },
      update: {},
      create: {
        name: 'Primordial Crystal',
        slug: 'primordial-crystal',
        category: 'CRYSTAL',
        mobile: false,
      },
    }),

    // STONE
    prisma.resource.upsert({
      where: { slug: 'joia-escuridao' },
      update: {},
      create: {
        name: 'Joia da Escuridão',
        slug: 'joia-escuridao',
        category: 'STONE',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'pedra-lunar' },
      update: {},
      create: {
        name: 'Pedra Lunar',
        slug: 'pedra-lunar',
        category: 'STONE',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'pedra-imortalidade' },
      update: {},
      create: {
        name: 'Pedra da Imortalidade',
        slug: 'pedra-imortalidade',
        category: 'STONE',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'pedra-furia' },
      update: {},
      create: {
        name: 'Pedra da Fúria',
        slug: 'pedra-furia',
        category: 'STONE',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'kit-secretas' },
      update: {},
      create: {
        name: 'Kit Secretas (Sol/Água/Terra/Vento)',
        slug: 'kit-secretas',
        category: 'STONE',
        mobile: true,
      },
    }),

    // EMBLEM
    prisma.resource.upsert({
      where: { slug: 'emblema-valk' },
      update: {},
      create: {
        name: 'Emblema da Valkyria',
        slug: 'emblema-valk',
        category: 'EMBLEM',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'emblema-valk-9' },
      update: {},
      create: {
        name: 'Emblema da Valkyria +9',
        slug: 'emblema-valk-9',
        category: 'EMBLEM',
        mobile: true,
      },
    }),

    // MEDAL
    prisma.resource.upsert({
      where: { slug: 'medalha-vermelha' },
      update: {},
      create: {
        name: 'Medalha Vermelha',
        slug: 'medalha-vermelha',
        category: 'MEDAL',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'medalha-roxa' },
      update: {},
      create: {
        name: 'Medalha Roxa',
        slug: 'medalha-roxa',
        category: 'MEDAL',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'medalha-dourada' },
      update: {},
      create: {
        name: 'Medalha Dourada',
        slug: 'medalha-dourada',
        category: 'MEDAL',
        mobile: false,
      },
    }),

    // DRAGON
    prisma.resource.upsert({
      where: { slug: 'rd-scale' },
      update: {},
      create: {
        name: 'RD Scale',
        slug: 'rd-scale',
        category: 'DRAGON',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'dragon-soul' },
      update: {},
      create: {
        name: 'Dragon Soul',
        slug: 'dragon-soul',
        category: 'DRAGON',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'dragon-essence' },
      update: {},
      create: {
        name: 'Dragon Essence',
        slug: 'dragon-essence',
        category: 'DRAGON',
        mobile: false,
      },
    }),

    // BAHAMUT
    prisma.resource.upsert({
      where: { slug: 'bahamut-horn' },
      update: {},
      create: {
        name: 'Bahamut Horn',
        slug: 'bahamut-horn',
        category: 'BAHAMUT',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'bahamut-rune' },
      update: {},
      create: {
        name: 'Bahamut Rune',
        slug: 'bahamut-rune',
        category: 'BAHAMUT',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'bahamut-soul' },
      update: {},
      create: {
        name: 'Bahamut Soul',
        slug: 'bahamut-soul',
        category: 'BAHAMUT',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'bahamut-blood' },
      update: {},
      create: {
        name: 'Bahamut Blood',
        slug: 'bahamut-blood',
        category: 'BAHAMUT',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'bahamut-simbol' },
      update: {},
      create: {
        name: 'Bahamut Simbol',
        slug: 'bahamut-simbol',
        category: 'BAHAMUT',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'bahamut-essence' },
      update: {},
      create: {
        name: 'Bahamut Essence',
        slug: 'bahamut-essence',
        category: 'BAHAMUT',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'ancient-relic' },
      update: {},
      create: {
        name: 'Ancient Relic',
        slug: 'ancient-relic',
        category: 'BAHAMUT',
        mobile: false,
      },
    }),

    // TEAR
    prisma.resource.upsert({
      where: { slug: 'lagrima-azul' },
      update: {},
      create: {
        name: 'Lágrima Azul (Sadness)',
        slug: 'lagrima-azul',
        category: 'TEAR',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'lagrima-amarela' },
      update: {},
      create: {
        name: 'Lágrima Amarela (Happiness)',
        slug: 'lagrima-amarela',
        category: 'TEAR',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'lagrima-vermelha' },
      update: {},
      create: {
        name: 'Lágrima Vermelha (Rage)',
        slug: 'lagrima-vermelha',
        category: 'TEAR',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'lagrima-lucky' },
      update: {},
      create: {
        name: 'Lágrima Verde (Lucky)',
        slug: 'lagrima-lucky',
        category: 'TEAR',
        mobile: false,
      },
    }),

    // CYTHERA
    prisma.resource.upsert({
      where: { slug: 'cursed-hat-black' },
      update: {},
      create: {
        name: 'Cursed Hat (Black)',
        slug: 'cursed-hat-black',
        category: 'CYTHERA',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'barra-prata' },
      update: {},
      create: {
        name: 'Barra de Prata (1Bi)',
        slug: 'barra-prata',
        category: 'CYTHERA',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'folha-mandragora' },
      update: {},
      create: {
        name: 'Folha de Mandrágora',
        slug: 'folha-mandragora',
        category: 'CYTHERA',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'amago-dl' },
      update: {},
      create: {
        name: 'Âmago de Dragão Lendário',
        slug: 'amago-dl',
        category: 'MOUNT',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'royal-arena-coupon' },
      update: {},
      create: {
        name: 'Royal Arena Coupon',
        slug: 'royal-arena-coupon',
        category: 'COIN',
        mobile: false,
      },
    }),

    // MANTLE
    prisma.resource.upsert({
      where: { slug: 'selo-magico' },
      update: {},
      create: {
        name: 'Selo Mágico',
        slug: 'selo-magico',
        category: 'MANTLE',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'pergaminho-selado' },
      update: {},
      create: {
        name: 'Pergaminho Selado',
        slug: 'pergaminho-selado',
        category: 'MANTLE',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'ruby' },
      update: {},
      create: {
        name: 'Ruby',
        slug: 'ruby',
        category: 'COIN',
        mobile: false,
      },
    }),

    // MOUNT
    prisma.resource.upsert({
      where: { slug: 'amago-tf-0' },
      update: {},
      create: {
        name: 'Âmago Tigre de Fogo +0',
        slug: 'amago-tf-0',
        category: 'MOUNT',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'amago-dv-0' },
      update: {},
      create: {
        name: 'Âmago Dragão Vermelho +0',
        slug: 'amago-dv-0',
        category: 'MOUNT',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'amago-dl-0' },
      update: {},
      create: {
        name: 'Âmago Dragão Lendário +0',
        slug: 'amago-dl-0',
        category: 'MOUNT',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'amago-tf-10' },
      update: {},
      create: {
        name: 'Âmago Tigre de Fogo +10',
        slug: 'amago-tf-10',
        category: 'MOUNT',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'amago-dv-10' },
      update: {},
      create: {
        name: 'Âmago Dragão Vermelho +10',
        slug: 'amago-dv-10',
        category: 'MOUNT',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'amago-dl-10' },
      update: {},
      create: {
        name: 'Âmago Dragão Lendário +10',
        slug: 'amago-dl-10',
        category: 'MOUNT',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'amago-jackal-0' },
      update: {},
      create: {
        name: 'Âmago de Jackal +0',
        slug: 'amago-jackal-0',
        category: 'MOUNT',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'amago-jackal-10' },
      update: {},
      create: {
        name: 'Âmago de Jackal +10',
        slug: 'amago-jackal-10',
        category: 'MOUNT',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'ovo-azul' },
      update: {},
      create: {
        name: 'Ovo Azul',
        slug: 'ovo-azul',
        category: 'MOUNT',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'ovo-amarelo' },
      update: {},
      create: {
        name: 'Ovo Amarelo',
        slug: 'ovo-amarelo',
        category: 'MOUNT',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'ovo-vermelho' },
      update: {},
      create: {
        name: 'Ovo Vermelho',
        slug: 'ovo-vermelho',
        category: 'MOUNT',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'soul-fragment' },
      update: {},
      create: {
        name: 'Soul Fragment',
        slug: 'soul-fragment',
        category: 'OTHER',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'jackal-armor' },
      update: {},
      create: {
        name: 'Jackal Armor',
        slug: 'jackal-armor',
        category: 'MOUNT',
        mobile: false,
      },
    }),

    // COIN / OTHER
    prisma.resource.upsert({
      where: { slug: 'gold' },
      update: {},
      create: {
        name: 'Gold (kk)',
        slug: 'gold',
        category: 'COIN',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'guild-coin' },
      update: {},
      create: {
        name: 'Guild Coin',
        slug: 'guild-coin',
        category: 'COIN',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'wyden-coin' },
      update: {},
      create: {
        name: 'Wyden Coin (moeda NP)',
        slug: 'wyden-coin',
        category: 'COIN',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'hunting-loot' },
      update: {},
      create: {
        name: 'Hunting Loot',
        slug: 'hunting-loot',
        category: 'OTHER',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'mount-growth-stabilizer' },
      update: {},
      create: {
        name: 'Mount Growth Stabilizer',
        slug: 'mount-growth-stabilizer',
        category: 'MOUNT',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'relic-protection' },
      update: {},
      create: {
        name: 'Relic of Protection (Selada)',
        slug: 'relic-protection',
        category: 'OTHER',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'relic-power' },
      update: {},
      create: {
        name: 'Relic of Power (Selada)',
        slug: 'relic-power',
        category: 'OTHER',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'funeral-scroll' },
      update: {},
      create: {
        name: 'Funeral Scroll',
        slug: 'funeral-scroll',
        category: 'OTHER',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'cupom-bonus' },
      update: {},
      create: {
        name: 'Cupom de Bônus',
        slug: 'cupom-bonus',
        category: 'COIN',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'eye-of-wisdom' },
      update: {},
      create: {
        name: 'Eye of Wisdom',
        slug: 'eye-of-wisdom',
        category: 'OTHER',
        mobile: false,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'essence-0' },
      update: {},
      create: {
        name: 'Essência +0',
        slug: 'essence-0',
        category: 'OTHER',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'essence-9' },
      update: {},
      create: {
        name: 'Essência +9',
        slug: 'essence-9',
        category: 'OTHER',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'refin-abencoa' },
      update: {},
      create: {
        name: 'Refinação Abençoada',
        slug: 'refin-abencoa',
        category: 'OTHER',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'mark-bahamut' },
      update: {},
      create: {
        name: 'Mark of Bahamut',
        slug: 'mark-bahamut',
        category: 'BAHAMUT',
        mobile: true,
      },
    }),
    prisma.resource.upsert({
      where: { slug: 'celestial-part' },
      update: {},
      create: {
        name: 'Parte Celestial +9 (equivalente)',
        slug: 'celestial-part',
        category: 'OTHER',
        mobile: false,
      },
    }),
    prisma.resource.upsert({ where: { slug: 'amago-dl-9' }, update: {}, create: { name: 'Âmago de Dragão Lendário +9', slug: 'amago-dl-9', category: 'MOUNT', mobile: true } }),
    prisma.resource.upsert({ where: { slug: 'amago-dv-9' }, update: {}, create: { name: 'Âmago de Dragão Vermelho +9', slug: 'amago-dv-9', category: 'MOUNT', mobile: true } }),
    prisma.resource.upsert({ where: { slug: 'barra-100kk' }, update: {}, create: { name: 'Barra de 100kk', slug: 'barra-100kk', category: 'COIN', mobile: true } }),
    prisma.resource.upsert({ where: { slug: 'pergaminho-a' }, update: {}, create: { name: 'Pergaminho (A)', slug: 'pergaminho-a', category: 'PARCHMENT' as any, mobile: true } }),
    prisma.resource.upsert({ where: { slug: 'pergaminho-m' }, update: {}, create: { name: 'Pergaminho (M)', slug: 'pergaminho-m', category: 'PARCHMENT' as any, mobile: true } }),
    prisma.resource.upsert({ where: { slug: 'infernal-scroll' }, update: {}, create: { name: 'Infernal', slug: 'infernal-scroll', category: 'PARCHMENT' as any, mobile: true } }),
    prisma.resource.upsert({ where: { slug: 'commemorative-coin' }, update: {}, create: { name: 'Commemorative Coin', slug: 'commemorative-coin', category: 'COIN', mobile: true } }),
    prisma.resource.upsert({ where: { slug: 'black-coin' }, update: {}, create: { name: 'Black Coin', slug: 'black-coin', category: 'COIN', mobile: true } }),
    prisma.resource.upsert({ where: { slug: 'cythera-m' }, update: {}, create: { name: 'Cythera (M)', slug: 'cythera-m', category: 'CYTHERA', mobile: true } }),
    prisma.resource.upsert({ where: { slug: 'cythera-a' }, update: {}, create: { name: 'Cythera (A)', slug: 'cythera-a', category: 'CYTHERA', mobile: true } }),
  ]);

  console.log(`Created ${resources.length} resources`);

  console.log('Seeding processes...');

  // Busca resources por slug para usar nos processos
  const r = Object.fromEntries(resources.map((res) => [res.slug, res]));

  const processes = [
    // === ARMADURA MORTAL ===
    {
      name: 'Refinação Armadura Mortal +1→+6',
      category: 'ARMOR',
      fromLevel: 1,
      toLevel: 6,
      notes: 'Usa Poeira de Ori.',
      resources: [{ slug: 'po-ori', quantity: 1, isConsumedOnFail: true }],
    },
    {
      name: 'Refinação Armadura Mortal +7→+9',
      category: 'ARMOR',
      fromLevel: 7,
      toLevel: 9,
      notes: 'Usa Poeira de Lactolerium.',
      resources: [{ slug: 'pl', quantity: 1, isConsumedOnFail: true }],
    },
    {
      name: 'Refinação Armadura Mortal +9→+10',
      category: 'ARMOR',
      fromLevel: 9,
      toLevel: 10,
      notes: 'Consome 2 itens +9 iguais em caso de sucesso.',
      resources: [
        { slug: 'pl', quantity: 30, isConsumedOnFail: true },
        { slug: 'gold', quantity: 5, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Armadura Mortal +10→+11',
      category: 'ARMOR',
      fromLevel: 10,
      toLevel: 11,
      notes: 'Usa PL ou Lac 100.',
      resources: [{ slug: 'pl', quantity: 1, isConsumedOnFail: true }],
    },
    {
      name: 'Refinação Armadura Mortal +11→+14',
      category: 'ARMOR',
      fromLevel: 11,
      toLevel: 14,
      notes:
        '4x Refinação Abençoada (+1 a +9, quanto maior a refinação maior a chance de sucesso) + 20x PL + 1kk Gold',
      resources: [
        { slug: 'refin-abencoa', quantity: 4, isConsumedOnFail: true },
        { slug: 'pl', quantity: 20, isConsumedOnFail: true },
        { slug: 'gold', quantity: 1, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Armadura Mortal +14→+15',
      category: 'ARMOR',
      fromLevel: 14,
      toLevel: 15,
      notes:
        '4x Refinação Abençoada + 20x PL + 1kk Gold. Usa 2 proteções no lugar de 20 PL para evitar cair para +13 em falha.',
      resources: [
        { slug: 'refin-abencoa', quantity: 4, isConsumedOnFail: true },
        { slug: 'pl', quantity: 20, isConsumedOnFail: true },
        { slug: 'gold', quantity: 1, isConsumedOnFail: true },
      ],
    },
    // === ARMADURA ARCH ===
    {
      name: 'Refinação Armadura Arch +1→+6',
      category: 'ARMOR',
      fromLevel: 1,
      toLevel: 6,
      notes: 'Usa Poeira de Ori.',
      resources: [{ slug: 'po-ori', quantity: 1, isConsumedOnFail: true }],
    },
    {
      name: 'Refinação Armadura Arch +7→+9',
      category: 'ARMOR',
      fromLevel: 7,
      toLevel: 9,
      notes: 'Usa Poeira de Lactolerium.',
      resources: [{ slug: 'pl', quantity: 1, isConsumedOnFail: true }],
    },
    {
      name: 'Refinação Armadura Arch +9→+10',
      category: 'ARMOR',
      fromLevel: 9,
      toLevel: 10,
      notes: 'Consome 2 itens +9 iguais em caso de sucesso.',
      resources: [
        { slug: 'pl', quantity: 30, isConsumedOnFail: true },
        { slug: 'gold', quantity: 5, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Armadura Arch +10→+11',
      category: 'ARMOR',
      fromLevel: 10,
      toLevel: 11,
      notes: 'Usa PL ou Lac 100.',
      resources: [{ slug: 'pl', quantity: 1, isConsumedOnFail: true }],
    },
    {
      name: 'Refinação Armadura Arch +11→+14',
      category: 'ARMOR',
      fromLevel: 11,
      toLevel: 14,
      notes:
        '4x Refinação Abençoada (+1 a +9, quanto maior a refinação maior a chance de sucesso) + 20x PL + 1kk Gold',
      resources: [
        { slug: 'refin-abencoa', quantity: 4, isConsumedOnFail: true },
        { slug: 'pl', quantity: 20, isConsumedOnFail: true },
        { slug: 'gold', quantity: 1, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Armadura Arch +14→+15',
      category: 'ARMOR',
      fromLevel: 14,
      toLevel: 15,
      notes:
        '4x Refinação Abençoada + 20x PL + 1kk Gold. Usa 2 proteções no lugar de 20 PL para evitar cair para +13 em falha.',
      resources: [
        { slug: 'refin-abencoa', quantity: 4, isConsumedOnFail: true },
        { slug: 'pl', quantity: 20, isConsumedOnFail: true },
        { slug: 'gold', quantity: 1, isConsumedOnFail: true },
      ],
    },
    // === ARMADURA CELESTIAL ===
    {
      name: 'Refinação Armadura Celestial +9→+11',
      category: 'ARMOR',
      fromLevel: 9,
      toLevel: 11,
      notes: 'Começa em +9. Usa PL ou Lac 100.',
      resources: [{ slug: 'pl', quantity: 1, isConsumedOnFail: true }],
    },
    {
      name: 'Refinação Armadura Celestial +11→+12',
      category: 'ARMOR',
      fromLevel: 11,
      toLevel: 12,
      notes: 'NPC Odin. Essências +0.',
      resources: [
        { slug: 'essence-0', quantity: 4, isConsumedOnFail: true },
        { slug: 'soul-fragment', quantity: 10, isConsumedOnFail: true },
        { slug: 'emblema-valk', quantity: 1, isConsumedOnFail: true },
        { slug: 'gold', quantity: 75, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Armadura Celestial +12→+13',
      category: 'ARMOR',
      fromLevel: 12,
      toLevel: 13,
      notes: 'NPC Odin. Essências +0.',
      resources: [
        { slug: 'essence-0', quantity: 4, isConsumedOnFail: true },
        { slug: 'soul-fragment', quantity: 10, isConsumedOnFail: true },
        { slug: 'emblema-valk', quantity: 1, isConsumedOnFail: true },
        { slug: 'gold', quantity: 100, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Armadura Celestial +13→+14',
      category: 'ARMOR',
      fromLevel: 13,
      toLevel: 14,
      notes: 'NPC Odin. Essências +9.',
      resources: [
        { slug: 'essence-9', quantity: 4, isConsumedOnFail: true },
        { slug: 'soul-fragment', quantity: 10, isConsumedOnFail: true },
        { slug: 'emblema-valk', quantity: 1, isConsumedOnFail: true },
        { slug: 'gold', quantity: 150, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Armadura Celestial +14→+15',
      category: 'ARMOR',
      fromLevel: 14,
      toLevel: 15,
      notes: 'NPC Odin. Essências +9.',
      resources: [
        { slug: 'essence-9', quantity: 4, isConsumedOnFail: true },
        { slug: 'soul-fragment', quantity: 10, isConsumedOnFail: true },
        { slug: 'emblema-valk', quantity: 1, isConsumedOnFail: true },
        { slug: 'gold', quantity: 200, isConsumedOnFail: true },
      ],
    },
    // === ARMADURA/ARMA RD ===
    {
      name: 'Refinação Armadura/Arma RD +9→+15',
      category: 'ARMOR',
      fromLevel: 9,
      toLevel: 15,
      notes:
        'Dragon Soul NÃO é consumido em falha — apenas recebe +1 refinação (max +9). Quanto maior o Dragon Soul, maior a chance.',
      resources: [
        { slug: 'rd-scale', quantity: 10, isConsumedOnFail: true },
        { slug: 'dragon-soul', quantity: 1, isConsumedOnFail: false },
        { slug: 'emblema-valk-9', quantity: 1, isConsumedOnFail: true },
        { slug: 'gold', quantity: 200, isConsumedOnFail: true },
      ],
    },
    // === CRIAÇÃO RD ===
    {
      name: 'Criação Item RD (Celestial +15 → RD +9)',
      category: 'ARMOR',
      notes:
        'Sucesso: todos os itens consumidos e RD +9 criado. Falha: todos consumidos exceto Celestial +15.',
      resources: [
        { slug: 'mark-bahamut', quantity: 1, isConsumedOnFail: true },
        { slug: 'rd-scale', quantity: 10, isConsumedOnFail: true },
        { slug: 'dragon-soul', quantity: 1, isConsumedOnFail: true },
        { slug: 'kit-secretas', quantity: 1, isConsumedOnFail: true },
        { slug: 'gold', quantity: 200, isConsumedOnFail: true },
      ],
    },
    // === CRIAÇÃO CELESTIAL ===
    {
      name: 'Criação Item Celestial Set (Arch +15 → Celestial +9)',
      category: 'ARMOR',
      successRate: 0.2,
      notes:
        '20% de sucesso. Em falha todos os itens são destruídos exceto o Arch +15. Em sucesso a parte que recebeu adicional retorna para +9.',
      resources: [
        { slug: 'pedra-lunar', quantity: 1, isConsumedOnFail: true },
        { slug: 'kit-secretas', quantity: 1, isConsumedOnFail: true },
        { slug: 'celestial-part', quantity: 1, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Criação Arma Celestial (Arch +15 → Celestial +9)',
      category: 'ARMOR',
      successRate: 0.2,
      notes:
        '20% de sucesso. Em falha todos os itens são destruídos exceto a Arma Arch +15. Requer Arma Celestial +9 equivalente.',
      resources: [
        { slug: 'joia-escuridao', quantity: 1, isConsumedOnFail: true },
        { slug: 'kit-secretas', quantity: 1, isConsumedOnFail: true },
      ],
    },
    // === ARMADURA BAHAMUT ===
    {
      name: 'Criação Armadura Bahamut (RD +15 → Bahamut)',
      category: 'ARMOR',
      successRate: 0.2,
      notes: 'Requer Ignite Buff. Em falha RD +15 é preservado.',
      resources: [
        { slug: 'bahamut-horn', quantity: 1, isConsumedOnFail: true },
        { slug: 'bahamut-rune', quantity: 20, isConsumedOnFail: true },
        { slug: 'bahamut-soul', quantity: 1, isConsumedOnFail: false },
        { slug: 'rd-scale', quantity: 20, isConsumedOnFail: true },
        { slug: 'bahamut-blood', quantity: 3, isConsumedOnFail: true },
        { slug: 'gold', quantity: 200, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Armadura Bahamut +1→+15',
      category: 'ARMOR',
      notes:
        'Bahamut Soul NÃO é consumido em falha — recebe +1 refinação. Requer Ignite Buff.',
      resources: [
        { slug: 'bahamut-horn', quantity: 1, isConsumedOnFail: true },
        { slug: 'bahamut-rune', quantity: 10, isConsumedOnFail: true },
        { slug: 'bahamut-soul', quantity: 1, isConsumedOnFail: false },
        { slug: 'rd-scale', quantity: 10, isConsumedOnFail: true },
        { slug: 'emblema-valk-9', quantity: 2, isConsumedOnFail: true },
        { slug: 'gold', quantity: 200, isConsumedOnFail: true },
      ],
    },
    // === CYTHERA ARCANA ===
    {
      name: 'Criação Cythera Arcana — 1ª vez',
      category: 'CYTHERA',
      successRate: 0.5,
      notes: 'Requer Cythera Mística +10 e 1000 pontos de Fama.',
      resources: [
        { slug: 'pedra-furia', quantity: 1, isConsumedOnFail: true },
        { slug: 'kit-secretas', quantity: 1, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Criação Cythera Arcana — 2ª vez',
      category: 'CYTHERA',
      successRate: 0.5,
      notes: 'NPC ArcaneJeweler em Kefra.',
      resources: [
        { slug: 'pedra-furia', quantity: 2, isConsumedOnFail: true },
        { slug: 'kit-secretas', quantity: 2, isConsumedOnFail: true },
        { slug: 'emblema-valk', quantity: 4, isConsumedOnFail: true },
        { slug: 'gold', quantity: 100, isConsumedOnFail: true },
      ],
    },
    // === CYTHERA BAHAMUT ===
    {
      name: 'Criação Cythera Bahamut',
      category: 'CYTHERA',
      successRate: 1.0,
      notes: 'NPC DarkBlackSmith, Arzan.',
      resources: [
        { slug: 'cursed-hat-black', quantity: 4, isConsumedOnFail: true },
        { slug: 'barra-prata', quantity: 1, isConsumedOnFail: true },
        { slug: 'medalha-vermelha', quantity: 2, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Cythera Bahamut +0→+15',
      category: 'CYTHERA',
      notes: 'NPC DarkBlackSmith. Folha de Mandrágora OU 10 Âmagos de DL.',
      resources: [
        { slug: 'crystal-bahamut', quantity: 1, isConsumedOnFail: true },
        { slug: 'pl', quantity: 6, isConsumedOnFail: true },
        { slug: 'folha-mandragora', quantity: 1, isConsumedOnFail: true },
        { slug: 'gold', quantity: 5, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Cythera Bahamut +13→+15 (Premium)',
      category: 'CYTHERA',
      notes:
        'Não reduz refinação em falha. Anubis Crystal dobra a chance (opcional).',
      resources: [
        { slug: 'crystal-bahamut', quantity: 50, isConsumedOnFail: true },
        { slug: 'pl', quantity: 60, isConsumedOnFail: true },
        { slug: 'folha-mandragora', quantity: 10, isConsumedOnFail: true },
        { slug: 'gold', quantity: 100, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Adicional Cythera Bahamut',
      category: 'CYTHERA',
      notes: 'NPC DarkBlackSmith. Insere adicional na Cythera Bahamut.',
      resources: [
        { slug: 'crystal-bahamut', quantity: 30, isConsumedOnFail: true },
        { slug: 'pl', quantity: 20, isConsumedOnFail: true },
        { slug: 'gold', quantity: 10, isConsumedOnFail: true },
      ],
    },
    // === CYTHERA AMUNRA ===
    {
      name: 'Criação Cythera Amunra',
      category: 'CYTHERA',
      successRate: 1.0,
      notes: 'NPC DarkBlackSmith, Arzan.',
      resources: [
        { slug: 'cursed-hat-black', quantity: 2, isConsumedOnFail: true },
        { slug: 'pedra-imortalidade', quantity: 1, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Cythera Amunra +1→+13',
      category: 'CYTHERA',
      notes: 'NPC DarkBlackSmith. Folha de Mandrágora OU Selo Mágico.',
      resources: [
        { slug: 'crystal-amunra', quantity: 1, isConsumedOnFail: true },
        { slug: 'pl', quantity: 6, isConsumedOnFail: true },
        { slug: 'folha-mandragora', quantity: 1, isConsumedOnFail: true },
        { slug: 'gold', quantity: 5, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Cythera Amunra +13→+15 (Premium)',
      category: 'CYTHERA',
      notes:
        'Não reduz refinação em falha. Anubis Crystal dobra a chance (opcional).',
      resources: [
        { slug: 'crystal-amunra', quantity: 50, isConsumedOnFail: true },
        { slug: 'pl', quantity: 60, isConsumedOnFail: true },
        { slug: 'folha-mandragora', quantity: 10, isConsumedOnFail: true },
        { slug: 'gold', quantity: 100, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Adicional Cythera Amunra',
      category: 'CYTHERA',
      notes: 'NPC DarkBlackSmith. Insere adicional na Cythera Amunra.',
      resources: [
        { slug: 'crystal-amunra', quantity: 30, isConsumedOnFail: true },
        { slug: 'pl', quantity: 20, isConsumedOnFail: true },
        { slug: 'gold', quantity: 10, isConsumedOnFail: true },
      ],
    },
    // === CYTHERA ANUBIS ===
    {
      name: 'Criação Cythera Anúbis (de Bahamut +14)',
      category: 'CYTHERA',
      successRate: 0.3,
      notes: 'NPC Anubis, Noatun.',
      resources: [
        { slug: 'cursed-hat-black', quantity: 3, isConsumedOnFail: true },
        { slug: 'crystal-amunra', quantity: 200, isConsumedOnFail: true },
        { slug: 'crystal-bahamut', quantity: 200, isConsumedOnFail: true },
        { slug: 'medalha-vermelha', quantity: 2, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Criação Cythera Anúbis (de Bahamut +13)',
      category: 'CYTHERA',
      successRate: 0.16,
      notes: 'NPC Anubis, Noatun. Adicional da Cythera Bahamut é removido.',
      resources: [
        { slug: 'cursed-hat-black', quantity: 3, isConsumedOnFail: true },
        { slug: 'crystal-amunra', quantity: 200, isConsumedOnFail: true },
        { slug: 'crystal-bahamut', quantity: 200, isConsumedOnFail: true },
        { slug: 'medalha-vermelha', quantity: 2, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Criação Cythera Anúbis (de Bahamut +15)',
      category: 'CYTHERA',
      successRate: 1.0,
      notes: 'NPC Anubis, Noatun. Recebe 30 Anubis Crystal de bônus.',
      resources: [
        { slug: 'cursed-hat-black', quantity: 3, isConsumedOnFail: true },
        { slug: 'crystal-amunra', quantity: 200, isConsumedOnFail: true },
        { slug: 'crystal-bahamut', quantity: 200, isConsumedOnFail: true },
        { slug: 'medalha-vermelha', quantity: 2, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Cythera Anúbis +0→+15',
      category: 'CYTHERA',
      notes:
        '+0→+6: 100% | +6→+9: 80% | +9→+10: 50% | +10→+11: 30% | +11→+12: 10% | +12→+14: 8% | +14→+15: 5%',
      resources: [
        { slug: 'anubis-crystal', quantity: 10, isConsumedOnFail: true },
      ],
    },
    // === ACESSÓRIOS AMUNRA ===
    {
      name: 'Refinação Pedra Amunra +0→+9 (PL)',
      category: 'ACCESSORY',
      notes: 'Em falha volta para +0.',
      resources: [{ slug: 'pl', quantity: 1, isConsumedOnFail: true }],
    },
    {
      name: 'Refinação Pedra Amunra +9→+11 (Lac 100)',
      category: 'ACCESSORY',
      notes: 'Em falha mantém refinação.',
      resources: [{ slug: 'lac-100', quantity: 1, isConsumedOnFail: true }],
    },
    {
      name: 'Refinação Pedra Amunra +11→+15',
      category: 'ACCESSORY',
      notes: 'Em falha volta para +11.',
      resources: [
        { slug: 'crystal-amunra', quantity: 1, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Pedra Amunra +13→+15 (Protegida)',
      category: 'ACCESSORY',
      successRate: 0.25,
      notes:
        'NPC Lapidário, Arzan. Em falha mantém refinação. +13→+14: 25% | +14→+15: 10%.',
      resources: [
        { slug: 'crystal-amunra', quantity: 100, isConsumedOnFail: true },
        { slug: 'gold', quantity: 10, isConsumedOnFail: true },
      ],
    },
    // === ACESSÓRIOS BAHAMUT ===
    {
      name: 'Refinação Brinco Bahamut +0→+11',
      category: 'ACCESSORY',
      notes:
        '+0→+9: 40% | +9→+11: 5%. Em falha não volta refinação. 10% chance Lágrima Azul.',
      resources: [
        { slug: 'crystal-bahamut', quantity: 1, isConsumedOnFail: true },
        { slug: 'pl', quantity: 1, isConsumedOnFail: true },
        { slug: 'gold', quantity: 10, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Brinco Bahamut +11→+15',
      category: 'ACCESSORY',
      notes:
        '+11→+12: 20% | +12→+13: 15% | +13→+14: 10% | +14→+15: 5%. Em falha volta para +11.',
      resources: [
        { slug: 'crystal-bahamut', quantity: 1, isConsumedOnFail: true },
        { slug: 'pl', quantity: 1, isConsumedOnFail: true },
        { slug: 'gold', quantity: 10, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Colar/Cinto Bahamut +0→+11 (PL)',
      category: 'ACCESSORY',
      notes: '+0→+6: 60% | +6→+11: 30%. Em falha volta para +0.',
      resources: [{ slug: 'pl', quantity: 1, isConsumedOnFail: true }],
    },
    {
      name: 'Refinação Colar/Cinto Bahamut +0→+11 (Lac 100)',
      category: 'ACCESSORY',
      notes:
        '+0→+5: 75% | +5→+7: 50% | +7→+10: 25% | +10→+11: 10%. Em falha mantém.',
      resources: [{ slug: 'lac-100', quantity: 1, isConsumedOnFail: true }],
    },
    {
      name: 'Refinação Colar Bahamut +11→+15',
      category: 'ACCESSORY',
      notes:
        '+11→+12: 20% | +12→+13: 15% | +13→+14: 10% | +14→+15: 5%. Em falha volta para +11.',
      resources: [
        { slug: 'crystal-amunra', quantity: 1, isConsumedOnFail: true },
        { slug: 'gold', quantity: 10, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Cinto Bahamut +11→+15',
      category: 'ACCESSORY',
      notes:
        '+11→+12: 20% | +12→+13: 15% | +13→+14: 10% | +14→+15: 5%. Em falha volta para +11.',
      resources: [
        { slug: 'crystal-amunra', quantity: 1, isConsumedOnFail: true },
        { slug: 'gold', quantity: 10, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação +13→+15 com Lágrima Lucky (todos acessórios)',
      category: 'ACCESSORY',
      successRate: 0.25,
      notes: '+13→+14: 25% | +14→+15: 10%. Em falha mantém refinação.',
      resources: [
        { slug: 'lagrima-lucky', quantity: 6, isConsumedOnFail: true },
        { slug: 'gold', quantity: 10, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Upgrade Tier Acessório Bahamut T0→T7 (Tradicional)',
      category: 'ACCESSORY',
      notes:
        'T1: 75% | T2: 20% | T3: 10% | T4: 5% | T5: 3% | T6: 1% | T7: 1%. Em falha ganha Lágrima Vermelha.',
      resources: [
        { slug: 'bahamut-simbol', quantity: 1, isConsumedOnFail: true },
        { slug: 'emblema-valk', quantity: 2, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Composição Bahamut Essence',
      category: 'ACCESSORY',
      successRate: 0.25,
      notes:
        'NPC Torvald, Arzan. Para o último material use 5x Bahamut Simbol OU 7x Lágrima Vermelha.',
      resources: [
        { slug: 'bahamut-horn', quantity: 1, isConsumedOnFail: true },
        { slug: 'crystal-bahamut', quantity: 80, isConsumedOnFail: true },
        { slug: 'emblema-valk-9', quantity: 4, isConsumedOnFail: true },
        { slug: 'bahamut-simbol', quantity: 5, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Composição Acessório Bahamut Ancient',
      category: 'ACCESSORY',
      successRate: 0.1,
      notes:
        'NPC Zaid Naib, Noatun. Requer Bahamut +15 T8. Em falha preserva o acessório.',
      resources: [
        { slug: 'ancient-relic', quantity: 1, isConsumedOnFail: true },
        { slug: 'bahamut-blood', quantity: 3, isConsumedOnFail: true },
        { slug: 'bahamut-rune', quantity: 30, isConsumedOnFail: true },
        { slug: 'gold', quantity: 50, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Inserção Adicional Acessório Bahamut (Lágrima Vermelha)',
      category: 'ACCESSORY',
      notes: 'NPC Torvald, Arzan.',
      resources: [
        { slug: 'lagrima-vermelha', quantity: 3, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Upgrade Tier Acessório Bahamut T0→T1 (Lágrima Vermelha)',
      category: 'ACCESSORY',
      resources: [
        { slug: 'lagrima-vermelha', quantity: 8, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Upgrade Tier Acessório Bahamut T1→T2 (Lágrima Vermelha)',
      category: 'ACCESSORY',
      resources: [
        { slug: 'lagrima-vermelha', quantity: 8, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Upgrade Tier Acessório Bahamut T2→T3 (Lágrima Vermelha)',
      category: 'ACCESSORY',
      resources: [
        { slug: 'lagrima-vermelha', quantity: 25, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Upgrade Tier Acessório Bahamut T3→T4 (Lágrima Vermelha)',
      category: 'ACCESSORY',
      resources: [
        { slug: 'lagrima-vermelha', quantity: 40, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Upgrade Tier Acessório Bahamut T4→T5 (Lágrima Vermelha)',
      category: 'ACCESSORY',
      resources: [
        { slug: 'lagrima-vermelha', quantity: 80, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Upgrade Tier Acessório Bahamut T5→T6 (Lágrima Vermelha)',
      category: 'ACCESSORY',
      notes: '125x Lágrima Vermelha OU 2x Bahamut Essence.',
      resources: [
        { slug: 'lagrima-vermelha', quantity: 125, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Upgrade Tier Acessório Bahamut T6→T7 (Lágrima Vermelha)',
      category: 'ACCESSORY',
      notes: '225x Lágrima Vermelha OU 3x Bahamut Essence.',
      resources: [
        { slug: 'lagrima-vermelha', quantity: 225, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Upgrade Tier Acessório Bahamut T7→T8 (Bahamut Essence)',
      category: 'ACCESSORY',
      resources: [
        { slug: 'bahamut-essence', quantity: 5, isConsumedOnFail: true },
      ],
    },
    // === CAPA ===
    {
      name: 'Refinação Capa Celestial +0→+9',
      category: 'MANTLE',
      successRate: 1.0,
      notes: 'NPC Balder, Azran. Sempre sucesso.',
      resources: [
        { slug: 'pergaminho-selado', quantity: 2, isConsumedOnFail: true },
        { slug: 'selo-magico', quantity: 1, isConsumedOnFail: true },
        { slug: 'pl', quantity: 4, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Refinação Capa Celestial +9→+15 (1x)',
      category: 'MANTLE',
      successRate: 0.25,
      notes:
        'NPC Balder, Azran. +10→+11: falha mantém. +12+: falha perde 1 nível.',
      resources: [
        { slug: 'pl', quantity: 240, isConsumedOnFail: true },
        { slug: 'crystal-amunra', quantity: 40, isConsumedOnFail: true },
        { slug: 'crystal-bahamut', quantity: 40, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Criação Bahamut Mantle (Capa Celestial +15 → Bahamut)',
      category: 'MANTLE',
      successRate: 0.25,
      notes:
        'NPC Balder, Azran. Requer Capa Celestial +15 com 4% Dano PvP e 4% Defesa PvP. Bahamut Soul não é consumido em falha — recebe 1 Bless. Com 6 Bless: 100% de sucesso.',
      resources: [
        { slug: 'pl', quantity: 1200, isConsumedOnFail: true },
        { slug: 'bahamut-rune', quantity: 150, isConsumedOnFail: true },
        { slug: 'bahamut-horn', quantity: 2, isConsumedOnFail: true },
        { slug: 'crystal-bahamut', quantity: 120, isConsumedOnFail: true },
        { slug: 'crystal-amunra', quantity: 120, isConsumedOnFail: true },
        { slug: 'anubis-crystal', quantity: 20, isConsumedOnFail: true },
        { slug: 'bahamut-soul', quantity: 1, isConsumedOnFail: false },
      ],
    },
    {
      name: 'Refinação Bahamut Mantle +1→+15',
      category: 'MANTLE',
      notes:
        'Mesmos materiais da criação. Bahamut Soul não é consumido em falha.',
      resources: [
        { slug: 'pl', quantity: 1200, isConsumedOnFail: true },
        { slug: 'bahamut-rune', quantity: 150, isConsumedOnFail: true },
        { slug: 'bahamut-horn', quantity: 2, isConsumedOnFail: true },
        { slug: 'crystal-bahamut', quantity: 120, isConsumedOnFail: true },
        { slug: 'crystal-amunra', quantity: 120, isConsumedOnFail: true },
        { slug: 'anubis-crystal', quantity: 20, isConsumedOnFail: true },
        { slug: 'bahamut-soul', quantity: 1, isConsumedOnFail: false },
      ],
    },
    // === MONTARIA ===
    {
      name: 'Upgrade Nível Montaria 0→180',
      category: 'MOUNT',
      notes:
        'Âmago varia por tipo de montaria. Falha em nível par pode perder 1 nível.',
      resources: [{ slug: 'amago-dl-0', quantity: 1, isConsumedOnFail: true }],
    },
    {
      name: 'Upgrade Nível Montaria 181→200',
      category: 'MOUNT',
      successRate: 1.0,
      notes: 'Âmago +10 garante 100% de sucesso.',
      resources: [{ slug: 'amago-dl-10', quantity: 1, isConsumedOnFail: true }],
    },
    {
      name: 'Upgrade Qualidade Montaria (Normal)',
      category: 'MOUNT',
      successRate: 0.3,
      notes:
        'Requer montaria nível 200. +1, +2 ou +3 qualidade em sucesso. 1 tentativa/dia.',
      resources: [
        { slug: 'ovo-amarelo', quantity: 1, isConsumedOnFail: true },
        { slug: 'ovo-azul', quantity: 1, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Criação Jackal Blazeborn',
      category: 'MOUNT',
      successRate: 0.2,
      notes:
        'TF: 10% | DV: 15% | DL: 20%. Em falha montaria perde 10 qualidade.',
      resources: [
        { slug: 'ovo-vermelho', quantity: 2, isConsumedOnFail: true },
        { slug: 'ovo-amarelo', quantity: 2, isConsumedOnFail: true },
        { slug: 'ovo-azul', quantity: 6, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Upgrade Nível Jackal 0→180',
      category: 'MOUNT',
      successRate: 0.1,
      notes: 'NPC MountKeeper, Erion.',
      resources: [
        { slug: 'amago-jackal-0', quantity: 1, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Upgrade Nível Jackal 181→200',
      category: 'MOUNT',
      successRate: 1.0,
      notes: 'Âmago de Jackal +10 garante 100%.',
      resources: [
        { slug: 'amago-jackal-10', quantity: 1, isConsumedOnFail: true },
      ],
    },
    {
      name: 'Upgrade Qualidade Jackal',
      category: 'MOUNT',
      successRate: 0.25,
      notes: 'Requer Jackal nível 200. Em sucesso volta ao nível 180.',
      resources: [
        { slug: 'ovo-vermelho', quantity: 2, isConsumedOnFail: true },
        { slug: 'ovo-amarelo', quantity: 2, isConsumedOnFail: true },
        { slug: 'ovo-azul', quantity: 10, isConsumedOnFail: true },
      ],
    },
  ];

  for (const p of processes) {
    const process = await prisma.process.create({
      data: {
        name: p.name,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        category: p.category as any,
        fromLevel: p.fromLevel ?? null,
        toLevel: p.toLevel ?? null,
        successRate: p.successRate ?? null,
        notes: p.notes ?? null,
      },
    });

    for (const res of p.resources) {
      const resource = r[res.slug];
      if (!resource) {
        console.warn(`Resource not found: ${res.slug}`);
        continue;
      }
      await prisma.processResource.create({
        data: {
          processId: process.id,
          resourceId: resource.id,
          quantity: res.quantity,
          isConsumedOnFail: res.isConsumedOnFail,
        },
      });
    }
  }

  console.log(`Created ${processes.length} processes`);
  console.log('Seed completed!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
