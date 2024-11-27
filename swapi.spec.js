// -----EXEMPLO 1-----
// pode usar [it] ou [test/ para o nome do metodo]
// it ("1 + 1 deve ser igual a 2", () => {
//     //teste bem simples
//     const resultadoEsperado = 2;
//     expect(1+1).toBe(resultadoEsperado);
// });


// -----EXEMPLO 2-----
// //rodar um test supertest da swapi, com uma requisição get, sem o tratamento do assincronismo + promessa
// const request = require("supertest");

// it('Rodar um test supertest da swapi, com uma requisição get, sem o tratamento do assincronismo + promessa', () => {
//     // http://swapi.dev/api
//     // /people/1

//     const resposta = request("https://swapi.dev/api").get('/people/1');

//     // veja a resposta undefined por causa do assincronismo + promessas (async + promises)
//     console.log(resposta.body);
// });



// -----EXEMPLO 3-----
// tentar novamente verificando o status code da api
// const request = require('supertest');

// it('Tentar novamente verificando o status code da api', () => {
//     // http://swapi.dev/api
//     // /people/1

//     const resposta = request("https://swapi.dev/api").get('/people/1');

//     // veja a resposta undefined por causa do assincronismo + promessas (async + promises)
//     // console.log(resposta.body)

//     console.log(`Status: ${resposta.status}`);

// });


// -----EXEMPLO 4----
// Para contornar esse problema de assincronismo (async), vamos incluir o recurso com a palavra-chave await
// const request = require('supertest');

// test('', async () => {
//     //  http://swapi.dev/api
//     // people/1

//     const resposta = await request ('https://swapi.dev/api').get('/people/1');

//     // veja a resposta undefined por causa do assincronismo + promessas (async + promises)
//     // console.log(resposta.body);
//     console.log(`Status: ${resposta.status}`)
// });


// -------- Agora incluindo a requisição do corpo de conteudo -----------
// const request = require('supertest');

// test('', async () => {
//     // http://swapi.dev/api
//     // people/1

//     const resposta = await request('https://swapi.dev/api').get('/people/1');

//     // veja resposta undefined por  causa do assincronismo + promessas (async + promises)
//     console.log(resposta.status);
//     console.log(resposta.body);
//     // console.log(`Status: ${resposta.status})
// });
 
// --------- Codar testes vara verificar (expect) alguns dados de requisicao da api ----------
const request = require('supertest');

test('Deve visualizar informações de cadastro, quando buscar por uma pessoa existente', async () => {
    // http://swapi.dev/api
    // people/1
    const resposta = await request ('https://swapi.dev/api').get('/people/1');

    // verificar se o status da requisição esta retornando com status 200
    expect(resposta.status).toBe(200);
    // verificando a garantia de essas informações existem, nao sendo indefinida
    expect(resposta.body.films).toBeDefined();
    // verificando se recupera no corpo de conteudo, um ou mais veiculos(aeronaves)
    expect(resposta.body.vehicles.length).toBeGreaterThan(0);
    // verificando se recupera um conteudo especifico, por exemplo o nome de primeira pessoa
    expect(resposta.body.name).toBe('Luke Skywalker');

});

// -------- implementar o segundo teste com pessoa inexistente, verificando primeiramente os valores no log, do status e do body da requisição: --------
// test('Deve receber uma mensagem de erro, quando buscar por uma pessoa inexistente', async () => {
//     const resposta = await request ('https://swapi.dev/api').get('/people/9999');
//     // verifica se o status da requisicao esta retornando falso com status 400

//     console.log(resposta.status);
//     console.log(resposta.body);

//     // expect(resposta.status).toBe(404)
// });

// Implementando as verificações de status e corpo da requisição quando não encontra uma pessoa:
test('Deve receber uma mensagem de erro, quando buscar por uma pessoa inexistente', async () => {
    const resposta = await request ('https://swapi.dev/api').get('/people/9999');
    // verifica se o status da requisicao esta retornando falso com status 400
    expect(resposta.status).toBe(404);
    // verifica o valor do corpo vazio noa encontrado
    expect(resposta.body.detail).toBe("Not found");
    // podemos verificar tambem o corpo vazio como objeto
    expect(resposta.body).toMatchObject({
        detail: 'Not found'
    })
});

// Recomendação: implemente mais 10 (dez) métodos de testes com requisições da swapi Star Wars
// * Tentei fazer esse teste passar mas não consegui

// test("Deve listar os planetas em ordem decrescente de tamanho", async () => {
//     // Realizando a requisição para a API SWAPI para obter os planetas
//     const resposta = await fetch('https://swapi.dev/api/planets/');
//     const dados = await resposta.json();
  
//     // Mapeando os planetas e considerando 'unknown' como 0 para poder ordenar
//     const planetas = dados.results.map(planet => ({
//       nome: planet.name,
//       tamanho: planet.diameter === 'unknown' ? 0 : parseInt(planet.diameter) // Substituindo "unknown" por 0
//     }));
  
//     // Ordenando os planetas por tamanho (decrescente)
//     planetas.sort((a, b) => b.tamanho - a.tamanho);
  
//     // Extraindo apenas os nomes dos planetas ordenados
//     const planetasOrdenados = planetas.map(planet => planet.nome);
  
//     // Exemplo de resposta esperada (ajuste conforme a resposta real da API)
//     const resultadoEsperado = [
//       'Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Tatooine', 'Dagobah', 'Yavin IV', 'Hoth', 'Endor', 'Bespin'
//     ];
  
//     // Verificando se a lista de planetas ordenados corresponde ao esperado
//     expect(planetasOrdenados).toEqual(resultadoEsperado);
//   });