# proxy-maker

Uma ferramenta em [node.js](https://nodejs.org) para gerar PDFs com proxies (de tcgs) para imprimir.

---

## Dependências

Tenha o Node instalado, então execute `npm install` na pasta do projeto.

---

## Uso

1 - Você vai precisar de um arquivo txt com a lista das cartas que deseja imprimir, no seguinte formato:

```
3x nome da carta 1
4x outraCarta
2x Beer Luffy
```

2 - Você vai precisar de uma pasta com as imagens, onde para cada `nome da carta` na lista acima você deve ter um arquivo `nome da carta.jpg` na pasta.

Os nomes na lista devem corresponder aos nomes dos arquivos na pasta.
A extensão não importa (qualquer tipo de imagem funciona).
Espaços antes/depois dos nomes na lista são ignorados.

Para a lista do item *#1* você pode ter uma pasta com:
```
nome da carta 1.jpg
outraCarta.png
Beer Luffy.gif
```

3 - Execute o script:

`node proxy --list caminho/para/a/lista.txt --images caminho/para/a/pasta/de/imagens`

Por padrão, o PDF será gerado em `./output.pdf` usando papel A4 e 300ppi.

Mas você também pode alterar isso passando outras opções:
```
--output caminho/para/onde/quer/o/arquivo.pdf
--paper A3    (apenas A3 e A4 são suportados atualmente, A4 é o padrão)
--ppi 150      (qualquer resolução que quiser)
```

---

## OPTCG Image Downloader

Também há um script para baixar imagens OPTCG diretamente do site oficial.
Você precisa ter todos os nomes na sua lista como o código da carta, por exemplo:

```
4xST28-002
4xST28-001
4xOP09-035
4xOP06-100
```

Daí é só rodar:

`node opDownloader --list caminho/para/a/lista.txt --output caminho/para/uma/pasta`

Você pode rodar o comando para gerar o PDF logo em seguida:

`node proxy --list caminho/para/a/lista.txt --images caminho/para/a/mesma/pasta`