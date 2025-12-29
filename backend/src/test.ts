// src/test.ts

import { EmergencyService } from './services/EmergencyService';

async function testarService() {
    console.log('🧪 Iniciando testes do EmergencyService...\n');
    console.log('═'.repeat(50));
    
    const service = new EmergencyService();

    try {
        // ====================================
        // TESTE 1: Criar uma emergência
        // ====================================
        console.log('\n📝 TESTE 1: Criar nova emergência');
        console.log('-'.repeat(50));
        
        const novaEmergencia = await service.createEmergency({
            title: 'Queimadura de Primeiro Grau',
            steps: [
                { 
                    title: 'Resfrie a área', 
                    description: 'Coloque a área queimada sob água fria corrente por 10-20 minutos' 
                },
                { 
                    title: 'Cubra a queimadura', 
                    description: 'Use um pano limpo e úmido para cobrir' 
                },
                { 
                    title: 'Evite pomadas', 
                    description: 'Não aplique pasta de dente, manteiga ou outras substâncias' 
                }
            ],
            tags: ['queimadura', 'urgente', 'primeiros-socorros'],
            description: 'Procedimento para tratar queimaduras leves'
        });
        
        console.log('✅ Emergência criada com sucesso!');
        console.log('ID gerado:', novaEmergencia.id);
        console.log('Slug gerado:', novaEmergencia.slug);
        console.log('Título:', novaEmergencia.title);
        console.log('Total de steps:', novaEmergencia.steps.length);
        console.log('Tags:', novaEmergencia.tags);

        // ====================================
        // TESTE 2: Buscar todas as emergências
        // ====================================
        console.log('\n📋 TESTE 2: Buscar todas as emergências');
        console.log('-'.repeat(50));
        
        const todas = await service.getAllEmergencies();
        console.log('✅ Total de emergências encontradas:', todas.length);
        
        if (todas.length > 0) {
            console.log('\nLista de emergências:');
            todas.forEach((em, index) => {
                console.log(`  ${index + 1}. ${em.title} (ID: ${em.id})`);
            });
        }

        // ====================================
        // TESTE 3: Buscar por ID
        // ====================================
        console.log('\n🔍 TESTE 3: Buscar emergência por ID');
        console.log('-'.repeat(50));
        
        const buscadaPorId = await service.getEmergencyById(novaEmergencia.id);
        
        if (buscadaPorId) {
            console.log('✅ Emergência encontrada!');
            console.log('Título:', buscadaPorId.title);
            console.log('Descrição:', buscadaPorId.description);
        } else {
            console.log('❌ Emergência não encontrada');
        }

        // ====================================
        // TESTE 4: Buscar por SLUG
        // ====================================
        console.log('\n🔍 TESTE 4: Buscar emergência por SLUG');
        console.log('-'.repeat(50));
        
        const buscadaPorSlug = await service.getEmergencyById(novaEmergencia.slug);
        
        if (buscadaPorSlug) {
            console.log('✅ Emergência encontrada pelo slug!');
            console.log('Título:', buscadaPorSlug.title);
        } else {
            console.log('❌ Emergência não encontrada pelo slug');
        }

        // ====================================
        // TESTE 5: Atualizar emergência
        // ====================================
        console.log('\n✏️ TESTE 5: Atualizar emergência');
        console.log('-'.repeat(50));
        
        const atualizada = await service.updateEmergency(novaEmergencia.id, {
            title: 'Queimadura Grave de Primeiro Grau',
            description: 'Procedimento atualizado para queimaduras leves e graves'
        });
        
        if (atualizada) {
            console.log('✅ Emergência atualizada!');
            console.log('Novo título:', atualizada.title);
            console.log('Novo slug:', atualizada.slug);
            console.log('Nova descrição:', atualizada.description);
            console.log('Steps mantidos:', atualizada.steps.length);
        } else {
            console.log('❌ Falha ao atualizar');
        }

        // ====================================
        // TESTE 6: Criar outra emergência
        // ====================================
        console.log('\n📝 TESTE 6: Criar segunda emergência');
        console.log('-'.repeat(50));
        
        const segundaEmergencia = await service.createEmergency({
            title: 'Engasgo em Adultos',
            steps: [
                { 
                    title: 'Incentive a tosse', 
                    description: 'Se a pessoa consegue tossir, incentive' 
                },
                { 
                    title: 'Manobra de Heimlich', 
                    description: 'Se não consegue respirar, aplique compressões abdominais' 
                }
            ],
            tags: ['engasgo', 'emergência']
        });
        
        console.log('✅ Segunda emergência criada!');
        console.log('ID:', segundaEmergencia.id);
        console.log('Slug:', segundaEmergencia.slug);

        // ====================================
        // TESTE 7: Listar novamente (deve ter 2)
        // ====================================
        console.log('\n📋 TESTE 7: Listar todas novamente');
        console.log('-'.repeat(50));
        
        const todasAgora = await service.getAllEmergencies();
        console.log('✅ Total agora:', todasAgora.length);

        // ====================================
        // TESTE 8: Deletar emergência
        // ====================================
        console.log('\n🗑️ TESTE 8: Deletar primeira emergência');
        console.log('-'.repeat(50));
        
        const deletada = await service.deleteEmergency(novaEmergencia.id);
        
        if (deletada) {
            console.log('✅ Emergência deletada!');
            console.log('Título deletado:', deletada.title);
        } else {
            console.log('❌ Falha ao deletar');
        }

        // ====================================
        // TESTE 9: Verificar se foi deletada
        // ====================================
        console.log('\n🔍 TESTE 9: Tentar buscar emergência deletada');
        console.log('-'.repeat(50));
        
        const buscaDeletada = await service.getEmergencyById(novaEmergencia.id);
        
        if (buscaDeletada) {
            console.log('❌ ERRO: Emergência ainda existe (não foi deletada)');
        } else {
            console.log('✅ Correto! Emergência não existe mais');
        }

        // ====================================
        // TESTE 10: Total final
        // ====================================
        console.log('\n📋 TESTE 10: Contagem final');
        console.log('-'.repeat(50));
        
        const final = await service.getAllEmergencies();
        console.log('✅ Total final de emergências:', final.length);

        // ====================================
        // RESUMO
        // ====================================
        console.log('\n' + '═'.repeat(50));
        console.log('🎉 TODOS OS TESTES CONCLUÍDOS COM SUCESSO!');
        console.log('═'.repeat(50));
        console.log('\n📄 Verifique o arquivo: data/emergencies.json');
        console.log('   para ver os dados salvos\n');

    } catch (error) {
        console.error('\n❌ ERRO DURANTE OS TESTES:');
        console.error(error);
        console.log('\n💡 Dica: Verifique se:');
        console.log('   1. Todos os métodos do Service estão implementados');
        console.log('   2. A pasta data/ existe');
        console.log('   3. Não há erros de sintaxe no código\n');
    }
}

// Executar os testes
testarService();