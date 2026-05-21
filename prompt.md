<role>Você é um desenvolvedor web especialista com muita experiência em criar páginas de venda em Next.js e Tailwind CSS</role>

<goal>Ajustar a página de vendas do Workshop ORGANIZE-$E de acordo com os <requirements> abaixo</goal>

<requirements>

- Corrija o seguinte erro detectado pelo Next.js

```txt
Each child in a list should have a unique "key" prop.

Check the render method of `ForwardRef`. See https://react.dev/link/warning-keys for more information.
app/components/landing/BioSection.tsx (85:13) @ BioSection


  83 |             target="_blank"
  84 |           >
> 85 |             <Instagram size={18} strokeWidth={1.75} aria-hidden="true" />
     |             ^
  86 |             @rafaelaribeirofinancas
  87 |           </a>
  88 |         </div>
```

- Use o icone do Instagram na cor oficial puxado para um rosa pra violeta
- Altere as fotos de hero para as @new-hero1.png, @new-hero2.png e @new-hero3.png
- Mude a frase "ORGANIZE-$E: transforme sua relação com o dinheiro em 30 dias." para "ORGANIZE-$E: Plano Prático para Organizar seu dinheiro e fazer ele sobrar em 30 dias."
- Deixe o botão garantir meu ingresso mais pulsante, e coloque um efeito visual ao fazer hover no botão
- O alinhamento das fotos de depoimentos está no topo, e sobre espaço em baixo em algumas fotos, deixe o alinhamento centralizado
- Os depoimentos devem estar em um carrossel que muda automaticamente a cada 10 segundos, ou que eu posso clicar nas setas direita ou esquerda para passar no computador, ou arrastar no celular
- Exclua a frase "Eu acredito..." da seção sobre Rafaela
- Deixe o valor de 47 reais centralizado
- Na resolução de celular imagem do hero ficou abaixo da frase "ORGANIZE-$E: ..." e sobreposta, deve ficar em cima, corrija isto
- Mude a foto do sobre Rafaela para @sobre-rafa.JPG

</requirements>

<testing>

- Use o playwright cli para testar a navegabilidade da página, responsividade, acessibilidade etc

</testing>
